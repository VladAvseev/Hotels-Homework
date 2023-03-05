const genreService = require("../genre/genre.service");

class GenreController {
    async get(req, res) {
        try {
            if (req.params.name) {
                const genre = await genreService.getByName(req.params.name);
                res.send(genre);
            } else {
                const genres = await genreService.getAll();
                res.send(genres);
            }
        } catch (e) {
            res.send({message: e.message});
        }
    }

    async create(req, res) {
        try {
            const body = req.body;
            const genre = await genreService.create(body);
            res.send(genre);
        } catch (e) {
            res.send({message: e.message});
        }
    }

    async update(req, res) {
        try {
            const body = req.body;
            const genre = await genreService.update(body);
            res.send(genre);
        } catch (e) {
            res.send({message: e.message});
        }
    }

    async delete(req, res) {
        try {
            const body = req.body;
            await genreService.delete(body.id);
            res.send({message: 'success'});
        } catch (e) {
            res.send({message: e.message});
        }
    }
}

module.exports = new GenreController();