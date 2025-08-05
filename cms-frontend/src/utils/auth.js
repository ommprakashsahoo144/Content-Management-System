export function getToken() {
  return localStorage.getItem('token');
}

export function getUserFromToken() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

export function saveAuth(token, user) {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login';
}
