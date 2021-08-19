import { isArray } from "lodash";
import sanitizer from "string-sanitizer";

/**
 * Generates a sanitized set of tags for a given input
 * @param input Array of strings to generate tags from
 * @returns A set of tags
 */
export function generateTags(input: string | string[]): Set<string> {
    const tags = new Set<string>();

    if (isArray(input)) {
        for (const inputElement of input) {
            const elementTags = sanitizeString(inputElement).split(" ");
            elementTags.forEach((tag) => tags.add(tag));
        }
    } else {
        const elementTags = sanitizeString(input as string).split(" ");
        elementTags.forEach((tag) => tags.add(tag));
    }

    return tags;
}

/**
 * Sanitize a string removing any special caracters and lowercasing it
 * @param input Input to sanitize
 * @returns The sanitized string
 */
export function sanitizeString(input: string) {
    return sanitizer.sanitize.keepSpace(input).toLowerCase();
}
