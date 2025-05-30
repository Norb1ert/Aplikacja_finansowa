require('dotenv').config();

const express = require("express");
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoute'); 
const transactionRoutes = require('./routes/transactionsRoute');
const userRoute = require("./routes/userRoute");
const cors = require("cors");


const PORT = process.env.PORT || 3001;




const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://aplikacja-finansowa-shgq.vercel.app", // Vercel Front-End
  "https://aplikacja-finansowa-5k91bt1h8-norberts-projects-239b10d6.vercel.app"
];

app.use(cors({
  origin: (origin, callback) => {
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      /^https:\/\/.*\.vercel\.app$/.test(origin) // Allow all vercel url, fix of deployment bug 
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));


app.use(express.json());



mongoose.connect(process.env.MONGO_URI, {
}).then(() => {
  console.log("Mongo DB połączone");
  app.listen(PORT, () => console.log(`✅ Server running on ${PORT}`));
}).catch(err => console.error("Mongo Error", err));


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Błąd połączenia z MongoDB:'));


app.use('/', authRoutes);
app.use('/transactions', transactionRoutes);
app.use('/my-account', userRoute);








