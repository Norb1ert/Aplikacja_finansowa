const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router()



router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Użytkownik z tym mailem już istnieje" });
    }


    const user = new User({ name, email, password });
    await user.save();


    res.status(201).json({ message: "Użytkownik zarejestrowany poprawnie" });
  } catch (error) {
    console.error("❌ Register error:", error);
    res.status(400).json({ error: "Błąd rejestracji użytkownika" });
  }
});



router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ error: "Użytkownik nie odnaleziony" });
  }

  if (user.password !== password) {
    return res.status(401).json({ error: "Wprowadzony email lub hasło nie są poprawne" });
  }

  const token = jwt.sign({ userId: user._id }, 'secretkey', { expiresIn: '2h' });

  res.json({ token, user: { name: user.name, email: user.email } });
});

module.exports = router;