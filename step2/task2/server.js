const Application = require('./myExpress/Application');

const jsonParser = require('./myExpress/parseJson');
const urlParser = require('./myExpress/parseUrl');

const filmRouter = require('./film/film.router');
const genreRouter = require('./genre/genre.router');

const DOMAIN = process.env.DOMAIN || "http://localhost";
const PORT = process.env.PORT || 7000;

const app = new Application();

app.use(jsonParser);
app.use(urlParser(`${DOMAIN}:${PORT}`));

app.addRouter(filmRouter);
app.addRouter(genreRouter);

app.listen(PORT, () => {
    console.log(`Server was started on port: ${PORT}`);
});