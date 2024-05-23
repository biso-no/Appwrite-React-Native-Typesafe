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
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_appwrite_1 = require("react-native-appwrite");
const query_builder_1 = require("./lib/query-builder");
const permission_builder_1 = require("./lib/permission-builder");
class TypedAppwriteClient {
    constructor(client) {
        this.client = client;
        this.databases = new react_native_appwrite_1.Databases(client);
    }
    createDocument(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { databaseId, collectionId, documentId = 'unique()', data, permissions } = options;
            const permissionList = permissions ? (0, permission_builder_1.buildPermissions)(permissions) : [];
            const document = yield this.databases.createDocument(databaseId, collectionId, documentId, data, permissionList);
            return document;
        });
    }
    listDocuments(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { databaseId, collectionId, queries } = options;
            const queryList = queries ? (0, query_builder_1.buildQueries)(queries) : [];
            const documents = yield this.databases.listDocuments(databaseId, collectionId, queryList);
            return documents.documents;
        });
    }
    getDocument(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { databaseId, collectionId, documentId } = options;
            const document = yield this.databases.getDocument(databaseId, collectionId, documentId);
            return document;
        });
    }
    updateDocument(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { databaseId, collectionId, documentId, data, permissions } = options;
            const permissionList = permissions ? (0, permission_builder_1.buildPermissions)(permissions) : [];
            return yield this.databases.updateDocument(databaseId, collectionId, documentId, data, permissionList);
        });
    }
    deleteDocument(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { databaseId, collectionId, documentId } = options;
            return yield this.databases.deleteDocument(databaseId, collectionId, documentId);
        });
    }
    getRelatedDocuments(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { databaseId, collectionId, documentId, relatedCollectionId, relationType, queries } = options;
            const queryList = queries ? (0, query_builder_1.buildQueries)(queries) : [];
            if (relationType === 'oneToOne' || relationType === 'oneToMany') {
                const mainDocument = yield this.getDocument({
                    databaseId,
                    collectionId,
                    documentId
                });
                const relatedDocuments = yield this.listDocuments({
                    databaseId,
                    collectionId: relatedCollectionId,
                    queries: {
                        equals: [{ field: 'relatedField', value: mainDocument.$id }]
                    }
                });
                return relatedDocuments;
            }
            return yield this.listDocuments({
                databaseId,
                collectionId: relatedCollectionId,
                queries: queryList
            });
        });
    }
}
exports.default = TypedAppwriteClient;
//# sourceMappingURL=clientWrapper.js.map