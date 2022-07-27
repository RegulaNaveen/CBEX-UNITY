import { AUTH } from '../../constants/api';
export const getAllNotifications = notification => notification.notifications;
export const getNotificationLoading = notification => notification.isLoading;
export const getUnreadNotifications = notification =>
  notification.notifications
    .filter(item => !item.read)
    .map(item => {
      item.url = `/opportunities/${item.opportunity_no}`;
      return item;
    });
