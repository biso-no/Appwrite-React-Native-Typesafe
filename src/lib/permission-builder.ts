import { Permission, Role } from 'node-appwrite';

type RoleString =
  | "any"
  | "guests"
  | "users"
  | `user:${string}`
  | `team:${string}:${string}`
  | `label:${string}`;

export type PermissionOptions = {
    read?: RoleString[],
    write?: RoleString[],
    delete?: RoleString[],
    update?: RoleString[],
    [key: string]: RoleString[] | undefined
  };
  
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
  