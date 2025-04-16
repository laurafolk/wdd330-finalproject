import { searchRecipes, displaySavedRecipes, displayUserSavedRecipes, displaySearchHistory } from './search.mjs';
import { initRouter, routeTo } from './router.mjs';
import { login, signup, logout, getCurrentUser } from './auth.mjs';

window.addEventListener('DOMContentLoaded', () => {
  initRouter();
  initEventListeners();
  displaySearchHistory();
});

function initEventListeners() {
  document.getElementById('search-btn').addEventListener('click', () => {
    const query = document.getElementById('search-bar').value.trim();
    if (query) {
      routeTo('search');
      searchRecipes(query);
    } else {
      alert('Please enter a search query.');
    }
  });

  document.getElementById('signup-btn').addEventListener('click', () => {
    const username = document.getElementById('signup-username').value.trim();
    const password = document.getElementById('signup-password').value.trim();
    if (username && password) {
      signup(username, password);
    } else {
      alert('Please enter a username and password.');
    }
  });

  document.getElementById('login-btn').addEventListener('click', () => {
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();
    if (username && password) {
      login(username, password);
    } else {
      alert('Please enter a username and password.');
    }
  });

  document.getElementById('logout-btn').addEventListener('click', () => {
    logout();
  });

  const viewSavedBtn = document.createElement('button');
  viewSavedBtn.textContent = 'View Saved Recipes';
  viewSavedBtn.id = 'view-saved-btn';
  viewSavedBtn.addEventListener('click', () => {
    document.getElementById('saved-recipes-section').style.display = 'block';
    displaySavedRecipes();
    window.scrollTo({ top: document.getElementById('saved-recipes-section').offsetTop, behavior: 'smooth' });
  });
  document.getElementById('saved-recipes-section').prepend(viewSavedBtn);

  const profileBtn = document.createElement('button');
  profileBtn.textContent = 'View Profile';
  profileBtn.id = 'view-profile-btn';
  profileBtn.addEventListener('click', () => {
    document.getElementById('profile').style.display = 'block';
    document.getElementById('profile-username').textContent = getCurrentUser();
    displayUserSavedRecipes();
    window.scrollTo({ top: document.getElementById('profile').offsetTop, behavior: 'smooth' });
  });
  document.getElementById('saved-recipes-section').appendChild(profileBtn);
}
