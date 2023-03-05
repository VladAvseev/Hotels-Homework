CREATE TABLE person (
    person_id serial PRIMARY KEY,
    name VARCHAR(256) NOT NULL
);

CREATE TABLE country (
    country_id serial PRIMARY KEY,
    name VARCHAR(256) NOT NULL
);

CREATE TABLE genre (
    genre_id serial PRIMARY KEY,
    name VARCHAR(256) NOT NULL
);

CREATE TABLE viewer (
    viewer_id serial PRIMARY KEY,
    name VARCHAR(256) NOT NULL
);

CREATE TABLE film (
    film_id SERIAL PRIMARY KEY,
    title VARCHAR(256) NOT NULL,
    description TEXT,
    poster VARCHAR(256),
    trailer VARCHAR(256),
    audio_track VARCHAR(256),
    subtitles VARCHAR(256),
    video_quality VARCHAR(256),
    "year" INT NOT NULL,
    country_id INT NOT NULL,
    tagline TEXT,
    director_id INT NOT NULL,
    screenwriter_id INT NOT NULL,
    producer_id INT NOT NULL,
    operator_id INT NOT NULL,
    composer_id INT NOT NULL,
    artist_id INT NOT NULL,
    editor_id INT NOT NULL,
    fees INT NOT NULL,
    premiere_russia DATE,
    premiere_world DATE,
    age_limit VARCHAR(256),
    MPAA_rating VARCHAR(256),
    duration INT NOT NULL,

    FOREIGN KEY (country_id) REFERENCES country (country_id) ON DELETE SET NULL,
    FOREIGN KEY (director_id) REFERENCES person (person_id) ON DELETE SET NULL,
    FOREIGN KEY (screenwriter_id) REFERENCES person (person_id) ON DELETE SET NULL,
    FOREIGN KEY (producer_id) REFERENCES person (person_id) ON DELETE SET NULL,
    FOREIGN KEY (operator_id) REFERENCES person (person_id) ON DELETE SET NULL,
    FOREIGN KEY (composer_id) REFERENCES person (person_id) ON DELETE SET NULL,
    FOREIGN KEY (artist_id) REFERENCES person (person_id) ON DELETE SET NULL,
    FOREIGN KEY (editor_id) REFERENCES person (person_id) ON DELETE SET NULL
);

CREATE TABLE person_film (
    person_film_id SERIAL PRIMARY KEY,
    film_id INT NOT NULL,
    person_id INT NOT NULL,

    FOREIGN KEY (film_id) REFERENCES film (film_id) ON DELETE CASCADE,
    FOREIGN KEY (person_id) REFERENCES person (person_id) ON DELETE CASCADE
);

CREATE TABLE viewers_count (
    viewers_count_id SERIAL PRIMARY KEY,
    film_id INT NOT NULL,
    country_id INT NOT NULL,
    "count" INT NOT NULL,

    FOREIGN KEY (film_id) REFERENCES film (film_id) ON DELETE CASCADE,
    FOREIGN KEY (country_id) REFERENCES country (country_id) ON DELETE CASCADE
);

CREATE TABLE film_genre (
    film_genre_id SERIAL PRIMARY KEY,
    film_id INT NOT NULL,
    genre_id INT NOT NULL,

    FOREIGN KEY (film_id) REFERENCES film (film_id) ON DELETE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES genre (genre_id) ON DELETE CASCADE
);

CREATE TABLE grade (
    grade_id SERIAL PRIMARY KEY,
    film_id INT NOT NULL,
    viewer_id INT NOT NULL,
    "value" INT NOT NULL,

    FOREIGN KEY (film_id) REFERENCES film (film_id) ON DELETE CASCADE,
    FOREIGN KEY (viewer_id) REFERENCES viewer (viewer_id) ON DELETE CASCADE
);

CREATE TABLE review (
    review_id SERIAL PRIMARY KEY,
    film_id INT NOT NULL,
    viewer_id INT NOT NULL,
    title VARCHAR(256),
    "text" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "time" TIME NOT NULL,

    FOREIGN KEY (film_id) REFERENCES film (film_id) ON DELETE CASCADE,
    FOREIGN KEY (viewer_id) REFERENCES viewer (viewer_id) ON DELETE CASCADE
);
