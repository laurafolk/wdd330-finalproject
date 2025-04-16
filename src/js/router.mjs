export function initRouter() {
  window.addEventListener('hashchange', routeChange);
  routeChange();
}

export function routeTo(sectionId) {
  window.location.hash = sectionId;
}

function routeChange() {
  const hash = window.location.hash.slice(1) || 'auth';
  const sections = document.querySelectorAll('main > section');

  sections.forEach(section => {
    section.style.display = section.id === hash ? 'block' : 'none';
  });
}