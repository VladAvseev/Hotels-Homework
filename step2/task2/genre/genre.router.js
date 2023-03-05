const Router = require('../myExpress/Router');
const genreController = require("../genre/genre.controller");

const router = new Router();

router.get('/genre', genreController.get);
router.post('/genre', genreController.create);
router.put('/genre', genreController.update);
router.delete('/genre', genreController.delete);

module.exports = router;