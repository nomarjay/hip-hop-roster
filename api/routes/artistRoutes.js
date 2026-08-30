const router = require('express').Router();
const controller = require('../controllers/artistController');

router.route('/').get(controller.getArtists).post(controller.createArtist);
router.get('/name/:name', controller.getArtistByName);
router.get('/tier/:tier', controller.getArtistsByTier);
router.route('/:id').get(controller.getArtist).put(controller.updateArtist).delete(controller.deleteArtist);

module.exports = router;
