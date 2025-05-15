require('dotenv').config();

const express = require("express");
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoute'); 
const transactionRoutes = require('./routes/transactionsRoute');
const userRoute = require("./routes/userRoute");
const cors = require("cors");


const PORT = process.env.PORT || 3001;




const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
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








