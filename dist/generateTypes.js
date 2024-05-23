#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_appwrite_1 = require("node-appwrite");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/**
 * Sanitizes a type name by replacing non-alphanumeric characters with underscores.
 *
 * @param {string} name - The name to sanitize.
 * @returns {string} The sanitized name.
 */
function sanitizeTypeName(name) {
    return name.replace(/[^a-zA-Z0-9]/g, '_');
}
/**
 * Generates TypeScript types based on the Appwrite database schema.
 *
 * @param {string} endpoint - The Appwrite endpoint.
 * @param {string} projectId - The Appwrite project ID.
 * @param {string} apiKey - The Appwrite API key.
 */
function generateTypes(endpoint, projectId, apiKey) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new node_appwrite_1.Client();
        const databases = new node_appwrite_1.Databases(client);
        client
            .setEndpoint(endpoint)
            .setProject(projectId)
            .setKey(apiKey);
        try {
            console.log('Listing databases...');
            const databasesList = yield databases.list();
            console.log('Databases:', databasesList);
            let typeDefinitions = `
import { Models, Permission } from 'node-appwrite';

/**
 * Represents different role strings that can be used for permissions.
 * 
 * The following roles are supported:
 * - "any": Any user, authenticated or not.
 * - "guests": Any unauthenticated user.
 * - "users": Any authenticated user.
 * - "user:<user-id>": A specific user by their user ID.
 * - "team:<team-id>:<role>": A specific team and role.
 * - "label:<label>": A specific label.
 */
type RoleString =
  | "any"
  | "guests"
  | "users"
  | \`user:\${string}\`
  | \`team:\${string}:\${string}\`
  | \`label:\${string}\`;

/**
 * Options for configuring permissions.
 */
export type PermissionOptions = {
  read?: RoleString[],
  write?: RoleString[],
  delete?: RoleString[],
  update?: RoleString[],
  [key: string]: RoleString[] | undefined
};

export interface Document extends Models.Document {}
`;
            let collectionMap = 'export type DatabaseMap = {\n';
            for (const database of databasesList.databases) {
                console.log(`Listing collections for database ${database.$id}...`);
                const collections = yield databases.listCollections(database.$id);
                console.log('Collections:', collections);
                let databaseCollectionMap = `  '${database.$id}': {\n`;
                for (const collection of collections.collections) {
                    console.log(`Listing attributes for collection ${collection.$id}...`);
                    const attributesResponse = yield databases.listAttributes(database.$id, collection.$id);
                    const attributes = attributesResponse.attributes;
                    console.log('Attributes:', attributes);
                    const types = attributes.map(attribute => {
                        const typeMap = {
                            'string': 'string',
                            'integer': 'number',
                            'boolean': 'boolean',
                            'float': 'number',
                            'email': 'string',
                            'enum': 'string',
                            'url': 'string',
                            'datetime': 'Date',
                            'ip': 'string',
                            'relationship': attribute.relationType === 'oneToMany' || attribute.relationType === 'manyToMany'
                                ? `${sanitizeTypeName(attribute.relatedCollectionId || '')}[]`
                                : sanitizeTypeName(attribute.relatedCollectionId || '')
                        };
                        const attributeType = typeMap[attribute.type] || 'any';
                        const optionalFlag = attribute.required ? '' : '?';
                        return `${attribute.key}${optionalFlag}: ${attributeType};`;
                    });
                    const sanitizedInterfaceName = sanitizeTypeName(collection.name);
                    const interfaceName = sanitizedInterfaceName.charAt(0).toUpperCase() + sanitizedInterfaceName.slice(1);
                    typeDefinitions += `
export interface ${interfaceName} extends Models.Document {
  ${types.join('\n  ')}
  permissions?: PermissionOptions;
}\n`;
                    databaseCollectionMap += `    '${collection.$id}': ${interfaceName};\n`;
                }
                databaseCollectionMap += '  },\n';
                collectionMap += databaseCollectionMap;
            }
            collectionMap += '};\n';
            fs_1.default.writeFileSync(path_1.default.join(__dirname, 'types.ts'), // Correct path for output file
            typeDefinitions + '\n' + collectionMap);
            console.log('TypeScript types generated successfully.');
        }
        catch (error) {
            console.error('Error generating TypeScript types:', error);
            console.error('Stack trace:', error.stack);
        }
    });
}
const endpoint = process.env.APPWRITE_ENDPOINT || '';
const projectId = process.env.APPWRITE_PROJECT_ID || '';
const apiKey = process.env.APPWRITE_API_KEY || '';
if (!endpoint || !projectId || !apiKey) {
    console.error('Please provide APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, and APPWRITE_API_KEY as environment variables.');
    process.exit(1);
}
generateTypes(endpoint, projectId, apiKey);
//# sourceMappingURL=generateTypes.js.map