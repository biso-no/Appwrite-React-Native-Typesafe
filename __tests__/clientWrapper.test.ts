import { Client } from 'node-appwrite';
import TypedAppwriteClient from '../src/clientWrapper';

describe('TypedAppwriteClient', () => {
  let client: Client;
  let typedClient: TypedAppwriteClient;

  beforeAll(() => {
    client = new Client();
    typedClient = new TypedAppwriteClient(client);
  });

  it('should create a document', async () => {
    // Mock the createDocument function and add test logic
    const databaseId = 'testDatabase';
    const collectionId = 'testCollection';
    const documentData = { name: 'Test Document' };

    const createdDocument = await typedClient.createDocument(databaseId, collectionId, undefined, documentData);

    expect(createdDocument).toHaveProperty('$id');
    expect(createdDocument).toMatchObject(documentData);
  });
});
