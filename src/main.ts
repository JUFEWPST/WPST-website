const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-menu .scroll-link');
const navMenu = document.querySelector('.nav-menu');
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const cyberButton = document.querySelector('.cyber-button');

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

// Initialize particles.js
const initParticles = (): void => {
  if (typeof (window as any).particlesJS !== 'undefined') {
    (window as any).particlesJS('particles-js', {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: '#44dc9e'
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#000000'
          },
          polygon: {
            nb_sides: 5
          }
        },
        opacity: {
          value: 0.5,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#44dc9e',
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 1,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'grab'
          },
          onclick: {
            enable: true,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1
            }
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3
          },
          repulse: {
            distance: 200,
            duration: 0.4
          },
          push: {
            particles_nb: 4
          },
          remove: {
            particles_nb: 2
          }
        }
      },
      retina_detect: true
    });
  }
};

// Cyber button event listener
if (cyberButton) {
  cyberButton.addEventListener('click', () => {
    const teamSection = document.getElementById('team');
    if (teamSection) {
      teamSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// Initialize
window.addEventListener('scroll', handleScroll);
window.addEventListener('resize', handleScroll);

// Trigger scroll handler on page load
window.addEventListener('load', () => {
  // Initialize particles
  initParticles();
  
  // Add initial animation to the first section
  const introSection = document.getElementById('intro');
  if (introSection) {
    introSection.classList.add('section-visible');
  }

  // Check other sections
  handleScroll();
});
