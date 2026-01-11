const TOKEN_KEY = "token";

export function setAccessToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function clearAuthStorage() {
  localStorage.removeItem(TOKEN_KEY);
}
