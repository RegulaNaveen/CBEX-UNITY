import {
  saveRedirectURL,
  clearRedirectURL,
  getRedirectURL
} from '../StorageUtils';

describe('saveRedirectURL', () => {
  it('should save the redirect URL in localStorage', () => {
    const url = 'https://example.com';
    saveRedirectURL(url);
    expect(localStorage.getItem('redirect_url')).toBe(url);
  });
  it('should getItem the redirect URL in localStorage', () => {
    const url = 'https://example.com';
    getRedirectURL(url);
    expect(localStorage.getItem('redirect_url'));
  });
  it('should removeItem the redirect URL in localStorage', () => {
    const url = 'https://example.com';
    clearRedirectURL(url);
    expect(localStorage.removeItem('redirect_url'));
  });
});
