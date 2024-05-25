const Ads = require('../models/adsModel');

exports.getAllAds = async (req, res) => {
  try {
    const ads = await Ads.find();
    res.json(ads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAdById = async (req, res) => {
  try {
    const ad = await Ads.findById(req.params.id);
    if (ad == null) {
      return res.status(404).json({ message: 'Cannot find ad' });
    }
    res.json(ad);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.createAd = async (req, res) => {
  const ad = new Ads({
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    link: req.body.link,
    position: req.body.position,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  });

  try {
    const newAd = await ad.save();
    res.status(201).json(newAd);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.updateAd = async (req, res) => {
  try {
    const ad = await Ads.findById(req.params.id);
    if (ad == null) {
      return res.status(404).json({ message: 'Cannot find ad' });
    }

    if (req.body.title != null) {
      ad.title = req.body.title;
    }
    if (req.body.imageUrl != null) {
      ad.imageUrl = req.body.imageUrl;
    }
    if (req.body.link != null) {
      ad.link = req.body.link;
    }
    if (req.body.position != null) {
      ad.position = req.body.position;
    }
    if (req.body.startDate != null) {
      ad.startDate = req.body.startDate;
    }
    if (req.body.endDate != null) {
      ad.endDate = req.body.endDate;
    }

    const updatedAd = await ad.save();
    res.json(updatedAd);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteAd = async (req, res) => {
  try {
    const ad = await Ads.findById(req.params.id);
    if (ad == null) {
      return res.status(404).json({ message: 'Cannot find ad' });
    }
    await ad.remove();
    res.json({ message: 'Deleted ad' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
