import { isNull } from "lodash";
import { MovieData } from "../contracts";
import { initCrawler } from "../crawler";
import MovieIndex from "../movie-index";

export let movies: MovieData[] | null = null;
export let movieIndex: MovieIndex | null = null;

/**
 * Populate the movies array and movie index with data scraped off from imdb pages
 */
export async function populateMovieData() {
    if (isNull(movies)) {
        movies = await initCrawler();
    }

    if (isNull(movieIndex)) {
        movieIndex = new MovieIndex(movies);
    }
}
