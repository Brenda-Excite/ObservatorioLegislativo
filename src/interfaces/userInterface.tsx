import { Role } from "./roles";
export interface User {
  id: string;
  displayName: string;
  email: string;
  user_id: string;
  role_id: string;
  role: Role;

  password: string;
}

export interface Users {
  users: Array<User>;
  update: boolean;
  userSelected: User | null;
}
