const express = require('express');
const User = require('../models/User');
const router = express.Router();
const auth = require('../middleware/auth');


router.get("/", auth, async (req, res) => {
    try {
      const user = await User.findById(req.userId).select("name email");
      if (!user) return res.status(404).json({ message: "User not found" });
  
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  

router.put("/", auth, async (req, res)=> {
    const {name, email} = req.body;

    try {
        const user = await User.findById(req.userId)
        if (!user) return res.status(404).json({ message: 'Uytkownik nie odnaleziony' });

        user.name = name || user.name;
        user.email = email || user.email;

        await user.save();
        res.json({ message: 'Dane zaaktualizowane pomyślnie', user });
    } catch (error) {
        res.status(res.status(500).json({message: "Server Errror"}))
    }
})

module.exports = router;