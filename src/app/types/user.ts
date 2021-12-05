import { UserId } from "./aliases/user-id";
import { UserRole } from "./enums/user-role";

export interface User {
  id: UserId,
  firstname: string,
  lastname: string,
  email: string,
  userRole: UserRole,
}
