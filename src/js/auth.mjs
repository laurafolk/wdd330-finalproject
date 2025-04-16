import { setItem, getItem, removeItem } from './storageUtils.mjs';
import { routeTo } from './router.mjs';

export function signup(username, password) {
  const users = getItem('users') || {};
  if (users[username]) {
    alert('Username already exists.');
    return;
  }
  users[username] = { password };
  setItem('users', users);
  setItem('currentUser', username);
  alert('Signup successful!');
  routeTo('search');
}

export function login(username, password) {
  const users = getItem('users') || {};
  if (users[username] && users[username].password === password) {
    setItem('currentUser', username);
    alert('Login successful!');
    routeTo('search');
  } else {
    alert('Invalid username or password.');
  }
}

export function logout() {
  removeItem('currentUser');
  alert('Logged out successfully!');
  location.reload();
}

export function getCurrentUser() {
  return getItem('currentUser');
}
