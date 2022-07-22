export const getAllNotifications = notification => notification.notifications;
export const getNotificationLoading = notification => notification.isLoading;
export const getUnreadNotifications = notification =>
  notification.notifications.filter(item => !item.isSeen);
