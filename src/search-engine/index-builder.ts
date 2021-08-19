import { MovieData } from "../contracts";
import { generateTags } from "./helpers";

/**
 * Builds a inverted index where maps each tag with all indexes that it appears
 * @param forwardIndex A movies forward index
 * @returns A movies inverted index
 */
export function buildInvertedIndex(forwardIndex: Map<number, Set<string>>) {
    const invertedIndex = new Map<string, Set<number>>();

    for (const [index, tags] of forwardIndex) {
        for (const tag of tags) {
            if (invertedIndex.has(tag)) {
                const currentIndexes = invertedIndex.get(tag);
                currentIndexes.add(index);
            } else {
                const indexSet = new Set<number>();
                indexSet.add(index);

                invertedIndex.set(tag, indexSet);
            }
        }
    }

    return invertedIndex;
}

/**
 * Builds a forward index where each key is the movie index and the value
 * is a set of tags (strings) that will lead to the movie
 * @param movies List of crawled movies
 * @returns A movies forward index
 */
export function buildForwardIndex(movies: MovieData[]): Map<number, Set<string>> {
    const forwardIndex = new Map<number, Set<string>>();

    for (let index = 0; index < movies.length; index++) {
        forwardIndex.set(index, generateTags(movies[index].actors));
    }

    return forwardIndex;
}
