const onClickLink = (
  oppNo: string,
  notificationId: string,
  bidNo: string | number | null,
  bidType: string
): string => {
  const link = () =>
    `/opportunities/${oppNo}?notification_id=${notificationId}`;
  const linkWithBidAndBidType = () =>
    `/opportunities/${oppNo}?notification_id=${notificationId}&bidNo=${bidNo}&bidType=${bidType}`;
  return bidNo ? linkWithBidAndBidType() : link();
};

export const getAllNotifications = notification =>
  notification.notifications.map(item => {
    // Add onClick url
    item.url = onClickLink(
      item.opportunity_no,
      item.id,
      item.bodyJson?.bidNo || null
    );

    switch (item.preference_code) {
      case 'NEW_DOCUMENT': {
        // if documentId exists, find and replace documentTitle in body with hyperlink
        if (item.bodyJson && item.bodyJson.documentId) {
          item.body = item.body.replace(
            item.bodyJson.documentTitle,
            `<a style="display: inline-block;" target="_blank" href="https://app.box.com/file/${item.bodyJson.documentId}">
            ${item.bodyJson.documentTitle}
            </a>`
          );
        }
        break;
      }
      // FIXME: 2056 -> Make hyperlink only if it redirects user to that particular question
      // case 'ANSWER_TAG': {
      //   if (
      //     item.bodyJson &&
      //     item.bodyJson.questionAnswer &&
      //     item.bodyJson.questionText
      //   ) {
      //     item.body = item.body.replace(
      //       `${item.bodyJson.questionText} ${item.bodyJson.questionAnswer}`,
      //       `<a style="display: inline-block;" target="_blank" href="${onClickLink(
      //         item.opportunity_no,
      //         item.id,
      //         item.bodyJson?.bidNo || null
      //       )}">${item.bodyJson.questionText} ${
      //         item.bodyJson.questionAnswer
      //       }</a>`
      //     );
      //   }
      //   break;
      // }
      default:
        break;
    }

    return item;
  });

export const getNotificationLoading = notification => notification.isLoading;
export const getUnreadNotifications = notification =>
  notification.notifications
    ?.filter(item => !item.read)
    .map(item => {
      // Add onClick url
      item.url = onClickLink(
        item.opportunity_no,
        item.id,
        item.bodyJson?.bidNo || null,
        item.bodyJson?.bidType || 'Clinical_Bid'
      );
      // Add timestamp for sorting
      item.timestamp = new Date(item.created_date).getTime();

      switch (item.preference_code) {
        case 'NEW_DOCUMENT': {
          // if documentId exists, find and replace documentTitle in body with hyperlink
          if (item.bodyJson && item.bodyJson.documentId) {
            item.body = item.body.replace(
              item.bodyJson.documentTitle,
              `<a style="display: inline-block;" target="_blank" href="https://app.box.com/file/${item.bodyJson.documentId}">
              ${item.bodyJson.documentTitle}
              </a>`
            );
          }
          break;
        }
        case 'ANSWER_TAG': {
          if (
            item.bodyJson &&
            item.bodyJson.questionAnswer &&
            item.bodyJson.questionText
          ) {
            item.body = item.body.replace(
              `${item.bodyJson.questionText} ${item.bodyJson.questionAnswer}`,
              `<a style="display: inline-block;" target="_blank" href="${onClickLink(
                item.opportunity_no,
                item.id,
                item.bodyJson?.bidNo || null
              )}">${item.bodyJson.questionText} ${
                item.bodyJson.questionAnswer
              }</a>`
            );
          }
          break;
        }
        default:
          break;
      }

      return item;
    })
    .sort((x, y) => y.timestamp - x.timestamp);
