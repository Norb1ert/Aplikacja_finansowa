import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from "recharts";

const COLORS = ["#22c55e", "#ef4444", "#3b82f6", "#a855f7", "#f59e0b", "#ec4899"];

export default function Charts() {
const API = import.meta.env.VITE_API_URL;

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch(`${API}/transactions/transactions`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const data = await res.json();
        setTransactions(data);
      } catch (error) {
        toast.error("Błąd podczas pobierania transakcji:", error);
      }
    };

    fetchTransactions();
  }, [API]);

  if (!transactions.length) {
    return <p>No data to be shown</p>;
  }

  // Chart 1: Pie - Dochód vs Wydatek
  const summary = [
    {
      name: "Dochód",
      value: transactions.filter((t) => t.type === "Dochód").reduce((sum, t) => sum + Number(t.amount), 0),
    },
    {
      name: "Wydatek",
      value: transactions.filter((t) => t.type === "Wydatek").reduce((sum, t) => sum + Number(t.amount), 0),
    },
  ];

  // Chart 2: Bar - Kwoty wg kategorii
  const categoryMap = {};
  transactions.forEach((t) => {
    if (!categoryMap[t.category]) categoryMap[t.category] = 0;
    categoryMap[t.category] += Number(t.amount);
  });
  const categoryData = Object.entries(categoryMap).map(([key, value]) => ({ category: key, amount: value }));

  // Chart 3: Line - Trend czasowy
  const trendData = transactions
    .map((t) => ({ date: t.date.slice(0, 10), amount: Number(t.amount) }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="charts">
      <div className="chart-box">
        <h3>Income vs Expances</h3>
        <PieChart width={400} height={300}>
          <Pie data={summary} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
            {summary.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      <div className="chart-box">
        <h3>Spendings by category</h3>
        <BarChart width={400} height={300} data={categoryData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#3b82f6" />
        </BarChart>
      </div>

      <div style={{ gridColumn: "span 2" }}>
        <h3>Tendency over time</h3>
        <LineChart width={800} height={300} data={trendData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="amount" stroke="#a855f7" />
        </LineChart>
      </div>
    </div>
  );
}
