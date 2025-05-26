import { useEffect, useState } from "react";
import TransactionItem from "../Komponenty/TransactionItem"
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export default function Transactions() {
  const API = import.meta.env.VITE_API_URL;

const navigate = useNavigate()
const [transactions, setTransactions] = useState([]);
const [searchParams, setSearchParams] = useSearchParams()
const filter = searchParams.get("filter");


useEffect(() => {
    const fetchData = async () => {
      try {
        const url = filter
        ? `${API}/transactions/transactions?filter=${filter}`
        : `${API}/transactions/transactions`;

        const res = await fetch(url, {
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
  }, [filter, API]);

//Handler do usuwania transakcji
  const handleDelete = async (id) => {
    try {
        const res = await fetch(`${API}/transactions/${id}`, {
            method: "DELETE", 
            headers: {Authorization: "Bearer " + localStorage.getItem("token")}
        })
        const data = await res.json();
        toast.success(data.message);
        setTransactions(prev => prev.filter(t => t._id !== id))
    } catch (error) {
        console.error(error)
        toast.error(error.message);
    }
}


//Handler do edycji 
const handleEdit = async (updatedTransaction) => {

  try {
    const res = await fetch(`${API}/transactions/${updatedTransaction._id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify(updatedTransaction)
    });

    const data = await res.json();
  

    toast.success(data.message);

    setTransactions(prev =>
      prev.map(t => t._id === updatedTransaction._id ? data.updated : t)
    );

  } catch (error) {
    console.error(" Edit error:", error);
    toast.error(error.message);
  }
};


    return (
        <div className="budget-overview">
            <h1>Transactions history</h1>

            <div className="budget-history">
              <div className="filters-container">
              <button className="filter-button-charts" onClick={() => navigate("/app/transactions/charts")}>Charts</button>
                <button className="filter-button" onClick={() => setSearchParams({filter: "last30days"})}>Last 30 days</button>
                <button className="filter-button" onClick={() => setSearchParams({filter: "Dochód"})}>Income</button>
                <button className="filter-button" onClick={() => setSearchParams({filter: "Wydatek"})}>Expanses</button>
                <button className="filter-button" onClick={() => setSearchParams("/")}>All</button>
              </div>
                {transactions.length === 0 ? <h2>
                    No data to be shown
                </h2> : (
                    transactions.map((t) => <TransactionItem key={t._id} transaction={t} onDelete={handleDelete}
                    onEdit={handleEdit}/>)
                )}
            </div>
        </div>


    )
}