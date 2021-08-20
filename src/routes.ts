import { Router } from "express";
import { isNull } from "lodash";
import { movieIndex, movies, populateMovieData } from "./movie-storage";

const routes = Router();

routes.get("/", async (_, res) => {
    res.send({ ok: true });
});

routes.post("/crawl-imdb", async (req, res) => {
    if (isNull(movies) || isNull(movieIndex)) {
        await populateMovieData();
    }

    return res.json({ success: true });
});

routes.get("/search/:searchTerm", async (req, res) => {
    if (isNull(movies) || isNull(movieIndex)) {
        return res
            .status(400)
            .json({ error: "IMDb movie pages not yet crawled!" });
    }

    const searchTerm = req.params.searchTerm;
    const foundMovies = movieIndex.searchMovies(searchTerm);

    const fondMoviesNames = foundMovies.map((movie) => movie.name);

    return res.json(fondMoviesNames);
});

export default routes;
