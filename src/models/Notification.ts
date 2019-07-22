import { schema } from "normalizr";
import { normalize } from "normalizr";

export interface NotificationModel {
  id: number;
  message: string;
  seen: boolean;
}

// REVIEW: Possible refactoring after API is known

export const notificationsNormalize = (notifications: any[]) => {
  const notificationsSchema = new schema.Entity("notifications", undefined, {
    idAttribute: "id"
  });

  let normalized = normalize(
    notifications.map(
      i => ({ id: i.id, message: i.message, seen: false } as NotificationModel)
    ),
    [notificationsSchema]
  );
  return {
    byId: normalized.entities.notifications,
    all: normalized.result
  };
};

export const NotificationSchema = new schema.Entity("notifications");
