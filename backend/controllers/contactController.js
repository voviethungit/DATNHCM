const Contact = require('../models/contactModel');

exports.createContactMessage = async (req, res) => {
  const { name, email, phone, message } = req.body;
  try {
    const newContactMessage = new Contact({ name, email, phone, message });
    const savedContactMessage = await newContactMessage.save();
    res.status(201).json(savedContactMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllContactMessages = async (req, res) => {
  try {
    const contactMessages = await Contact.find();
    res.json(contactMessages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getContactMessageById = async (req, res) => {
  try {
    const contactMessage = await Contact.findById(req.params.id);
    if (!contactMessage) {
      return res.status(404).json({ message: 'Contact message not found' });
    }
    res.json(contactMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteContactMessage = async (req, res) => {
  try {
    const deletedContactMessage = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContactMessage) {
      return res.status(404).json({ message: 'Contact message not found' });
    }
    res.json({ message: 'Contact message deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
