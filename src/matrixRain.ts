/**
 * 黑客帝国数字雨效果
 * 实现经典的0和1数字垂直下落的视觉效果
 */

export class MatrixRain {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null = null;
  private drops: number[] = [];
  private fontSize: number = 14;
  private columns: number = 0;
  private characters: string[] = [];
  private animationId: number | null = null;

  /**
   * 构造函数
   * @param canvasId 画布元素ID
   * @param mode 模式: "binary"(二进制模式), "matrix"(矩阵模式), "hex"(十六进制模式)
   */
  constructor(canvasId: string, mode: 'binary' | 'matrix' | 'hex' = 'matrix') {
    // 获取画布元素
    const canvasElement = document.getElementById(canvasId);
    if (!canvasElement) {
      console.error(`Canvas with id ${canvasId} not found`);
      // 创建新的canvas元素
      this.canvas = document.createElement('canvas');
      this.canvas.id = canvasId;
      this.canvas.className = 'matrix-rain';
      document.body.appendChild(this.canvas);
    } else {
      this.canvas = canvasElement as HTMLCanvasElement;
    }

    // 增加z-index确保元素可见
    this.canvas.style.zIndex = '0';
    
    // 获取2D上下文
    const ctx = this.canvas.getContext('2d');
    if (!ctx) {
      console.error('Could not get 2D context');
      return;
    }
    this.ctx = ctx;

    // 设置字符集
    switch (mode) {
      case 'binary':
        this.characters = '01'.split('');
        break;
      case 'hex':
        this.characters = '0123456789ABCDEF'.split('');
        break;
      case 'matrix':
      default:
        this.characters = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        break;
    }

    // 初始化画布尺寸
    this.resizeCanvas();

    // 初始化滴落位置
    this.initDrops();

    // 添加窗口大小改变事件监听
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  /**
   * 处理窗口大小变化
   */
  private handleResize(): void {
    // 停止当前动画
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    
    // 调整画布大小
    this.resizeCanvas();
    
    // 重新启动动画
    this.start();
  }

  /**
   * 调整画布大小适应窗口
   */
  private resizeCanvas(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.columns = Math.floor(this.canvas.width / this.fontSize);
    this.initDrops();
  }

  /**
   * 初始化雨滴位置
   */
  private initDrops(): void {
    // 清空当前雨滴数组
    this.drops = [];
    
    // 为每列创建一个雨滴，初始位置随机
    for (let i = 0; i < this.columns; i++) {
      // 随机位置开始
      this.drops[i] = Math.random() * -100;
    }
  }

  /**
   * 绘制单帧
   */
  private draw(): void {
    if (!this.ctx) return;
    
    // 添加半透明黑色背景，产生尾巴效果
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';  // 降低透明度变化速度
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // 设置文字样式
    this.ctx.font = `${this.fontSize}px "Fira Code", monospace`;

    // 绘制每列的字符
    for (let i = 0; i < this.drops.length; i++) {
      // 随机选择字符
      const text = this.characters[Math.floor(Math.random() * this.characters.length)];
      
      // 获取当前y位置
      const y = this.drops[i] * this.fontSize;
      
      // 对第一个字符使用更亮的绿色，创建"头部"效果
      if (this.drops[i] <= 1) {
        this.ctx.fillStyle = 'rgba(180, 255, 180, 1)';
      } else {
        // 绘制文字 - 降低透明度衰减速度
        const alpha = Math.max(0.9 - (this.drops[i] * 0.005), 0.3);  // 提高最小透明度
        this.ctx.fillStyle = `rgba(65, 255, 138, ${alpha})`;
      }
      
      // 绘制字符
      this.ctx.fillText(text, i * this.fontSize, y);

      // 当字符到达底部或有小概率时重置
      if (y > this.canvas.height || Math.random() > 0.995) {  // 降低重置概率
        this.drops[i] = 0;
      }

      // 移动雨滴
      this.drops[i] += 0.3 + Math.random() * 0.3; // 降低速度，更持久
    }
  }

  /**
   * 开始动画
   */
  public start(): void {
    // 防止多次启动
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
    }
    
    // 动画函数
    const animate = (): void => {
      this.draw();
      this.animationId = requestAnimationFrame(animate);
    };
    
    // 启动动画
    this.animationId = requestAnimationFrame(animate);
  }

  /**
   * 停止动画
   */
  public stop(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
}

/**
 * 创建二进制流效果
 * 添加垂直运动的二进制数字列
 */
export function createBinaryStreams(): void {
  const container = document.querySelector('.binary-stream');
  if (!container) return;

  // 清空容器内容
  container.innerHTML = '';

  // 设置列数
  const columnCount = Math.floor(window.innerWidth / 20);
  
  // 创建多列二进制数
  for (let i = 0; i < columnCount; i++) {
    // 创建列元素
    const column = document.createElement('div');
    column.className = 'binary-column';
    
    // 随机设置列的属性
    column.style.left = `${Math.random() * 100}%`;
    column.style.animationDuration = `${Math.random() * 20 + 10}s`;
    column.style.animationDelay = `${Math.random() * 10}s`;
    
    // 创建二进制位
    const length = Math.floor(Math.random() * 20) + 10;
    for (let j = 0; j < length; j++) {
      const bit = document.createElement('div');
      bit.className = 'binary-bit';
      bit.textContent = Math.random() > 0.5 ? '1' : '0';
      
      // 随机透明度
      bit.style.opacity = `${Math.random() * 0.5 + 0.5}`;
      
      // 添加到列
      column.appendChild(bit);
    }
    
    // 添加到容器
    container.appendChild(column);
  }
}

/**
 * 创建十六进制数据显示
 * 模拟黑客正在查看十六进制数据
 */
export function createHexDisplay(): void {
  const hexContainer = document.querySelector('.hex-display');
  if (!hexContainer) {
    // 创建容器
    const container = document.createElement('div');
    container.className = 'hex-display';
    document.body.appendChild(container);
    
    // 更新显示
    updateHexDisplay(container);
  } else {
    updateHexDisplay(hexContainer as HTMLElement);
  }
}

/**
 * 更新十六进制显示内容
 */
function updateHexDisplay(container: HTMLElement): void {
  // 十六进制字符
  const hexChars = '0123456789ABCDEF';
  
  setInterval(() => {
    let hexText = '';
    // 生成随机十六进制数据
    for (let i = 0; i < 8; i++) {
      const byte = Array.from({length: 2}, () => hexChars[Math.floor(Math.random() * 16)]).join('');
      hexText += byte + ' ';
    }
    
    // 附加随机地址
    const address = Array.from({length: 8}, () => hexChars[Math.floor(Math.random() * 16)]).join('');
    container.textContent = `0x${address}: ${hexText}`;
  }, 1000);
}

/**
 * 创建端口扫描模拟
 * 模拟网络安全的端口扫描过程
 */
export function createPortScan(): void {
  const scanContainer = document.querySelector('.port-scan');
  if (!scanContainer) {
    // 创建容器
    const container = document.createElement('div');
    container.className = 'port-scan';
    document.body.appendChild(container);
    
    // 更新显示
    simulatePortScan(container);
  } else {
    simulatePortScan(scanContainer as HTMLElement);
  }
}

/**
 * 模拟端口扫描过程
 */
function simulatePortScan(container: HTMLElement): void {
  const ports = [21, 22, 23, 25, 53, 80, 110, 143, 443, 445, 3306, 3389, 8080];
  const statuses = ['OPEN', 'CLOSED', 'FILTERED'];
  const services = ['FTP', 'SSH', 'TELNET', 'SMTP', 'DNS', 'HTTP', 'POP3', 'IMAP', 'HTTPS', 'SMB', 'MySQL', 'RDP', 'HTTP-ALT'];
  
  let scanText = '# PORT SCANNING IN PROGRESS...\n';
  container.innerHTML = scanText;
  
  let portIndex = 0;
  
  const scanInterval = setInterval(() => {
    if (portIndex >= ports.length) {
      clearInterval(scanInterval);
      scanText += '\n# SCAN COMPLETE';
      container.innerHTML = scanText;
      return;
    }
    
    const port = ports[portIndex];
    const status = Math.random() > 0.7 ? 'OPEN' : (Math.random() > 0.5 ? 'CLOSED' : 'FILTERED');
    const service = services[portIndex];
    
    scanText += `\nPORT ${port}/tcp\t${status}\t${service}`;
    container.innerHTML = scanText;
    
    portIndex++;
  }, 500);
}

/**
 * 创建入侵警告效果
 */
export function createIntrusionWarning(): void {
  if (!document.querySelector('.intrusion-warning')) {
    const warning = document.createElement('div');
    warning.className = 'intrusion-warning';
    warning.textContent = '⚠ 入侵检测警告 ⚠';
    document.body.appendChild(warning);
  }
} 