import { Query } from 'node-appwrite';

export type QueryOptions = {
  equals?: { field: string, value: any }[],
  notEquals?: { field: string, value: any }[],
  lessThan?: { field: string, value: any }[],
  greaterThan?: { field: string, value: any }[],
  contains?: { field: string, value: any }[],
  [key: string]: any
};

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
