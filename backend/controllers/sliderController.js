const Slider = require('../models/sliderModel');


exports.createSlider = async (req, res) => {
  const { title, imageUrl, link, order } = req.body;
  try {
    const newSlider = new Slider({ title, imageUrl, link, order });
    const savedSlider = await newSlider.save();
    res.status(201).json(savedSlider);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.getAllSliders = async (req, res) => {
  try {
    const sliders = await Slider.find();
    res.json(sliders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSliderById = async (req, res) => {
  try {
    const slider = await Slider.findById(req.params.id);
    if (!slider) {
      return res.status(404).json({ message: 'Slider not found' });
    }
    res.json(slider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteSlider = async (req, res) => {
  try {
    const deletedSlider = await Slider.findByIdAndDelete(req.params.id);
    if (!deletedSlider) {
      return res.status(404).json({ message: 'Slider not found' });
    }
    res.json({ message: 'Slider deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
