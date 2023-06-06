export interface Permission {
  id: string;
  description: string;
  group: string;
  permission: string;
  text_front: string;
}

export interface Permissions {
  permissions: Array<Permission>;
  update: boolean;
  permissionSelected: Permission | null;
}
