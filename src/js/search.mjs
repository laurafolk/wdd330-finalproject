import { saveRecipe, removeSavedRecipe, getSavedRecipes } from './storageUtils.mjs';
import { getCurrentUser } from './auth.mjs'

function showAlert(message) {
  const alertBox = document.createElement('div');
  alertBox.textContent = message;
  alertBox.classList.add('custom-alert');
  document.body.appendChild(alertBox);
  setTimeout(() => alertBox.remove(), 2500);
}

export async function searchRecipes(query) {
  const url = `https://tasty-api1.p.rapidapi.com/recipes/list?from=0&size=12&q=${encodeURIComponent(query)}`;

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '88aac24a55msh80b25efa593281ep1b29d7jsnfd44213ed1b4',
      'x-rapidapi-host': 'tasty-api1.p.rapidapi.com'
    }
  };

  try {
    const res = await fetch(url, options);
    const data = await res.json();

    if (data.results && data.results.length) {
      displayRecipes(data.results);
    } else {
      showAlert('No recipes found.');
      document.getElementById('recipe-results').innerHTML = '';
    }

  } catch (err) {
    console.error('Error fetching recipes:', err);
    showAlert('Something went wrong while searching.');
  }
}

export function displayRecipes(recipes, showSaveButton = true) {
  const container = document.getElementById('recipe-results');
  container.innerHTML = '';

  recipes.forEach(recipe => {
    const card = document.createElement('div');
    card.classList.add('recipe-card');

    card.innerHTML = `
      <img src="${recipe.thumbnail_url}" alt="${recipe.name}" />
      <h3>${recipe.name}</h3>
      <p>${recipe.description || 'No description available.'}</p>
    `;

    if (showSaveButton) {
      const saveBtn = document.createElement('button');
      saveBtn.textContent = 'Save Recipe';
      saveBtn.classList.add('save-btn');
      saveBtn.addEventListener('click', () => {
        saveRecipe(recipe);
        showAlert('Recipe saved!');
      });
      card.appendChild(saveBtn);
    } else {
      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remove';
      removeBtn.classList.add('save-btn');
      removeBtn.addEventListener('click', () => {
        removeSavedRecipe(recipe.id);
        showAlert('Recipe removed!');
        displaySavedRecipes();
      });
      card.appendChild(removeBtn);
    }

    container.appendChild(card);
  });
}

export function displaySavedRecipes() {
  const saved = getSavedRecipes();
  displayRecipes(saved, false);
} 

export function displayUserSavedRecipes() {
  const saved = getSavedRecipes();
  const container = document.getElementById('saved-recipes');
  container.innerHTML = '';

  saved.forEach(recipe => {
    const card = document.createElement('div');
    card.classList.add('recipe-card');

    card.innerHTML = `
      <img src="${recipe.thumbnail_url}" alt="${recipe.name}" />
      <h3>${recipe.name}</h3>
      <p>${recipe.description || 'No description available.'}</p>
    `;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('save-btn');
    removeBtn.addEventListener('click', () => {
      removeSavedRecipe(recipe.id);
      showAlert('Recipe removed!');
      displayUserSavedRecipes();
    });

    card.appendChild(removeBtn);
    container.appendChild(card);
  });
}

// function saveSearchHistory(query) {
//   const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
//   if (!history.includes(query)) {
//     history.unshift(query);
//     if (history.length > 10) history.pop();
//     localStorage.setItem('searchHistory', JSON.stringify(history));
//   }
// }

// export function displaySearchHistory() {
//   const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
//   const historyBox = document.getElementById('search-history');
//   if (!historyBox) return;
//   historyBox.innerHTML = '<h4>Recent Searches:</h4>' + history.map(q => `<button class="history-btn">${q}</button>`).join(' ');
//   historyBox.querySelectorAll('.history-btn').forEach(btn => {
//     btn.addEventListener('click', () => searchRecipes(btn.textContent));
//   });
// }

// export function searchAndDisplayCategory(type) {
//   searchRecipes('', type);
// }
