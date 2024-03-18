export function getTokenFormLocal() {
  return localStorage.getItem('token');
}
export function setTokenToLocal(token: string) {
  localStorage.setItem('token', token);
}
