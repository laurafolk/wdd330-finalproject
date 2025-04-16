// ---utils.js---
export function createCard(recipe) {
  const card = document.createElement('div');
  card.classList.add('card');

  const title = document.createElement('h3');
  title.textContent = recipe.name || recipe.title || 'Untitled';
  card.appendChild(title);

  if (recipe.thumbnail_url) {
    const img = document.createElement('img');
    img.src = recipe.thumbnail_url;
    img.alt = recipe.name || recipe.title;
    card.appendChild(img);
  }

  if (recipe.description) {
    const desc = document.createElement('p');
    desc.textContent = recipe.description;
    card.appendChild(desc);
  }

  const badge = document.createElement('span');
  badge.classList.add('badge');
  badge.textContent = recipe.type || 'Recipe';
  card.appendChild(badge);

  return card;
}