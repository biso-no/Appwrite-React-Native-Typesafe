import { Permission, Role } from 'node-appwrite';

export class PermissionBuilder {
  private permissions: string[];

  constructor() {
    this.permissions = [];
  }

  add(permission: string): PermissionBuilder {
    this.permissions.push(permission);
    return this;
  }

  read(role: string): PermissionBuilder {
    this.permissions.push(Permission.read(role));
    return this;
  }

  write(role: string): PermissionBuilder {
    this.permissions.push(Permission.write(role));
    return this;
  }

  delete(role: string): PermissionBuilder {
    this.permissions.push(Permission.delete(role));
    return this;
  }

  update(role: string): PermissionBuilder {
    this.permissions.push(Permission.update(role));
    return this;
  }

  member(id: string): PermissionBuilder {
    this.permissions.push(Role.member(id));
    return this;
  }

  team(id: string, role?: string): PermissionBuilder {
    this.permissions.push(Role.team(id, role));
    return this;
  }

  user(id: string, status?: string): PermissionBuilder {
    this.permissions.push(Role.user(id, status));
    return this;
  }

  users(status?: string): PermissionBuilder {
    this.permissions.push(Role.users(status));
    return this;
  }

  guests(): PermissionBuilder {
    this.permissions.push(Role.guests());
    return this;
  }

  any(): PermissionBuilder {
    this.permissions.push(Role.any());
    return this;
  }

  label(name: string): PermissionBuilder {
    this.permissions.push(Role.label(name));
    return this;
  }

  build(): string[] {
    return this.permissions;
  }
}
