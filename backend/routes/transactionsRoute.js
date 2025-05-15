const express = require('express');
const Transaction = require('../models/Transaction');
const router = express.Router();
const auth = require('../middleware/auth')

//Dodawanie transakcji

router.post('/transaction', auth, async (req, res) => {
  const {amount, type, category, description, date} = req.body;
  const transaction = new Transaction({
    userId: req.userId, 
    amount, 
    type, 
    category, 
    description, 
    date
  })
  await transaction.save();
  res.status(201).json({ message: 'Transakcja dodana poprawnie' });
})

// Odnajdywanie wszystkich transakcji + filtry 

router.get('/transactions', auth, async (req, res) => {
  const { filter } = req.query;
  const query = { userId: req.userId };

  if (filter === "last30days") {
    const last30 = new Date();
    last30.setDate(new Date().getDate() - 30);
    query.date = { $gte: last30 };
  } else if (filter === "Dochód" || filter === "Wydatek") {
    query.type = filter;
  }


  try {
    const transactions = await Transaction.find(query).sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//Usuwanie Transakcji
router.delete("/:id", auth, async (req, res) => {
  try {
    await Transaction.findOneAndDelete({_id: req.params.id, userId: req.userId})
    res.json({message: "Transakcja usunięta"});

  } catch (error) {
    console.error(error)
    res.status(500).json({message: "Wystąpił błąd usuwania transkacji"})
  }
})


//Edycja Transakcji 

router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Transaction.findOneAndUpdate({_id: req.params.id, userId: req.userId}, req.body, {new: true})
    res.json({message: "Dane zostały zaaktualizowane", updated})
  } catch (error) {
    console.error(error)
    res.status(500).json({message: "Wystąpił błąd edycji transkacji"})
  }
})


module.exports = router;
