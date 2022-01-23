import { UserId } from "./aliases/user-id";
import { UserRole } from "./enums/user-role";
import { NotificationChannel } from "./enums/notification-channel";

export interface User {
  id: UserId,
  firstName: string,
  lastName: string,
  email: string,
  role: UserRole,
  notificationChannel: NotificationChannel,
  emailVerification: boolean,
  isActiveDirectory: boolean,
}
