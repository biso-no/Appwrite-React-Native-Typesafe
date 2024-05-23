/**
 * Options for configuring queries.
 */
export type QueryOptions = {
    /**
     * Conditions for equality queries.
     *
     * Each condition should specify a `field` and a `value`.
     */
    equals?: {
        field: string;
        value: any;
    }[];
    /**
     * Conditions for inequality queries.
     *
     * Each condition should specify a `field` and a `value`.
     */
    notEquals?: {
        field: string;
        value: any;
    }[];
    /**
     * Conditions for less than queries.
     *
     * Each condition should specify a `field` and a `value`.
     */
    lessThan?: {
        field: string;
        value: any;
    }[];
    /**
     * Conditions for greater than queries.
     *
     * Each condition should specify a `field` and a `value`.
     */
    greaterThan?: {
        field: string;
        value: any;
    }[];
    /**
     * Conditions for contains queries.
     *
     * Each condition should specify a `field` and a `value`.
     */
    contains?: {
        field: string;
        value: any;
    }[];
    [key: string]: any;
};
/**
 * Builds a list of query strings based on the provided options.
 *
 * @param {QueryOptions} options - The query options.
 * @returns {string[]} A list of query strings.
 */
export declare const buildQueries: (options: QueryOptions) => string[];
