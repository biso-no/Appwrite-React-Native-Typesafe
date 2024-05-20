import { Client } from 'node-appwrite';
import TypedAppwriteClient from './clientWrapper';

const client = new Client();

client
  .setEndpoint('https://appwrite-rg044w0.biso.no/v1')
  .setProject('biso')
  .setKey('f0f1a97a384a920dff3c38d12ed3c8cb9100b6484f70d1113c06ff8a9a4ec30ab1e4ea135ed48410dd7b3720d9dfa43c59987a9f94400a1c556ce0ee1c7cc471f5c542c784403de216f99ca74614cbeecac9e113e9e11dd60a079a139ad7f83d3e15bc92479a27c106f6db6bd7f6c8ba63890bfd052dccd198005eba39472d62');

  const typedClient = new TypedAppwriteClient(client);

  async function main() {
    try {
      // Example usage of createDocument with database-specific types
      const document = await typedClient.createDocument(
        '24so',
        'auth_tokens',
        'test1',
        { 
          token: 'test',
        }
      );
  
      console.log('Document created:', document);
    } catch (error) {
      console.error('Error creating document:', error);
    }
  }
  
  main();