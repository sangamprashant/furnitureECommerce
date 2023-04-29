const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require("../middleware/requireLogin");
const User = mongoose.model('FURNITUREUSEREC');

router.put('/sell/:id', requireLogin , async (req, res) => {
  const { id } = req.params;
  const { sell } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { _id: id },
      { sell },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;
