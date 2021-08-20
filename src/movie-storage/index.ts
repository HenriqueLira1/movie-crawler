import { MovieData } from "../contracts";
import { initCrawler } from "../crawler";
import MovieIndex from "../movie-index";

export let movies: MovieData[] | null = null;
export let movieIndex: MovieIndex | null = null;

export async function populateMovieData() {
    if (!movies) {
        movies = await initCrawler();
    } else if (!movieIndex) {
        movieIndex = new MovieIndex(movies);
    }
}
