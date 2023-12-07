import { getBidNameByType } from '../utils';
describe('utils.js tests', () => {
  test("getBidNameByType('') should return 'Bid'", () => {
    const bidName = getBidNameByType('');
    expect(bidName).toBe('Bid');
  });

  test("getBidNameByType('Early_Engagement_Bid') should return 'Early Engagement '", () => {
    const bidName = getBidNameByType('Early_Engagement_Bid');
    expect(bidName).toBe('Early Engagement ');
  });

  test("getBidNameByType('Clinical_Bid') should return 'Bid'", () => {
    const bidName = getBidNameByType('Clinical_Bid');
    expect(bidName).toBe('Bid');
  });
  test("getBidNameByType('Post_Award_Bid') should return 'Post Award'", () => {
    const bidName = getBidNameByType('Post_Award_Bid');
    expect(bidName).toBe('Post Award ');
  });
  test("getBidNameByType('RFI_Request') should return 'RFI'", () => {
    const bidName = getBidNameByType('RFI_Request');
    expect(bidName).toBe('RFI ');
  });
});
