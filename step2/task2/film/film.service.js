const db = require('../db');
const genreService = require('../genre/genre.service');

class FilmService {
    async getAll() {
        const films = await db.query(`
            SELECT film.film_id, film.title, film.year, json_agg(g.name) as genres 
            FROM 
                film INNER JOIN film_genre fg on film.film_id = fg.film_id
                    INNER JOIN genre g on g.genre_id = fg.genre_id
            GROUP BY film.film_id`);
        return films.rows;
    }

    async getById(id) {
        const film = await db.query(`
            SELECT film.film_id, film.title, film.year, json_agg(g.name) as genres 
            FROM 
                film INNER JOIN film_genre fg on film.film_id = fg.film_id
                    INNER JOIN genre g on g.genre_id = fg.genre_id
            WHERE film.film_id = $1
            GROUP BY film.film_id`, [id]);
        return film.rows[0];
    }

    async create(dto) {
        const film = await db.query('INSERT INTO film ("title", "year") VALUES ($1, $2) RETURNING *', [dto.title, dto.year]);
        return film.rows[0];
    }

    async update(dto) {
        const film = await db.query('UPDATE film SET "title" = $1, "year" = $2 WHERE film_id = $3 RETURNING *', [dto.title, dto.year, dto.id]);
        return film.rows[0];
    }

    async delete(id) {
        await db.query('DELETE FROM film WHERE film_id = $1', [id]);
    }

    async addGenre(dto) {
        const film = await this.getById(dto.id);
        if (film.genres.includes(dto.genre)) {
            throw new Error(`Фильм ${film.title} уже имеет жанр ${dto.genre}`);
        }


        let genreFromDb = await genreService.getByName(dto.genre);
        if (!genreFromDb) {
            genreFromDb = await genreService.create({name: dto.genre});
        }


        await db.query('INSERT INTO film_genre (film_id, genre_id) VALUES ($1, $2)', [dto.id, genreFromDb.genre_id]);
    }

    async removeGenre(dto) {
        const genreFromDb = await genreService.getByName(dto.genre);
        await db.query('DELETE FROM film_genre WHERE film_id = $1 AND genre_id = $2', [dto.id, genreFromDb.genre_id]);
    }
}

module.exports = new FilmService();