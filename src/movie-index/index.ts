import { isEmpty } from "lodash";
import { MovieData } from "../contracts";
import { generateTags } from "./helpers";

export default class MovieIndex {
    private movieIndex: Map<string, Set<number>>;

    constructor(private movies: MovieData[]) {
        this.movieIndex = new Map<string, Set<number>>();
        this.buildMovieIndex();
    }

    /**
     * Searches for movies from given search term
     * @param searchTerm search term to query
     * @returns The found movies from the generated search term tags
     */
    public searchMovies(searchTerm: string): MovieData[] {
        const inputTags = generateTags(searchTerm);
        const commonIndexes = this.getIndexes(inputTags);

        const foundMovies: MovieData[] = [];

        for (const index of commonIndexes) {
            foundMovies.push(this.movies[index]);
        }

        return foundMovies;
    }

    /**
     * Gets the common indexes from given set of tags
     * @param tags Tags to query
     * @returns The common indexes of given tags
     */
    private getIndexes(tags: Set<string>): number[] {
        const foundIndexesList: number[][] = [];

        for (const tag of tags) {
            if (this.movieIndex.has(tag)) {
                const foundIndexes = this.movieIndex.get(tag);
                foundIndexesList.push([...foundIndexes]);
            }
        }

        if (!isEmpty(foundIndexesList)) {
            return this.getIntersection(foundIndexesList);
        }

        return [];
    }

    /**
     * Gets the elements that appear in every given array
     * @param input Array of arrays of any type
     * @returns The common elements that appear in every array
     */
    private getIntersection<T>(input: T[][]): T[] {
        return input.reduce((accumulator, currentValue) => {
            return accumulator.filter((tag) => currentValue.includes(tag));
        });
    }

    /**
     * Builds the movie index
     */
    private buildMovieIndex() {
        const forwardIndex = this.buildForwardIndex(this.movies);
        const invertedIndex = this.buildInvertedIndex(forwardIndex);

        for (const [tag, indexes] of invertedIndex) {
            if (this.movieIndex.has(tag)) {
                const currentIndexes = this.movieIndex.get(tag);
                indexes.forEach((index) => currentIndexes.add(index));
            } else {
                this.movieIndex.set(tag, indexes);
            }
        }
    }

    /**
     * Builds a forward index where each key is the movie index and the value
     * is a set of tags (strings) that will lead to the movie
     * @param movies List of crawled movies
     * @returns A movies forward index
     */
    private buildForwardIndex(movies: MovieData[]): Map<number, Set<string>> {
        const forwardIndex = new Map<number, Set<string>>();

        for (let index = 0; index < movies.length; index++) {
            forwardIndex.set(index, this.buildMovieTags(movies[index]));
        }

        return forwardIndex;
    }

    /**
     * Extract tags from a movie object
     * @param movie Movie to extract tags from
     * @returns A set of movie tags
     */
    private buildMovieTags(movie: MovieData) {
        return new Set([
            ...generateTags(movie.name),
            ...generateTags(movie.year),
            ...generateTags(movie.genres),
            ...generateTags(movie.directors),
            ...generateTags(movie.actors),
        ]);
    }

    /**
     * Builds a inverted index where maps each tag with all indexes that it appears
     * @param forwardIndex A movies forward index
     * @returns A movies inverted index
     */
    private buildInvertedIndex(forwardIndex: Map<number, Set<string>>): Map<string, Set<number>> {
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
}
