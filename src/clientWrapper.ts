import { Client, Databases, Models } from 'node-appwrite';
import { DatabaseMap } from './types'; 
import { buildQueries, QueryOptions } from './lib/query-builder';
import { buildPermissions, PermissionOptions } from './lib/permission-builder';

type DatabaseId = keyof DatabaseMap;
type CollectionId<DB extends DatabaseId> = keyof DatabaseMap[DB];


class TypedAppwriteClient {
  private client: Client;
  private databases: Databases;

  constructor(client: Client) {
    this.client = client;
    this.databases = new Databases(client);
  }

  async createDocument<
    DB extends DatabaseId,
    COL extends CollectionId<DB>
  >(
    options: {
      databaseId: DB,
      collectionId: COL,
      documentId?: string,
      data: Omit<DatabaseMap[DB][COL], '$id' | '$collectionId' | '$databaseId' | '$createdAt' | '$updatedAt' | '$permissions'>,
      permissions?: PermissionOptions
    }
  ): Promise<DatabaseMap[DB][COL] & Models.Document> {
    const { databaseId, collectionId, documentId = 'unique()', data, permissions } = options;
    const permissionList = permissions ? buildPermissions(permissions) : [];
    return await this.databases.createDocument<DatabaseMap[DB][COL]>(
      databaseId as string,
      collectionId as string,
      documentId,
      data,
      permissionList
    );
  }

  async listDocuments<
    DB extends DatabaseId,
    COL extends CollectionId<DB>
  >(
    options: {
      databaseId: DB,
      collectionId: COL,
      queries?: QueryOptions
    }
  ) {
    const { databaseId, collectionId, queries } = options;
    const queryList = queries ? buildQueries(queries) : [];
    return await this.databases.listDocuments(databaseId as string, collectionId as string, queryList);
  }

  async getDocument<
    DB extends DatabaseId,
    COL extends CollectionId<DB>,
    DocId extends string
  >(
    options: {
      databaseId: DB,
      collectionId: COL,
      documentId: DocId
    }
  ) {
    const { databaseId, collectionId, documentId } = options;
    return await this.databases.getDocument(databaseId as string, collectionId as string, documentId);
  }

  async updateDocument<
    DB extends DatabaseId,
    COL extends CollectionId<DB>,
    DocId extends string
  >(
    options: {
      databaseId: DB,
      collectionId: COL,
      documentId: DocId,
      data: Partial<Omit<DatabaseMap[DB][COL], '$id' | '$collectionId' | '$databaseId' | '$createdAt' | '$updatedAt' | '$permissions'>>,
      permissions?: PermissionOptions
    }
  ) {
    const { databaseId, collectionId, documentId, data, permissions } = options;
    const permissionList = permissions ? buildPermissions(permissions) : [];
    return await this.databases.updateDocument(
      databaseId as string,
      collectionId as string,
      documentId as string,
      data,
      permissionList
    );
  }

  async deleteDocument<
    DB extends DatabaseId,
    COL extends CollectionId<DB>,
    DocId extends string
  >(
    options: {
      databaseId: DB,
      collectionId: COL,
      documentId: DocId
    }
  ) {
    const { databaseId, collectionId, documentId } = options;
    return await this.databases.deleteDocument(
      databaseId as string,
      collectionId as string,
      documentId as string
    );
  }

  async listCollections<DB extends DatabaseId>(
    options: {
      databaseId: DB,
      queries?: QueryOptions,
      search?: string
    }
  ) {
    const { databaseId, queries, search } = options;
    const queryList = queries ? buildQueries(queries) : [];
    return await this.databases.listCollections(databaseId as string, queryList, search);
  }

  async getCollection<DB extends DatabaseId, COL extends CollectionId<DB>>(
    options: {
      databaseId: DB,
      collectionId: COL
    }
  ) {
    const { databaseId, collectionId } = options;
    return await this.databases.getCollection(databaseId as string, collectionId as string);
  }

  async updateCollection<DB extends DatabaseId, COL extends CollectionId<DB>>(
    options: {
      databaseId: DB,
      collectionId: COL,
      name: string,
      permissions?: PermissionOptions,
      security?: boolean,
      enabled?: boolean
    }
  ) {
    const { databaseId, collectionId, name, permissions, security, enabled } = options;
    const permissionList = permissions ? buildPermissions(permissions) : [];
    return await this.databases.updateCollection(
      databaseId as string,
      collectionId as string,
      name,
      permissionList,
      security,
      enabled
    );
  }

  async deleteCollection<DB extends DatabaseId, COL extends CollectionId<DB>>(
    options: {
      databaseId: DB,
      collectionId: COL
    }
  ) {
    const { databaseId, collectionId } = options;
    return await this.databases.deleteCollection(
      databaseId as string,
      collectionId as string
    );
  }

  async listDatabases(options?: { queries?: QueryOptions, search?: string }) {
    const { queries, search } = options || {};
    const queryList = queries ? buildQueries(queries) : [];
    return await this.databases.list(queryList, search);
  }

  async getDatabase<DB extends DatabaseId>(options: { databaseId: DB }) {
    const { databaseId } = options;
    return await this.databases.get(databaseId as string);
  }

  async updateDatabase<DB extends DatabaseId>(
    options: {
      databaseId: DB,
      name: string,
      enabled: boolean
    }
  ) {
    const { databaseId, name, enabled } = options;
    return await this.databases.update(
      databaseId as string,
      name,
      enabled
    );
  }

  async deleteDatabase<DB extends DatabaseId>(options: { databaseId: DB }) {
    const { databaseId } = options;
    return await this.databases.delete(
      databaseId as string
    );
  }

  async createDatabase<DB extends DatabaseId>(
    options: {
      id: DB,
      name: string,
      enabled: boolean
    }
  ) {
    const { id, name, enabled } = options;
    return await this.databases.create(
      id as string,
      name,
      enabled
    );
  }

  async listAttributes<DB extends DatabaseId, COL extends CollectionId<DB>>(
    options: {
      databaseId: DB,
      collectionId: COL,
      queries: QueryOptions
    }
  ) {
    const { databaseId, collectionId, queries } = options;
    const queryList = buildQueries(queries);
    return await this.databases.listAttributes(
      databaseId as string,
      collectionId as string,
      queryList
    );
  }

  async getRelatedDocuments<
    DB extends DatabaseId,
    COL extends CollectionId<DB>,
    DocId extends string,
    RelCol extends CollectionId<DB>
  >(
    options: {
      databaseId: DB,
      collectionId: COL,
      documentId: DocId,
      relatedCollectionId: RelCol,
      relationType: 'oneToOne' | 'oneToMany' | 'manyToMany',
      queries?: QueryOptions
    }
  ) {
    const { databaseId, collectionId, documentId, relatedCollectionId, relationType, queries } = options;
    const queryList = queries ? buildQueries(queries) : [];

    if (relationType === 'oneToOne' || relationType === 'oneToMany') {
      const mainDocument = await this.getDocument({
        databaseId,
        collectionId,
        documentId
      });

      const relatedDocuments = await this.listDocuments({
        databaseId,
        collectionId: relatedCollectionId,
        queries: {
          equals: [{ field: 'relatedField', value: mainDocument.$id }]
        }
      });

      return relatedDocuments;
    }
    
    return await this.listDocuments({
      databaseId,
      collectionId: relatedCollectionId,
      queries: queryList
    });
  }
}

export default TypedAppwriteClient;
