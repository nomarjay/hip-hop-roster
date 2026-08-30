const Artist = require('../models/Artist');

async function getArtists(_req, res, next) {
  try {
    const artists = await Artist.find().sort({ name: 1 });
    res.json({ success: true, data: artists });
  } catch (error) { next(error); }
}

async function getArtist(req, res, next) {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) return res.status(404).json({ success: false, message: 'Artist not found' });
    return res.json({ success: true, data: artist });
  } catch (error) { return next(error); }
}

async function getArtistByName(req, res, next) {
  try {
    const artist = await Artist.findOne({ name: req.params.name });
    if (!artist) return res.status(404).json({ success: false, message: 'Artist not found' });
    return res.json({ success: true, data: artist });
  } catch (error) { return next(error); }
}

async function getArtistsByTier(req, res, next) {
  try {
    const artists = await Artist.find({ overallTier: req.params.tier }).sort({ name: 1 });
    return res.json({ success: true, data: artists });
  } catch (error) { return next(error); }
}

async function createArtist(req, res, next) {
  try {
    const artist = await Artist.create(req.body);
    res.status(201).json({ success: true, data: artist });
  } catch (error) { next(error); }
}

async function updateArtist(req, res, next) {
  try {
    const artist = await Artist.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!artist) return res.status(404).json({ success: false, message: 'Artist not found' });
    return res.json({ success: true, data: artist });
  } catch (error) { return next(error); }
}

async function deleteArtist(req, res, next) {
  try {
    const artist = await Artist.findByIdAndDelete(req.params.id);
    if (!artist) return res.status(404).json({ success: false, message: 'Artist not found' });
    return res.json({ success: true, data: artist });
  } catch (error) { return next(error); }
}

module.exports = {
  getArtists,
  getArtist,
  getArtistByName,
  getArtistsByTier,
  createArtist,
  updateArtist,
  deleteArtist
};
