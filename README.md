# 💰 Aplikacja do Zarządzania Budżetem Osobistym

Aplikacja umożliwiająca śledzenie przychodów i wydatków z możliwością **logowania oraz rejestracji użytkownika**.

> ⚠️ Aplikacja **nie jest responsywna** — stworzona do działania na **urządzeniach desktopowych**.

---

## 🛠 Technologie

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Baza danych:** MongoDB (Mongoose)
- **Stylowanie:** CSS
- **Autoryzacja:** JWT

---

## 📦 Użyte biblioteki

### Frontend:
- `react-icons` – ikony
- `recharts` – wykresy (np. kołowe, słupkowe)
- `react-toastify` – powiadomienia toast
- `date-fns` – formatowanie dat

### Backend:
- `express` – serwer HTTP
- `mongoose` – połączenie z MongoDB
- `jsonwebtoken` – autoryzacja
- `cors` – zarządzanie dostępem CORS

---

## ⚠️ Ważne wskazówki

- Podczas **dodawania transakcji typu „Wydatek”**, należy **umieścić znak `-` przed kwotą**, np. `-100`.
- W przeciwnym razie saldo zostanie niepoprawnie obliczone jako dodatnie.

---

## 🧪 Funkcje

- ✅ Rejestracja i logowanie użytkownika
- ✅ Dodawanie transakcji z kategorią, datą i opisem
- ✅ Przegląd salda i historii
- ✅ Filtrowanie transakcji (ostatnie 30 dni, dochód, wydatek)
- ✅ Edycja i usuwanie transakcji
- ✅ Podsumowanie wizualne (wykresy)

---

## 🚀 Deployment

- **Frontend:** [Vercel](https://vercel.com/)
- **Backend:** [Render](https://render.com/)
- **Baza danych:** [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

## 👨‍🎓 Projekt studencki

Aplikacja została stworzona jako **projekt uniwersytecki** w celach edukacyjnych.

---

