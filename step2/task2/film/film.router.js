const Router = require('../myExpress/Router');
const filmController = require('./film.controller');

const router = new Router();

router.get('/film', filmController.get);
router.post('/film', filmController.create);
router.put('/film', filmController.update);
router.delete('/film', filmController.delete);
router.post('/film/addGenre', filmController.addGenre);
router.post('/film/removeGenre', filmController.removeGenre);

module.exports = router;