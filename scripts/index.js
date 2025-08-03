document.getElementById('showProjectsBtn').addEventListener('click', function() {
  const projectsContainer = document.querySelector('.projects-container');
  projectsContainer.classList.toggle('active');

  if (projectsContainer.classList.contains('active')) {
  // Scroll so that projectsContainer is centered vertically in viewport
  const rect = projectsContainer.getBoundingClientRect();
  const absoluteElementTop = rect.top + window.pageYOffset;
  const elementHeight = rect.height;
  const viewportHeight = window.innerHeight;

  // Calculate scroll position to center the element
  const scrollTo = absoluteElementTop - (viewportHeight / 2) + (elementHeight / 2);

  window.scrollTo({ top: scrollTo, behavior: 'smooth' });
}

  
  // Change button text based on state
  this.textContent = projectsContainer.classList.contains('active') 
    ? 'Hide Projects' 
    : 'Show My Projects';
});