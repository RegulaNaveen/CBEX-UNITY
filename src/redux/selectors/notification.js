export const getAllNotifications = notification =>
  notification.notifications.map(item => {
    // Add onClick url
    item.url = `/opportunities/${item.opportunity_no}`;
    return item;
  });

export const getNotificationLoading = notification => notification.isLoading;
export const getUnreadNotifications = notification =>
  notification.notifications
    .filter(item => !item.read)
    .map(item => {
      // Add onClick url
      item.url = `/opportunities/${item.opportunity_no}`;
      // Add timestamp for sorting
      item.timestamp = new Date(item.created_date).getTime();
      return item;
    })
    .sort((x, y) => y.timestamp - x.timestamp);
