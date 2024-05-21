**DISCLAIMER:** This project is under active development and is updated regularly. The README may not always reflect the most recent changes.

# Introduction
This package is a utility that automatically generates TypeScript types based on your Appwrite database schema. This ensures type safety and improves the developer experience when working with Appwrite databases.
- Simply provide the necessary Appwrite credentials, run the script and wrap your Appwrite client, and you're good to go!

## Features

- Automatically generates TypeScript types for your Appwrite database collections and attributes.
- Ensures type safety when interacting with Appwrite databases.
- Configurable via environment variables.
- Create a new `TypedAppwriteClient` instance wrapping your Appwrite client.
- Configurable via environment variables.

## Installation

Install the package via npm:

yarn add typesafe-node-appwrite

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
yarn generate-types
```

This command will automatically create types from your Appwrite database, and output them into the client.

### Usage

To typesafe your database APIs, simply wrap your existing appwrite client inside `TypedAppwriteClient`.
This enables suggestions in your functions based on the generated types.

- I have also improved the structure to streamline the development experience a bit, with a more object based approach. Take a look at the example below.
- Most of the methods are also documented.

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

    await appwriteClient.createDocument({
        databaseId: "app",
        collectionId: "posts",
        documentId: "test",
        data: {
            content: "Some title",
            title: "Lorem ipsum and so on...",
            created_by: "Markus Heien",
        },
        permissions: {
            read: ["guests", "users"],
            write: ["users"],
        },
    })
```

## Troubleshooting

If you encounter any issues with the generated types, please open an issue or submit a pull request with your changes.

## Development

### Prerequisites

- Node.js
- preferably pnpm or yarn
- Appwrite server

```bash
git clone https://github.com/MHEien/Appwrite-Client-wrapper.git
cd typesafe-node-appwrite
yarn
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
