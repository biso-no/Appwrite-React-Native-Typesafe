import { Client, Databases, Models } from 'node-appwrite';
import { DatabaseMap } from './types'; 
import { buildQueries, QueryOptions } from './lib/query-builder';
import { buildPermissions, PermissionOptions } from './lib/permission-builder';

type DatabaseId = keyof DatabaseMap;
type CollectionId<DB extends DatabaseId> = keyof DatabaseMap[DB];

/**
 * Typed client for interacting with Appwrite databases.
 */
class TypedAppwriteClient {
  private client: Client;
  private databases: Databases;

  /**
   * Constructs a new TypedAppwriteClient instance.
   * 
   * @param {Client} client - The Appwrite client instance.
   */
  constructor(client: Client) {
    this.client = client;
    this.databases = new Databases(client);
  }

  /**
   * Creates a new document in the specified collection.
   * 
   * @param {Object} options - The options for creating the document.
   * @param {DatabaseId} options.databaseId - The ID of the database.
   * @param {CollectionId<DatabaseId>} options.collectionId - The ID of the collection.
   * @param {string} [options.documentId] - The ID of the document. Defaults to 'unique()'.
   * @param {Object} options.data - The data of the document.
   * @param {PermissionOptions} [options.permissions] - The permissions for the document.
   * @returns {Promise<T>} The created document.
   */
  async createDocument<
    DatabaseId extends keyof DatabaseMap,
    CollectionId extends keyof DatabaseMap[DatabaseId],
    T extends DatabaseMap[DatabaseId][CollectionId] & Models.Document
  >(
    options: {
      databaseId: DatabaseId,
      collectionId: CollectionId,
      documentId?: string,
      data: Omit<T, '$id' | '$collectionId' | '$databaseId' | '$createdAt' | '$updatedAt' | '$permissions'>,
      permissions?: PermissionOptions
    }
  ) {
    const { databaseId, collectionId, documentId = 'unique()', data, permissions } = options;
    const permissionList = permissions ? buildPermissions(permissions) : [];
    return await this.databases.createDocument<T>(
      databaseId as string,
      collectionId as string,
      documentId,
      data,
      permissionList
    );
  }

  /**
   * Lists documents in the specified collection.
   * 
   * @param {Object} options - The options for listing documents.
   * @param {DatabaseId} options.databaseId - The ID of the database.
   * @param {CollectionId<DatabaseId>} options.collectionId - The ID of the collection.
   * @param {QueryOptions} [options.queries] - The queries for filtering the documents.
   * @returns {Promise<Models.DocumentList<DatabaseMap[DatabaseId][CollectionId]>>} The list of documents.
   */
  async listDocuments<DatabaseId extends keyof DatabaseMap, CollectionId extends keyof DatabaseMap[DatabaseId]>(
    options: {
      databaseId: DatabaseId,
      collectionId: CollectionId,
      queries?: QueryOptions
    }
  ) {
    const { databaseId, collectionId, queries } = options;
    const queryList = queries ? buildQueries(queries) : [];
    return await this.databases.listDocuments(databaseId as string, collectionId as string, queryList);
  }

  /**
   * Gets a document from the specified collection.
   * 
   * @param {Object} options - The options for getting the document.
   * @param {DatabaseId} options.databaseId - The ID of the database.
   * @param {CollectionId<DatabaseId>} options.collectionId - The ID of the collection.
   * @param {string} options.documentId - The ID of the document.
   * @returns {Promise<DatabaseMap[DatabaseId][CollectionId] & Models.Document>} The document.
   */
  async getDocument<DatabaseId extends keyof DatabaseMap, CollectionId extends keyof DatabaseMap[DatabaseId], DocumentId extends string>(
    options: {
      databaseId: DatabaseId,
      collectionId: CollectionId,
      documentId: DocumentId
    }
  ) {
    const { databaseId, collectionId, documentId } = options;
    return await this.databases.getDocument(databaseId as string, collectionId as string, documentId);
  }

  /**
   * Updates a document in the specified collection.
   * 
   * @param {Object} options - The options for updating the document.
   * @param {DatabaseId} options.databaseId - The ID of the database.
   * @param {CollectionId<DatabaseId>} options.collectionId - The ID of the collection.
   * @param {string} options.documentId - The ID of the document.
   * @param {Partial<Omit<DatabaseMap[DatabaseId][CollectionId], '$id' | '$collectionId' | '$databaseId' | '$createdAt' | '$updatedAt' | '$permissions'>>} options.data - The partial data of the document.
   * @param {PermissionOptions} [options.permissions] - The permissions for the document.
   * @returns {Promise<DatabaseMap[DatabaseId][CollectionId] & Models.Document>} The updated document.
   */
  async updateDocument<DatabaseId extends keyof DatabaseMap, CollectionId extends keyof DatabaseMap[DatabaseId], DocumentId extends string>(
    options: {
      databaseId: DatabaseId,
      collectionId: CollectionId,
      documentId: DocumentId,
      data: Partial<Omit<DatabaseMap[DatabaseId][CollectionId], '$id' | '$collectionId' | '$databaseId' | '$createdAt' | '$updatedAt' | '$permissions'>>,
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

  /**
   * Deletes a document from the specified collection.
   * 
   * @param {Object} options - The options for deleting the document.
   * @param {DatabaseId} options.databaseId - The ID of the database.
   * @param {CollectionId<DatabaseId>} options.collectionId - The ID of the collection.
   * @param {DocumentId} options.documentId - The ID of the document.
   * @returns {Promise<void>} A promise that resolves when the document is deleted.
   */
  async deleteDocument<DatabaseId extends keyof DatabaseMap, CollectionId extends keyof DatabaseMap[DatabaseId], DocumentId extends string>(
    options: {
      databaseId: DatabaseId,
      collectionId: CollectionId,
      documentId: DocumentId
    }
  ) {
    const { databaseId, collectionId, documentId } = options;
    return await this.databases.deleteDocument(
      databaseId as string,
      collectionId as string,
      documentId as string
    );
  }

  /**
   * Lists collections in the specified database.
   * 
   * @param {Object} options - The options for listing collections.
   * @param {DatabaseId} options.databaseId - The ID of the database.
   * @param {QueryOptions} [options.queries] - The queries for filtering the collections.
   * @param {string} [options.search] - The search term for filtering the collections.
   * @returns {Promise<Models.CollectionList>} The list of collections.
   */
  async listCollections<DatabaseId extends keyof DatabaseMap>(
    options: {
      databaseId: DatabaseId,
      queries?: QueryOptions,
      search?: string
    }
  ) {
    const { databaseId, queries, search } = options;
    const queryList = queries ? buildQueries(queries) : [];
    return await this.databases.listCollections(databaseId as string, queryList, search);
  }

  /**
   * Gets a collection from the specified database.
   * 
   * @param {Object} options - The options for getting the collection.
   * @param {DatabaseId} options.databaseId - The ID of the database.
   * @param {CollectionId<DatabaseId>} options.collectionId - The ID of the collection.
   * @returns {Promise<Models.Collection>} The collection.
   */
  async getCollection<DatabaseId extends keyof DatabaseMap, CollectionId extends keyof DatabaseMap[DatabaseId]>(
    options: {
      databaseId: DatabaseId,
      collectionId: CollectionId
    }
  ) {
    const { databaseId, collectionId } = options;
    return await this.databases.getCollection(databaseId as string, collectionId as string);
  }

  /**
   * Updates a collection in the specified database.
   * 
   * @param {Object} options - The options for updating the collection.
   * @param {DatabaseId} options.databaseId - The ID of the database.
   * @param {CollectionId<DatabaseId>} options.collectionId - The ID of the collection.
   * @param {string} options.name - The name of the collection.
   * @param {PermissionOptions} [options.permissions] - The permissions for the collection.
   * @param {boolean} [options.security] - The security setting for the collection.
   * @param {boolean} [options.enabled] - The enabled status of the collection.
   * @returns {Promise<Models.Collection>} The updated collection.
   */
  async updateCollection<DatabaseId extends keyof DatabaseMap, CollectionId extends keyof DatabaseMap[DatabaseId]>(
    options: {
      databaseId: DatabaseId,
      collectionId: CollectionId,
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

  /**
   * Deletes a collection from the specified database.
   * 
   * @param {Object} options - The options for deleting the collection.
   * @param {DatabaseId} options.databaseId - The ID of the database.
   * @param {CollectionId<DatabaseId>} options.collectionId - The ID of the collection.
   * @returns {Promise<void>} A promise that resolves when the collection is deleted.
   */
  async deleteCollection<DatabaseId extends keyof DatabaseMap, CollectionId extends keyof DatabaseMap[DatabaseId]>(
    options: {
      databaseId: DatabaseId,
      collectionId: CollectionId
    }
  ) {
    const { databaseId, collectionId } = options;
    return await this.databases.deleteCollection(
      databaseId as string,
      collectionId as string
    );
  }

  /**
   * Lists databases.
   * 
   * @param {Object} [options] - The options for listing databases.
   * @param {QueryOptions} [options.queries] - The queries for filtering the databases.
   * @param {string} [options.search] - The search term for filtering the databases.
   * @returns {Promise<Models.DatabaseList>} The list of databases.
   */
  async listDatabases(options?: { queries?: QueryOptions, search?: string }) {
    const { queries, search } = options || {};
    const queryList = queries ? buildQueries(queries) : [];
    return await this.databases.list(queryList, search);
  }

  /**
   * Gets a database.
   * 
   * @param {Object} options - The options for getting the database.
   * @param {DatabaseId} options.databaseId - The ID of the database.
   * @returns {Promise<Models.Database>} The database.
   */
  async getDatabase<DatabaseId extends keyof DatabaseMap>(options: { databaseId: DatabaseId }) {
    const { databaseId } = options;
    return await this.databases.get(databaseId as string);
  }

  /**
   * Updates a database.
   * 
   * @param {Object} options - The options for updating the database.
   * @param {DatabaseId} options.databaseId - The ID of the database.
   * @param {string} options.name - The name of the database.
   * @param {boolean} options.enabled - The enabled status of the database.
   * @returns {Promise<Models.Database>} The updated database.
   */
  async updateDatabase<DatabaseId extends keyof DatabaseMap>(
    options: {
      databaseId: DatabaseId,
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

  /**
   * Deletes a database.
   * 
   * @param {Object} options - The options for deleting the database.
   * @param {DatabaseId} options.databaseId - The ID of the database.
   * @returns {Promise<void>} A promise that resolves when the database is deleted.
   */
  async deleteDatabase<DatabaseId extends keyof DatabaseMap>(options: { databaseId: DatabaseId }) {
    const { databaseId } = options;
    return await this.databases.delete(
      databaseId as string
    );
  }

  /**
   * Creates a new database.
   * 
   * @param {Object} options - The options for creating the database.
   * @param {DatabaseId} options.id - The ID of the database.
   * @param {string} options.name - The name of the database.
   * @param {boolean} options.enabled - The enabled status of the database.
   * @returns {Promise<Models.Database>} The created database.
   */
  async createDatabase<DatabaseId extends keyof DatabaseMap>(
    options: {
      id: DatabaseId,
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

  /**
   * Lists attributes of a collection in the specified database.
   * 
   * @param {Object} options - The options for listing attributes.
   * @param {DatabaseId} options.databaseId - The ID of the database.
   * @param {CollectionId<DatabaseId>} options.collectionId - The ID of the collection.
   * @param {QueryOptions} options.queries - The queries for filtering the attributes.
   * @returns {Promise<Models.AttributeList>} The list of attributes.
   */
  async listAttributes<DatabaseId extends keyof DatabaseMap, CollectionId extends keyof DatabaseMap[DatabaseId]>(
    options: {
      databaseId: DatabaseId,
      collectionId: CollectionId,
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

  /**
   * Gets related documents from another collection based on the specified relation type.
   * 
   * @param {Object} options - The options for getting related documents.
   * @param {DatabaseId} options.databaseId - The ID of the database.
   * @param {CollectionId<DatabaseId>} options.collectionId - The ID of the collection.
   * @param {DocumentId} options.documentId - The ID of the document.
   * @param {CollectionId<DatabaseId>} options.relatedCollectionId - The ID of the related collection.
   * @param {'oneToOne' | 'oneToMany' | 'manyToMany'} options.relationType - The type of relation.
   * @param {QueryOptions} [options.queries] - The queries for filtering the related documents.
   * @returns {Promise<Models.DocumentList<DatabaseMap[DatabaseId][CollectionId]>>} The list of related documents.
   */
  async getRelatedDocuments<
    DatabaseId extends keyof DatabaseMap,
    CollectionId extends keyof DatabaseMap[DatabaseId],
    DocumentId extends string,
    RelatedCollectionId extends keyof DatabaseMap[DatabaseId]
  >(
    options: {
      databaseId: DatabaseId,
      collectionId: CollectionId,
      documentId: DocumentId,
      relatedCollectionId: RelatedCollectionId,
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
