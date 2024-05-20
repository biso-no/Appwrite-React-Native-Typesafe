# Typesafe Node Appwrite Client
Typesafe Node Appwrite is a utility that automatically generates TypeScript types based on your Appwrite database schema. This ensures type safety and improves the developer experience when working with Appwrite databases. It will also wrap your Appwrite client with `TypedAppwriteClient` to ensure type safety in your functions.

## Features

- Automatically generates TypeScript types for your Appwrite database collections and attributes.
- Ensures type safety when interacting with Appwrite databases.
- Configurable via environment variables.
- Wrap your client with `TypedAppwriteClient` to ensure type safety.
- Configurable via environment variables.

## Installation

Install the package via npm:

npm install typesafe-node-appwrite

## Configuration

Create a `.env` file in the root of your project to store your Appwrite configuration:

```bash
APPWRITE_ENDPOINT="https://your-appwrite-endpoint"
APPWRITE_PROJECT_ID="your-project-id"
APPWRITE_API_KEY="your-api-key"
```

## Usage

### Generating Types

To generate TypeScript types based on your Appwrite database schema, run the following command:

```bash
npm run generate-types
```

This command will automatically create types from your Appwrite database, and output them into the client.

### Usage

To typesafe your database APIs, simply wrap your existing appwrite client inside `TypedAppwriteClient`.
This enables suggestions in your functions based on the generated types.

### Example

Here's an example of how to use the generated types and the `TypedAppwriteClient` class:

```typescript
import { TypedAppwriteClient } from 'typesafe-node-appwrite';
import { Client } from 'node-appwrite';

const client = new Client();
client
    .setEndpoint(process.env.APPWRITE_ENDPOINT || '')
    .setProject(process.env.APPWRITE_PROJECT_ID || '')
    .setKey(process.env.APPWRITE_API_KEY || '');

const typedClient = new TypedAppwriteClient(client);

const createDocument = await typedClient.createDocument('databaseId', 'collectionId', 'documentId', { name: 'Test Document' }, ['read', 'write']);
```

Try it out, remove the strings, and you will see the correct names.

## Development

### Prerequisites

- Node.js
- preferably pnpm or yarn
- Appwrite server
- node-appwrite

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
