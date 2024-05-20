import { Query } from 'node-appwrite';

export class QueryBuilder {
  private queries: string[];

  constructor() {
    this.queries = [];
  }

  equals(field: string, value: any): QueryBuilder {
    this.queries.push(Query.equal(field, value));
    return this;
  }

  notEquals(field: string, value: any): QueryBuilder {
    this.queries.push(Query.notEqual(field, value));
    return this;
  }

  lessThan(field: string, value: any): QueryBuilder {
    this.queries.push(Query.lessThan(field, value));
    return this;
  }

  greaterThan(field: string, value: any): QueryBuilder {
    this.queries.push(Query.greaterThan(field, value));
    return this;
  }

  contains(field: string, value: any): QueryBuilder {
    this.queries.push(Query.search(field, value));
    return this;
  }

  build(): string[] {
    return this.queries;
  }
}
