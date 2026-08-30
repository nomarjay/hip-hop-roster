const router = require('express').Router();
const controller = require('../controllers/badgeController');

router.route('/').get(controller.getBadges).post(controller.createBadge);
router.route('/:id').get(controller.getBadge).put(controller.updateBadge).delete(controller.deleteBadge);

module.exports = router;
