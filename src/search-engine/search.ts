import { isEmpty } from "lodash";
import { MovieData } from "../contracts";
import { generateTags } from "./helpers";

export function searchMovie(userInput: string, invertedIndex: Map<string, Set<number>>, movies: MovieData[]) {
    const inputTags = generateTags(userInput);
    const foundIndexes = searchInvertedIndex(inputTags, invertedIndex);

    const foundMovies: MovieData[] = [];

    for (const index of foundIndexes) {
        foundMovies.push(movies[index]);
    }

    return foundMovies;
}

/**
 * Searches for common tags in the given inverted index
 * @param userInput Input to generate tags from
 * @param invertedIndex Inverted index to query
 * @returns The common indexes of the generated input tags
 */
export function searchInvertedIndex(inputTags: Set<string>, invertedIndex: Map<string, Set<number>>): number[] {
    const foundIndexesList: number[][] = [];

    for (const tag of inputTags) {
        if (invertedIndex.has(tag)) {
            const foundIndexes = invertedIndex.get(tag);
            foundIndexesList.push([...foundIndexes]);
        }
    }

    if (!isEmpty(foundIndexesList)) {
        return getIntersection(foundIndexesList);
    }

    return [];
}

/**
 * Gets the elements that appear in every given array
 * @param input Array of arrays of any type
 * @returns The common elements that appear in every array
 */
function getIntersection<T>(input: T[][]): T[] {
    return input.reduce((accumulator, currentValue) => {
        return accumulator.filter((tag) => currentValue.includes(tag));
    });
}
