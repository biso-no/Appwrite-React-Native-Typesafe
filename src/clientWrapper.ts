import { Client, Databases } from 'node-appwrite';
import { DatabaseMap, Document } from './types'; // Ensure this path is correct

class TypedAppwriteClient {
  private client: Client;
  private databases: Databases;

  constructor(client: Client) {
    this.client = client;
    this.databases = new Databases(client);
  }

  async createDocument<
    DatabaseId extends keyof DatabaseMap,
    CollectionId extends keyof DatabaseMap[DatabaseId],
    T extends DatabaseMap[DatabaseId][CollectionId] & Document // Ensure T extends Document
  >(
    databaseId: DatabaseId,
    collectionId: CollectionId,
    documentId: string = 'unique()',
    data: Omit<T, '$id' | '$collectionId' | '$databaseId' | '$createdAt' | '$updatedAt' | '$permissions'>,
  ) {
    return await this.databases.createDocument<T>(
      databaseId as string,
      collectionId as string,
      documentId,
      data
    );
  }

  // Implement other methods similarly
}

export default TypedAppwriteClient;
