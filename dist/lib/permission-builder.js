"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPermissions = void 0;
const react_native_appwrite_1 = require("react-native-appwrite");
/**
 * Builds a list of permission strings based on the provided options.
 *
 * @param {PermissionOptions} options - The permission options.
 * @returns {string[]} A list of permission strings.
 */
const buildPermissions = (options) => {
    const permissions = [];
    if (options.read) {
        options.read.forEach(role => {
            permissions.push(react_native_appwrite_1.Permission.read(role));
        });
    }
    if (options.write) {
        options.write.forEach(role => {
            permissions.push(react_native_appwrite_1.Permission.write(role));
        });
    }
    if (options.delete) {
        options.delete.forEach(role => {
            permissions.push(react_native_appwrite_1.Permission.delete(role));
        });
    }
    if (options.update) {
        options.update.forEach(role => {
            permissions.push(react_native_appwrite_1.Permission.update(role));
        });
    }
    return permissions;
};
exports.buildPermissions = buildPermissions;
//# sourceMappingURL=permission-builder.js.map