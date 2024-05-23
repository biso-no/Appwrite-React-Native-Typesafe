import { Query } from 'appwrite';

/**
 * Options for configuring queries.
 */
export type QueryOptions = {
  /**
   * Conditions for equality queries.
   * 
   * Each condition should specify a `field` and a `value`.
   */
  equals?: { field: string, value: any }[],
  
  /**
   * Conditions for inequality queries.
   * 
   * Each condition should specify a `field` and a `value`.
   */
  notEquals?: { field: string, value: any }[],
  
  /**
   * Conditions for less than queries.
   * 
   * Each condition should specify a `field` and a `value`.
   */
  lessThan?: { field: string, value: any }[],
  
  /**
   * Conditions for greater than queries.
   * 
   * Each condition should specify a `field` and a `value`.
   */
  greaterThan?: { field: string, value: any }[],
  
  /**
   * Conditions for contains queries.
   * 
   * Each condition should specify a `field` and a `value`.
   */
  contains?: { field: string, value: any }[],
  
  [key: string]: any
};

/**
 * Builds a list of query strings based on the provided options.
 * 
 * @param {QueryOptions} options - The query options.
 * @returns {string[]} A list of query strings.
 */
export const buildQueries = (options: QueryOptions): string[] => {
  const queries: string[] = [];

  if (options.equals) {
    options.equals.forEach(condition => {
      queries.push(Query.equal(condition.field, condition.value));
    });
  }

  if (options.notEquals) {
    options.notEquals.forEach(condition => {
      queries.push(Query.notEqual(condition.field, condition.value));
    });
  }

  if (options.lessThan) {
    options.lessThan.forEach(condition => {
      queries.push(Query.lessThan(condition.field, condition.value));
    });
  }

  if (options.greaterThan) {
    options.greaterThan.forEach(condition => {
      queries.push(Query.greaterThan(condition.field, condition.value));
    });
  }

  if (options.contains) {
    options.contains.forEach(condition => {
      queries.push(Query.search(condition.field, condition.value));
    });
  }

  return queries;
};
