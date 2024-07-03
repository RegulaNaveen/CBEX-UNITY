export function sanitizeResponse(response, prefix = null) {
  let sanitizedResponse = response;
  if (prefix) {
    sanitizedResponse = sanitizedResponse.replace(
      new RegExp(`^${prefix}:`),
      ''
    );
  }
  sanitizedResponse = sanitizedResponse.replace('\n', ' ');
  return sanitizedResponse.trim();
}
