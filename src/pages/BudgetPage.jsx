import { useEffect, useState } from 'react';
import BudgetForm from '../Komponenty/BudgetForm';


export default function BudgetPage() {
  const API = import.meta.env.VITE_API_URL;


const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API}/transactions/transactions`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        });

        if (!res.ok) throw new Error('Błąd pobierania transakcji');

        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        alert(err.message);
      }
    };

    fetchData();
  }, [API]);

    return (
        <div className='budget-page-container'>
            <h1>Introduce data</h1>
            <BudgetForm transactions={transactions}/>
        </div>
    )
}