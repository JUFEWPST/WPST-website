const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-menu a');
const navMenu = document.querySelector('.nav-menu');
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');

// Helper function to check if an element is in the viewport
const isInViewport = (element: Element): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight * 0.7) &&
    rect.bottom >= (window.innerHeight * 0.3)
  );
};

// Activate navigation based on scroll position
const handleScroll = (): void => {
  for (const section of sections) {
    if (isInViewport(section)) {
      const id = section.getAttribute('id');

      // Update active navigation item
      for (const link of navLinks) {
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }

      // Add animation class to visible sections
      section.classList.add('section-visible');
    }
  }
};

// Handle smooth scrolling for navigation links
for (const link of navLinks) {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    const href = link.getAttribute('href');
    if (href) {
      const targetSection = document.querySelector(href);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });

        // Close mobile menu after click
        if (navMenu && mobileNavToggle) {
          navMenu.classList.remove('show');
          mobileNavToggle.classList.remove('active');
        }
      }
    }
  });
}

// Mobile menu toggle
if (mobileNavToggle && navMenu) {
  mobileNavToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    mobileNavToggle.classList.toggle('active');
  });
}

// Initialize
window.addEventListener('scroll', handleScroll);
window.addEventListener('resize', handleScroll);

// Trigger scroll handler on page load
window.addEventListener('load', () => {
  // Add initial animation to the first section
  const introSection = document.getElementById('intro');
  if (introSection) {
    introSection.classList.add('section-visible');
  }

  // Check other sections
  handleScroll();
});
