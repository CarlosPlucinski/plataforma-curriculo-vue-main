const express = require('express');
const Message = require('../models/message'); // Assuming your Message model is in ../models/message.js

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    const newMessage = new Message({ message });
    await newMessage.save();
    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', error });
  }
});

module.exports = router;