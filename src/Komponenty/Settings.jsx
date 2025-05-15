import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Settings() {
  const API = import.meta.env.VITE_API_URL;

  const [user, setUser] = useState({ name: "", email: "" });


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API}/my-account`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        if (!res.ok) throw new Error("Błąd pobierania danych");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
        alert("Nie udało się pobrać danych użytkownika");
      }
    };
    fetchUser();
  }, [API]);

  
  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API}/my-account`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(user),
      });
      if (!res.ok) throw new Error("Błąd zapisu danych");
      const data = await res.json();
      toast.success(data.message);
    } catch (err) {
      console.error(err);
      toast.error("Nie udało się zaktualizować danych");
    }
  };

  return (
    <div className="settings-page">
      <h1>Ustawienia konta</h1>
      <form  className="settings-form" onSubmit={handleSubmit}>
        <label>Imię</label>
        <input className="input-form"
          name="name"
          value={user.name}
          onChange={handleChange}
        />
        <label>Email</label>
        <input className="input-form"
          name="email"
          value={user.email}
    onChange={handleChange}
        />
          <button type="submit" className="settings-button">Zapisz zmiany</button>
      </form>
    </div>
  );
}


