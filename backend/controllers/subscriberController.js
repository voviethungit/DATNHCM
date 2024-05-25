const Subscriber = require('../models/subscriberModel');

exports.createSubscriber = async (req, res) => {
  const { email } = req.body;
  try {
    const newSubscriber = new Subscriber({ email });
    const savedSubscriber = await newSubscriber.save();
    res.status(201).json(savedSubscriber);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteSubscriber = async (req, res) => {
  const { email } = req.params;
  try {
    const deletedSubscriber = await Subscriber.findOneAndDelete({ email });
    if (!deletedSubscriber) {
      return res.status(404).json({ message: 'Subscriber not found' });
    }
    res.json({ message: 'Subscriber deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
