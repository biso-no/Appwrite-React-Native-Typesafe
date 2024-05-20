import { Permission } from 'node-appwrite';

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
  | `user:${string}`
  | `team:${string}:${string}`
  | `label:${string}`;

/**
 * Options for configuring permissions.
 */
export type PermissionOptions = {
  /**
   * Roles that have read permission.
   * 
   * Can be any combination of:
   * - "any"
   * - "guests"
   * - "users"
   * - `user:<user-id>`
   * - `team:<team-id>:<role>`
   * - `label:<label>`
   */
  read?: RoleString[],
  
  /**
   * Roles that have write permission.
   * 
   * Can be any combination of:
   * - "any"
   * - "guests"
   * - "users"
   * - `user:<user-id>`
   * - `team:<team-id>:<role>`
   * - `label:<label>`
   */
  write?: RoleString[],
  
  /**
   * Roles that have delete permission.
   * 
   * Can be any combination of:
   * - "any"
   * - "guests"
   * - "users"
   * - `user:<user-id>`
   * - `team:<team-id>:<role>`
   * - `label:<label>`
   */
  delete?: RoleString[],
  
  /**
   * Roles that have update permission.
   * 
   * Can be any combination of:
   * - "any"
   * - "guests"
   * - "users"
   * - `user:<user-id>`
   * - `team:<team-id>:<role>`
   * - `label:<label>`
   */
  update?: RoleString[],
  
  [key: string]: RoleString[] | undefined
};

/**
 * Builds a list of permission strings based on the provided options.
 * 
 * @param {PermissionOptions} options - The permission options.
 * @returns {string[]} A list of permission strings.
 */
export const buildPermissions = (options: PermissionOptions): string[] => {
  const permissions: string[] = [];

  if (options.read) {
    options.read.forEach(role => {
      permissions.push(Permission.read(role));
    });
  }

  if (options.write) {
    options.write.forEach(role => {
      permissions.push(Permission.write(role));
    });
  }

  if (options.delete) {
    options.delete.forEach(role => {
      permissions.push(Permission.delete(role));
    });
  }

  if (options.update) {
    options.update.forEach(role => {
      permissions.push(Permission.update(role));
    });
  }

  return permissions;
};
