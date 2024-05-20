import { Permission, Role } from 'node-appwrite';

export interface PermissionOptions {
    read?: string[],
    write?: string[],
    delete?: string[],
    update?: string[],
    [key: string]: string[] | undefined
  };
  
  export function buildPermissions(options: PermissionOptions) {
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
  