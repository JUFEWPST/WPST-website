// 移动导航菜单交互
const navMenu = document.querySelector('.nav-menu');
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');

// 处理移动端菜单切换
if (mobileNavToggle && navMenu) {
  mobileNavToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    mobileNavToggle.classList.toggle('active');
  });
}

// 处理导航链接点击事件
const navLinks = document.querySelectorAll('.nav-menu a');
for (const link of navLinks) {
  link.addEventListener('click', () => {
    // 如果是移动端，点击链接后关闭菜单
    if (window.innerWidth <= 768) {
      navMenu.classList.remove('show');
      mobileNavToggle.classList.remove('active');
    }
  });
} 