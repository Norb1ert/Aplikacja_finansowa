import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { parse, format, isValid } from "date-fns";




export default function BudgetForm() {
  const API = import.meta.env.VITE_API_URL;
  
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('');
  const [transactions, setTransactions] = useState([]);

  

  //  Fetch wszystkich transakcji 
  useEffect(() => {
    const fetchTransactions = async () => {
      const res = await fetch(`${API}/transactions/transactions`, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });
      const data = await res.json();
      setTransactions(data);
    };

    fetchTransactions();
  }, [API]);

  //Zapisanie w LocalStorage
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
  }, [transactions])


  //Pobranie w localStorage
  useEffect(() => {
    const stored = localStorage.getItem('transactions');
    if (stored && transactions.length === 0) {
      setTransactions(JSON.parse(stored));
    }
  }, [transactions.length]);
  

  //  Oblicznaie salda
  const saldo = transactions.reduce((total, t) => total + Number(t.amount), 0);


  //  Wysłanie do backendu
  const handleSubmit = async (e) => {
    e.preventDefault();

  let parsedDate = parse(date, "dd-MM-yyyy", new Date());
  if (!isValid(parsedDate)) {
    toast.error("Nieprawidłowy format daty. Użyj formatu: DD-MM-RRRR");
    return;
  }


  const formattedDate = format(parsedDate, "yyyy-MM-dd"); 

  const rawAmount = Number(amount);
  const signedAmount = type === "Dochód" ? rawAmount : -Math.abs(rawAmount);

    const newTransaction = {
      amount: signedAmount,
      type,
      category,
      description,
      date: formattedDate 
    };

    const newSaldo = saldo + newTransaction.amount;

    if (newTransaction.amount < 0 && newSaldo < 0) {
      toast.error('Zbyt mało środków. Zasil swoje konto.');
      return;
    }

    try {
      const res = await fetch(`${API}/transactions/transaction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(newTransaction)
      });

      if (!res.ok) {
        const error = await res.json();
        toast.error('Błąd: ' + (error.message || 'Nie udało się dodać transakcji'));
        return;
      }


      setTransactions([...transactions, newTransaction]); 
      toast.success("Transakcja dodana pomyślnie!");


      //Wyczyszczenie pól
      setAmount('');
      setType('')
      setCategory('');
      setDescription('')
      setDate('');

    } catch (err) {
      toast.error('Wystąpił błąd sieci: ' + err.message);
    }


  };

  return (
    <div className="budget-form">
      <h2>Add transaction</h2>
      <div className="saldo-div">Current saldo: {saldo} zł</div>

      <form onSubmit={handleSubmit} className="form-inputs">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          required
          className="input-form"
        />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="input-form"
            >
            <option value="">Choose a type</option>
            <option value="Dochód">Income</option>
            <option value="Wydatek">Expanse</option>
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="input-form">
              <option value="">Choose category</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Activities">Activities</option>
              <option value="Rent">Rent</option>
              <option value="Income">Income</option>
          </select>

         <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
          className="input-form"
        />
        <input
          type="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Date"
          required
          className="input-form"
        />
        <button type="submit">Add transaction</button>
      </form>

    
    </div>
  );
}
