const onClickLink = (
  oppNo: string,
  notificationId: string,
  bidNo: string | number | null
): string => {
  const link = () =>
    `/opportunities/${oppNo}?notification_id=${notificationId}`;
  const linkWithBid = () =>
    `/opportunities/${oppNo}?notification_id=${notificationId}&bidNo=${bidNo}`;
  return bidNo ? linkWithBid() : link();
};

export const getAllNotifications = notification =>
  notification.notifications.map(item => {
    // Add onClick url
    item.url = onClickLink(
      item.opportunity_no,
      item.id,
      item.bodyJson?.bidNo || null
    );
    return item;
  });

export const getNotificationLoading = notification => notification.isLoading;
export const getUnreadNotifications = notification =>
  notification.notifications
    .filter(item => !item.read)
    .map(item => {
      // Add onClick url
      item.url = onClickLink(
        item.opportunity_no,
        item.id,
        item.bodyJson?.bidNo || null
      );
      // Add timestamp for sorting
      item.timestamp = new Date(item.created_date).getTime();
      return item;
    })
    .sort((x, y) => y.timestamp - x.timestamp);
