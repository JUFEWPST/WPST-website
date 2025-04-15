const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-menu .scroll-link');
const navMenu = document.querySelector('.nav-menu');
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const cyberButton = document.querySelector('.cyber-button#aboutButton');
const servicesButton = document.querySelector('.cyber-button#servicesButton');
const matrixCanvas = document.getElementById('matrixRain') as HTMLCanvasElement;

// 导入视觉效果模块
import { registerEffects } from './effects';
// 导入黑客帝国风格效果
import { MatrixRain, createBinaryStreams, createHexDisplay, createPortScan, createIntrusionWarning } from './matrixRain';

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

// Scroll to section function
const scrollToSection = (sectionId: string): void => {
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.scrollIntoView({ behavior: 'smooth' });
    
    // Close mobile menu if open
    if (navMenu && mobileNavToggle) {
      navMenu.classList.remove('show');
      mobileNavToggle.classList.remove('active');
    }
  }
};

// Handle smooth scrolling for navigation links
for (const link of navLinks) {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      const sectionId = href.substring(1);
      scrollToSection(sectionId);
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

// Button event listeners
if (cyberButton) {
  cyberButton.addEventListener('click', () => {
    scrollToSection('about');
  });
}

if (servicesButton) {
  servicesButton.addEventListener('click', () => {
    scrollToSection('services');
  });
}

// Matrix Rain Effect
const initMatrixRain = (): void => {
  if (!matrixCanvas) return;
  
  // 使用升级版的黑客帝国风格矩阵雨
  const matrixRain = new MatrixRain('matrixRain', 'binary');
  matrixRain.start();
  
  // 创建二进制流效果
  createBinaryStreams();
  
  // 创建十六进制数据显示
  createHexDisplay();
  
  // 创建端口扫描模拟
  createPortScan();
  
  // 随机显示入侵警告
  if (Math.random() > 0.7) {
    setTimeout(() => {
      createIntrusionWarning();
    }, 5000);
  }
};

// Counter Animation for Stats
const animateCounters = (): void => {
  const yearCounter = document.getElementById('stat-year');
  const membersCounter = document.getElementById('stat-members');
  const awardsCounter = document.getElementById('stat-awards');
  
  if (yearCounter) {
    const targetYear = 2024;
    let currentYear = 2010;
    const yearInterval = setInterval(() => {
      yearCounter.textContent = String(currentYear);
      currentYear++;
      if (currentYear > targetYear) {
        clearInterval(yearInterval);
      }
    }, 80);
  }
  
  if (membersCounter) {
    const targetMembers = 200;
    let currentMembers = 0;
    const membersInterval = setInterval(() => {
      membersCounter.textContent = `${currentMembers}+`;
      currentMembers += 5;
      if (currentMembers > targetMembers) {
        clearInterval(membersInterval);
      }
    }, 40);
  }
  
  if (awardsCounter) {
    const targetAwards = 50;
    let currentAwards = 0;
    const awardsInterval = setInterval(() => {
      awardsCounter.textContent = `${currentAwards}+`;
      currentAwards += 1;
      if (currentAwards > targetAwards) {
        clearInterval(awardsInterval);
      }
    }, 60);
  }
};

// Typewriter effect for terminal text
const initTypewriterEffect = (): void => {
  const terminalTexts = document.querySelectorAll('.terminal-text');
  
  terminalTexts.forEach((terminalText) => {
    const originalText = terminalText.textContent || '';
    terminalText.textContent = '';
    
    let charIndex = 0;
    
    const type = () => {
      if (charIndex < originalText.length) {
        terminalText.textContent += originalText.charAt(charIndex);
        charIndex++;
        setTimeout(type, Math.random() * 50 + 30);
      }
    };
    
    // Only start typing animation when terminal becomes visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(type, 300);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(terminalText);
  });
};

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
          value: '#0cf'
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#000000'
          }
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#0cf',
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: 'none',
          random: false,
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

// Add cybersecurity console messages
const addConsoleBanner = (): void => {
  console.log('%c⚠️ 安全警告！', 'color: #ff3333; font-size: 48px; font-weight: bold; text-shadow: 0 0 10px #ff3333;');
  console.log('%c此为受限区域，未经授权的访问将被跟踪并记录。', 'color: #41ff8a; font-size: 16px; font-weight: bold;');
  console.log('%c江西财经大学网安协会 - 学习 · 创新 · 安全', 'color: #41ff8a; font-size: 14px;');
};

// Initialize
window.addEventListener('scroll', handleScroll);
window.addEventListener('resize', handleScroll);

// Trigger scroll handler on page load
window.addEventListener('load', () => {
  // Initialize all effects
  initParticles();
  initMatrixRain();
  animateCounters();
  initTypewriterEffect();
  addConsoleBanner();
  
  // 初始化赛博朋克视觉效果
  registerEffects();
  
  // 每隔一段时间更新二进制流
  setInterval(() => {
    createBinaryStreams();
  }, 30000);
  
  // Add initial animation to the first section
  const introSection = document.getElementById('intro');
  if (introSection) {
    introSection.classList.add('section-visible');
  }

  // Check other sections
  handleScroll();
});
