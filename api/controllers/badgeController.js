const Badge = require('../models/Badge');

async function getBadges(_req, res, next) {
  try { res.json({ success: true, data: await Badge.find().sort({ name: 1 }) }); }
  catch (error) { next(error); }
}

async function getBadge(req, res, next) {
  try {
    const badge = await Badge.findById(req.params.id);
    if (!badge) return res.status(404).json({ success: false, message: 'Badge not found' });
    return res.json({ success: true, data: badge });
  } catch (error) { return next(error); }
}

async function createBadge(req, res, next) {
  try { res.status(201).json({ success: true, data: await Badge.create(req.body) }); }
  catch (error) { next(error); }
}

async function updateBadge(req, res, next) {
  try {
    const badge = await Badge.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!badge) return res.status(404).json({ success: false, message: 'Badge not found' });
    return res.json({ success: true, data: badge });
  } catch (error) { return next(error); }
}

async function deleteBadge(req, res, next) {
  try {
    const badge = await Badge.findByIdAndDelete(req.params.id);
    if (!badge) return res.status(404).json({ success: false, message: 'Badge not found' });
    return res.json({ success: true, data: badge });
  } catch (error) { return next(error); }
}

module.exports = { getBadges, getBadge, createBadge, updateBadge, deleteBadge };
