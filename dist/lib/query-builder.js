"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildQueries = void 0;
const react_native_appwrite_1 = require("react-native-appwrite");
/**
 * Builds a list of query strings based on the provided options.
 *
 * @param {QueryOptions} options - The query options.
 * @returns {string[]} A list of query strings.
 */
const buildQueries = (options) => {
    const queries = [];
    if (options.equals) {
        options.equals.forEach(condition => {
            queries.push(react_native_appwrite_1.Query.equal(condition.field, condition.value));
        });
    }
    if (options.notEquals) {
        options.notEquals.forEach(condition => {
            queries.push(react_native_appwrite_1.Query.notEqual(condition.field, condition.value));
        });
    }
    if (options.lessThan) {
        options.lessThan.forEach(condition => {
            queries.push(react_native_appwrite_1.Query.lessThan(condition.field, condition.value));
        });
    }
    if (options.greaterThan) {
        options.greaterThan.forEach(condition => {
            queries.push(react_native_appwrite_1.Query.greaterThan(condition.field, condition.value));
        });
    }
    if (options.contains) {
        options.contains.forEach(condition => {
            queries.push(react_native_appwrite_1.Query.search(condition.field, condition.value));
        });
    }
    return queries;
};
exports.buildQueries = buildQueries;
//# sourceMappingURL=query-builder.js.map