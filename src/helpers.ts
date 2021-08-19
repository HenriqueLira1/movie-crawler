import fs from "fs-extra";
import { MovieData } from "./contracts";

export async function readMoviesData(): Promise<MovieData[]> {
    try {
        const moviesData = await fs.readJson("./movies-data.json");

        return moviesData as MovieData[];
    } catch (err) {
        console.error(err);
    }
}
