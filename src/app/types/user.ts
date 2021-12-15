import { UserId } from "./aliases/user-id";
import { UserRole } from "./enums/user-role";
import { NotificationChannel } from "./enums/notification-channel";

export interface User {
  id: UserId,
  firstname: string,
  lastname: string,
  email: string,
  userRole: UserRole,
  notificationChannel: NotificationChannel,
}
