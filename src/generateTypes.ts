#!/usr/bin/env node

import { Client, Databases, Models } from 'node-appwrite';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

interface Attribute {
  key: string;
  type: string;
}

// Function to sanitize type names
function sanitizeTypeName(name: string): string {
  return name.replace(/[^a-zA-Z0-9]/g, '_'); // Replace non-alphanumeric characters with underscores
}

async function generateTypes(endpoint: string, projectId: string, apiKey: string) {
  const client = new Client();
  const databases = new Databases(client);

  client
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setKey(apiKey);

  try {
    console.log('Listing databases...');
    const databasesList = await databases.list();
    console.log('Databases:', databasesList);

    let typeDefinitions = `
import { Models } from 'node-appwrite';

export interface Document extends Models.Document {}
`;

    let collectionMap = 'export type DatabaseMap = {\n';

    for (const database of databasesList.databases) {
      console.log(`Listing collections for database ${database.$id}...`);
      const collections = await databases.listCollections(database.$id);
      console.log('Collections:', collections);

      let databaseCollectionMap = `  '${database.$id}': {\n`;

      for (const collection of collections.collections) {
        console.log(`Listing attributes for collection ${collection.$id}...`);
        const attributesResponse: Models.AttributeList = await databases.listAttributes(database.$id, collection.$id);
        const attributes: Attribute[] = attributesResponse.attributes as unknown as Attribute[];
        console.log('Attributes:', attributes);

        const types = attributes.map(attribute => {
          const typeMap: { [key: string]: string } = {
            'string': 'string',
            'integer': 'number',
            'boolean': 'boolean',
            'float': 'number',
            'email': 'string',
            'enum': 'string',
            'url': 'string',
            'datetime': 'Date',
            'ip': 'string',
            'relationship': 'any',
          };

          const attributeType = typeMap[attribute.type] || 'any';
          return `${attribute.key}: ${attributeType};`;
        });

        const sanitizedInterfaceName = sanitizeTypeName(collection.name);
        const interfaceName = sanitizedInterfaceName.charAt(0).toUpperCase() + sanitizedInterfaceName.slice(1);

        typeDefinitions += `
export interface ${interfaceName} extends Models.Document {
  ${types.join('\n  ')}
}\n`;

        databaseCollectionMap += `    '${collection.$id}': ${interfaceName};\n`;
      }

      databaseCollectionMap += '  },\n';
      collectionMap += databaseCollectionMap;
    }

    collectionMap += '};\n';

    fs.writeFileSync(
      path.join(__dirname, 'types.ts'),  // Correct path for output file
      typeDefinitions + '\n' + collectionMap
    );

    console.log('TypeScript types generated successfully.');
  } catch (error) {
    console.error('Error generating TypeScript types:', error);
  }
}

// Load configuration from environment variables
const endpoint = process.env.APPWRITE_ENDPOINT || '';
const projectId = process.env.APPWRITE_PROJECT_ID || '';
const apiKey = process.env.APPWRITE_API_KEY || '';

if (!endpoint || !projectId || !apiKey) {
  console.error('Please provide APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, and APPWRITE_API_KEY as environment variables.');
  process.exit(1);
}

generateTypes(endpoint, projectId, apiKey);
