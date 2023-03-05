const db = require("../db");

class GenreService {
    async getAll() {
        const genres = await db.query('SELECT * FROM genre');
        return genres.rows;
    }

    async getByName(name) {
        const genre = await db.query('SELECT * FROM genre WHERE name = $1', [name]);
        return genre.rows[0];
    }

    async getByFilmId(id) {
        const genres = await db.query('SELECT name FROM genre INNER JOIN film_genre fg on genre.genre_id = fg.genre_id WHERE film_id = $1', [id]);
        return genres.rows;
    }

    async create(dto) {
        const candidate = await this.getByName(dto.name);
        if (candidate) {
            throw new Error(`Жанр ${dto.name} уже существует`);
        }
        const genre = await db.query('INSERT INTO genre ("name") VALUES ($1) RETURNING *', [dto.name]);
        return genre.rows[0];
    }

    async update(dto) {
        const candidate = await this.getByName(dto.name);
        if (candidate) {
            throw new Error(`Жанр ${dto.name} уже существует`);
        }
        const genre = await db.query('UPDATE genre SET "name" = $1 WHERE genre_id = $2 RETURNING *', [dto.name, dto.id]);
        return genre.rows[0];
    }

    async delete(id) {
        await db.query('DELETE FROM genre WHERE genre_id = $1', [id]);
    }
}

module.exports = new GenreService();