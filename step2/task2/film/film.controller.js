const filmService = require('./film.service');

class FilmController {
    async get(req, res) {
        try {
            if (req.params.id) {
                const film = await filmService.getById(req.params.id);
                res.send(film);
            } else {
                const films = await filmService.getAll();
                res.send(films);
            }
        } catch (e) {
            res.send({message: e.message});
        }
    }

    async create(req, res) {
        try {
            const body = req.body;
            const film = await filmService.create(body);
            res.send(film);
        } catch (e) {
            res.send({message: e.message});
        }
    }

    async update(req, res) {
        try {
            const body = req.body;
            const film = await filmService.update(body);
            res.send(film);
        } catch (e) {
            res.send({message: e.message});
        }
    }

    async delete(req, res) {
        try {
            const body = req.body;
            await filmService.delete(body.id);
            res.send({message: 'success'});
        } catch (e) {
            res.send({message: e.message});
        }
    }

    async addGenre(req, res) {
        try {
            const body = req.body;
            await filmService.addGenre(body);
            res.send({message: 'success'});
        } catch (e) {
            res.send({message: e.message});
        }
    }

    async removeGenre(req, res) {
        try {
            const body = req.body;
            await filmService.removeGenre(body);
            res.send({message: 'success'});
        } catch (e) {
            res.send({message: e.message});
        }
    }
}

module.exports = new FilmController();