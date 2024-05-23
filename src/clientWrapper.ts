import { Client, Databases, Models } from 'react-native-appwrite';
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
      data: Omit<DatabaseMap[DB][COL], keyof Models.Document>,
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
      data: Partial<Omit<DatabaseMap[DB][COL], keyof Models.Document>>,
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
