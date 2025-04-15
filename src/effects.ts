/**
 * 视觉效果模块 - 提供网站的高级视觉特效
 * 包括赛博网格背景和扫描线效果
 */

/**
 * 初始化赛博风格网格背景
 * 创建一个基于当前视窗大小的网格线条背景
 */
export const initCyberGrid = (): void => {
  // 移除已存在的网格（如果有）
  const existingGrid = document.querySelector('.cyber-grid');
  if (existingGrid) {
    existingGrid.remove();
  }

  // 创建网格容器
  const grid = document.createElement('div');
  grid.className = 'cyber-grid';
  document.body.appendChild(grid);

  // 获取视窗尺寸
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

  // 设置网格线间距
  const horizontalGap = 40; // 水平线间距（像素）
  const verticalGap = 40;   // 垂直线间距（像素）

  // 创建水平线
  const horizontalLinesCount = Math.floor(vh / horizontalGap);
  for (let i = 0; i <= horizontalLinesCount; i++) {
    const line = document.createElement('div');
    line.className = 'grid-line horizontal';
    line.style.top = `${i * horizontalGap}px`;
    grid.appendChild(line);
  }

  // 创建垂直线
  const verticalLinesCount = Math.floor(vw / verticalGap);
  for (let i = 0; i <= verticalLinesCount; i++) {
    const line = document.createElement('div');
    line.className = 'grid-line vertical';
    line.style.left = `${i * verticalGap}px`;
    grid.appendChild(line);
  }
};

/**
 * 初始化扫描线效果
 * 创建一个移动的扫描线，增强赛博朋克视觉体验
 */
export const initScanLine = (): void => {
  // 移除已存在的扫描线（如果有）
  const existingScanLine = document.querySelector('.scan-line');
  if (existingScanLine) {
    existingScanLine.remove();
  }

  // 创建扫描线元素
  const scanLine = document.createElement('div');
  scanLine.className = 'scan-line';
  document.body.appendChild(scanLine);
};

/**
 * 初始化数据流效果
 * 创建一个垂直流动的数据线条效果
 */
export const initDataStream = (): void => {
  // 移除已存在的数据流（如果有）
  const existingDataStream = document.querySelector('.data-stream');
  if (existingDataStream) {
    existingDataStream.remove();
  }

  // 创建数据流元素
  const dataStream = document.createElement('div');
  dataStream.className = 'data-stream';
  document.body.appendChild(dataStream);
};

/**
 * 初始化故障文本效果
 * 为带有glitch-text类的元素添加data-text属性
 */
export const initGlitchText = (): void => {
  const glitchElements = document.querySelectorAll('.glitch-text');
  
  glitchElements.forEach(element => {
    // 如果已经有data-text属性，跳过
    if (element.getAttribute('data-text')) return;
    
    // 否则，添加data-text属性，值为元素的文本内容
    const text = element.textContent || '';
    element.setAttribute('data-text', text);
  });
};

/**
 * 处理窗口大小变化
 * 当窗口大小变化时重新初始化网格以适应新尺寸
 */
export const handleResize = (): void => {
  initCyberGrid();
};

/**
 * 注册所有视觉效果
 * 初始化所有效果并设置窗口大小变化的监听器
 */
export const registerEffects = (): void => {
  // 初始化效果
  initCyberGrid();
  initScanLine();
  initDataStream();
  initGlitchText();

  // 添加窗口大小变化的处理
  window.addEventListener('resize', handleResize);
};