const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-menu .scroll-link');
const navMenu = document.querySelector('.nav-menu');
const mobileNavToggle = document.querySelector('.mobile-menu-toggle');
const cyberButton = document.querySelector('.cyber-button#aboutButton');
const servicesButton = document.querySelector('.cyber-button#servicesButton');
const matrixCanvas = document.getElementById('matrixRain') as HTMLCanvasElement;
const header = document.querySelector('header');

// 导入视觉效果模块
import { registerEffects } from './effects';
// 导入黑客帝国风格效果
import { MatrixRain, createBinaryStreams, createHexDisplay, createIntrusionWarning } from './matrixRain';

// 滚动相关变量
let lastScrollTop = 0;
let scrollThreshold = 10; // 滚动阈值
let ticking = false;

// Helper function to check if an element is in the viewport
const isInViewport = (element: Element): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight * 0.7) &&
    rect.bottom >= (window.innerHeight * 0.3)
  );
};

// 控制导航栏的显示和隐藏
const handleNavVisibility = (): void => {
  if (!header) return;
  
  const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
  
  // 如果在页面顶部，始终显示导航栏
  if (currentScrollTop <= 10) {
    header.classList.remove('nav-hidden');
    header.classList.add('nav-visible');
    return;
  }
  
  // 向下滚动隐藏，向上滚动显示
  if (currentScrollTop > lastScrollTop && currentScrollTop > scrollThreshold) {
    // 向下滚动
    header.classList.remove('nav-visible');
    header.classList.add('nav-hidden');
  } else {
    // 向上滚动
    header.classList.remove('nav-hidden');
    header.classList.add('nav-visible');
  }
  
  lastScrollTop = currentScrollTop;
};

// 控制Matrix Rain和二进制流的显示隐藏
const handleMatrixVisibility = (): void => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const matrixRainElement = document.querySelector('.matrix-rain');
  const binaryStreamElement = document.querySelector('.binary-stream');
  const windowHeight = window.innerHeight;
  
  // 当滚动超过一屏高度时，隐藏Matrix Rain和二进制流
  if (scrollTop > windowHeight * 0.8) {
    matrixRainElement?.classList.add('hidden');
    binaryStreamElement?.classList.add('hidden');
  } else {
    matrixRainElement?.classList.remove('hidden');
    binaryStreamElement?.classList.remove('hidden');
  }
};

// 处理回到顶部按钮的显示和隐藏
const handleBackToTopVisibility = (): void => {
  const backToTopButton = document.getElementById('backToTop');
  if (!backToTopButton) return;
  
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  
  if (scrollTop > 300) {
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
  }
};

// Activate navigation based on scroll position
const handleScroll = (): void => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      // 处理导航栏可见性
      handleNavVisibility();
      
      // 处理Matrix Rain和二进制流的可见性
      handleMatrixVisibility();
      
      // 处理回到顶部按钮可见性
      handleBackToTopVisibility();
      
      // 处理section可见性和导航激活
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
      
      ticking = false;
    });
    
    ticking = true;
  }
};

// Mobile menu toggle
const setupMobileMenu = (): void => {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  if (!mobileMenuToggle) return;
  
  mobileMenuToggle.addEventListener('click', () => {
    const mainNav = document.querySelector('.main-nav');
    if (mainNav) {
      mainNav.classList.toggle('show');
    }
    mobileMenuToggle.classList.toggle('active');
  });
};

// 点击导航链接时关闭移动菜单
const setupNavLinkClick = () => {
  const navButtons = document.querySelectorAll('.nav-button');
  navButtons.forEach(button => {
    button.addEventListener('click', () => {
      const mainNav = document.querySelector('.main-nav');
      const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
      
      if (window.innerWidth <= 768 && mainNav && mainNav.classList.contains('show')) {
        mainNav.classList.remove('show');
        if (mobileMenuToggle) {
          mobileMenuToggle.classList.remove('active');
        }
      }
    });
  });
};

// Scroll to section function
const scrollToSection = (sectionId: string): void => {
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    // 考虑固定头部的高度
    const headerElement = document.querySelector('header');
    const yOffset = headerElement ? -headerElement.offsetHeight : 0;
    const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
    
    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });
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
  const matrixCanvas = document.getElementById('matrixRain') as HTMLCanvasElement;
  if (!matrixCanvas || !(matrixCanvas instanceof HTMLCanvasElement)) {
    console.error('Matrix rain canvas element not found or is not a canvas');
    return;
  }
  
  // 确保canvas元素可见且具有正确的尺寸
  matrixCanvas.style.display = 'block';
  matrixCanvas.width = window.innerWidth;
  matrixCanvas.height = window.innerHeight;
  
  try {
    // 使用升级版的黑客帝国风格矩阵雨
    const matrixRain = new MatrixRain('matrixRain', 'binary');
    matrixRain.start();
    
    // 创建二进制流效果
    createBinaryStreams();
    
    // 创建十六进制数据显示
    createHexDisplay();
    
    // 删除端口扫描模拟
    // createPortScan();
    
    // 随机显示入侵警告
    if (Math.random() > 0.7) {
      setTimeout(() => {
        createIntrusionWarning();
      }, 5000);
    }
  } catch (error) {
    console.error('Error initializing matrix rain effects:', error);
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
  const terminalContent = document.querySelector('.terminal-content');
  if (!terminalContent) return;
  
  // 保存原始HTML内容
  const originalContent = terminalContent.innerHTML;
  
  // 清空容器，只保留第一行
  const firstLine = terminalContent.querySelector('p');
  terminalContent.innerHTML = '';
  if (firstLine) {
    terminalContent.appendChild(firstLine.cloneNode(true));
  }
  
  // 从HTML解析出所有行
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = originalContent;
  const lines = tempDiv.querySelectorAll('p');
  
  // 动态添加每一行
  let lineIndex = 0;
  
  const typeLine = () => {
    if (lineIndex < lines.length) {
      // 跳过第一行，因为已经添加了
      if (lineIndex > 0 || !firstLine) {
        const line = lines[lineIndex];
        terminalContent.appendChild(line.cloneNode(true));
        
        // 滚动到底部
        terminalContent.scrollTop = terminalContent.scrollHeight;
      }
      
      lineIndex++;
      setTimeout(typeLine, Math.random() * 150 + 100);
    }
  };
  
  // 开始打字效果
  setTimeout(typeLine, 500);
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

// 设置回到顶部按钮功能
const setupBackToTop = () => {
  const backToTopButton = document.getElementById('backToTop');
  if (!backToTopButton) return;
  
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
};

// Initialize
window.addEventListener('scroll', handleScroll);
window.addEventListener('resize', () => {
  handleScroll();
  
  // 在调整窗口大小时重新检查移动菜单
  const mainNav = document.querySelector('.main-nav');
  if (window.innerWidth > 768 && mainNav) {
    mainNav.classList.remove('show');
    if (mobileNavToggle) {
      mobileNavToggle.classList.remove('active');
    }
  }
});

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
  
  // 设置移动端菜单
  setupMobileMenu();
  
  // 设置导航链接点击事件
  setupNavLinkClick();
  
  // 设置回到顶部按钮
  setupBackToTop();
  
  // 每隔一段时间更新二进制流
  setInterval(() => {
    createBinaryStreams();
  }, 30000);
  
  // Add initial animation to the first section
  const introSection = document.getElementById('intro');
  if (introSection) {
    introSection.classList.add('section-visible');
  }

  // 初始处理滚动事件
  handleScroll();
});
