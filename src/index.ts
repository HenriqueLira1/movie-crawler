import express from "express";
import { readMoviesData } from "./helpers";
import { buildForwardIndex, buildInvertedIndex } from "./search-engine/index-builder";
import { searchMovie } from "./search-engine/search";

const app = express();
const port = 8080; // default port to listen

// define a route handler for the default home page
app.get("/", async (req, res) => {
    const moviesData = await readMoviesData();
    const fowardIndex = buildForwardIndex(moviesData);
    const invertedIndex = buildInvertedIndex(fowardIndex);
    const searched = searchMovie(" al pacino", invertedIndex, moviesData);

    res.send(searched);
});

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
