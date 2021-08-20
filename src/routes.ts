import { Router } from "express";
import { movieIndex, movies, populateMovieData } from "./movie-storage";

const routes = Router();

routes.get("/", async (_, res) => {
    res.send({ ok: true });
});

routes.post("/crawl-imdb", async (req, res) => {
    if (!movies || !movieIndex) {
        await populateMovieData();
    }

    res.send({ success: true });
});

routes.get("/search/:searchTerm", async (req, res) => {
    if (!movies || !movieIndex) {
        await populateMovieData();
    }

    const searchTerm = req.params.searchTerm;
    const foundMovies = movieIndex.searchMovies(searchTerm);

    res.send(foundMovies);
});

export default routes;
