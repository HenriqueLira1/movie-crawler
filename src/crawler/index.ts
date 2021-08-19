import axios from "axios";
import fs from "fs-extra";
import { MovieData } from "../contracts";
import { parseMoviePage } from "./parser";

export async function initCrawler() {
    let moviesData: MovieData[] = [];

    for (let count = 1; count <= 1000; count += 100) {
        const { data: html } = await axios.get("https://www.imdb.com/search/title/", {
            headers: {
                "accept-language": "en-US,en",
            },
            params: {
                groups: "top_1000",
                sort: "user_rating,desc",
                count: 100,
                start: count,
            },
        });

        const parsedMoviesData = parseMoviePage(html);
        moviesData = moviesData.concat(parsedMoviesData);
    }

    await saveMoviesData(moviesData);

    return moviesData;
}

async function saveMoviesData(moviesData: MovieData[]) {
    try {
        await fs.writeJson("./movies-data.json", moviesData);
        console.log("success!");
    } catch (err) {
        console.error(err);
    }
}
