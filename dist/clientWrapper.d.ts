import { Client, Models } from 'react-native-appwrite';
import { DatabaseMap } from './types';
import { QueryOptions } from './lib/query-builder';
import { PermissionOptions } from './lib/permission-builder';
type DatabaseId = keyof DatabaseMap;
type CollectionId<DB extends DatabaseId> = keyof DatabaseMap[DB];
declare class TypedAppwriteClient {
    private client;
    private databases;
    constructor(client: Client);
    createDocument<DB extends DatabaseId, COL extends CollectionId<DB>>(options: {
        databaseId: DB;
        collectionId: COL;
        documentId?: string;
        data: Omit<DatabaseMap[DB][COL], keyof Models.Document>;
        permissions?: PermissionOptions;
    }): Promise<DatabaseMap[DB][COL] & Models.Document>;
    listDocuments<DB extends DatabaseId, COL extends CollectionId<DB>>(options: {
        databaseId: DB;
        collectionId: COL;
        queries?: QueryOptions;
    }): Promise<Models.DocumentList<Models.Document>>;
    getDocument<DB extends DatabaseId, COL extends CollectionId<DB>, DocId extends string>(options: {
        databaseId: DB;
        collectionId: COL;
        documentId: DocId;
    }): Promise<Models.Document>;
    updateDocument<DB extends DatabaseId, COL extends CollectionId<DB>, DocId extends string>(options: {
        databaseId: DB;
        collectionId: COL;
        documentId: DocId;
        data: Partial<Omit<DatabaseMap[DB][COL], keyof Models.Document>>;
        permissions?: PermissionOptions;
    }): Promise<Models.Document>;
    deleteDocument<DB extends DatabaseId, COL extends CollectionId<DB>, DocId extends string>(options: {
        databaseId: DB;
        collectionId: COL;
        documentId: DocId;
    }): Promise<{}>;
    getRelatedDocuments<DB extends DatabaseId, COL extends CollectionId<DB>, DocId extends string, RelCol extends CollectionId<DB>>(options: {
        databaseId: DB;
        collectionId: COL;
        documentId: DocId;
        relatedCollectionId: RelCol;
        relationType: 'oneToOne' | 'oneToMany' | 'manyToMany';
        queries?: QueryOptions;
    }): Promise<Models.DocumentList<Models.Document>>;
}
export default TypedAppwriteClient;
