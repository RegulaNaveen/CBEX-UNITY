export function saveRedirectURL(url) {
  localStorage.setItem('redirect_url', url);
}

export function clearRedirectURL() {
  localStorage.removeItem('redirect_url');
}

export function getRedirectURL() {
  return localStorage.getItem('redirect_url');
}
