export function getItem(key) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (e) {
    console.error(`Error parsing localStorage item '${key}':`, e);
    return null;
  }
}

export function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving to localStorage key '${key}':`, e);
  }
}

export function removeItem(key) {
  localStorage.removeItem(key);
}

export function clearStorage() {
  localStorage.clear();
}

export function getSavedRecipes(username) {
  const allSaved = getItem('savedRecipes') || {};
  return allSaved[username] || [];
}

export function saveRecipe(username, recipe) {
  const allSaved = getItem('savedRecipes') || {};
  if (!allSaved[username]) allSaved[username] = [];

  const exists = allSaved[username].some(r => r.id === recipe.id);
  if (!exists) {
    allSaved[username].push(recipe);
    setItem('savedRecipes', allSaved);
  }
}

export function deleteRecipe(username, recipeId) {
  const allSaved = getItem('savedRecipes') || {};
  if (!allSaved[username]) return;

  allSaved[username] = allSaved[username].filter(recipe => recipe.id !== recipeId);
  setItem('savedRecipes', allSaved);
}
