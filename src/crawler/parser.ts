import * as cheerio from "cheerio";
import { MovieData } from "../contracts";

/**
 * Extract information about the movies from a html document
 * @param html The Html document to parse
 * @returns An array containing the movies data found in the given html
 */
export function parseMoviePage(html: string): MovieData[] {
    const $ = cheerio.load(html);
    const moviesData: MovieData[] = [];

    $(".lister-item, .mode-advanced").each((_, item) => {
        const movieInfo = $(item).find(".lister-item-content");

        const header = movieInfo.find(".lister-item-header");
        const name = header.children("a").text();
        const year = header.children(".lister-item-year").text().replace(/\D/g, "");

        const subHeader = movieInfo.find(".text-muted");
        const genres = subHeader.children(".genre").text().trim().split(", ");

        const ratingsBar = movieInfo.find(".ratings-bar");
        const rating = ratingsBar.children(".ratings-imdb-rating").children("strong").text();

        const synopsis = movieInfo.children().eq(3).text().trim();

        const directorsAndActors = movieInfo.children().eq(4).children();
        const directors: string[] = [];
        const actors: string[] = [];
        let state = "directors";

        directorsAndActors.each((i, elem) => {
            const childText = $(elem).text().trim();
            if (childText === "|") {
                state = "actors";
            } else if (state === "directors") {
                directors.push(childText);
            } else if (state === "actors") {
                actors.push(childText);
            }
        });

        moviesData.push({
            name,
            year,
            genres,
            rating,
            synopsis,
            directors,
            actors,
        });
    });

    return moviesData;
}
