export interface Role {
  id: string;
  name: string;
  permissions: Array<string>;
}

export interface Roles {
  roles: Array<Role>;
  update: boolean;
  roleSelected: Role | null;
}
