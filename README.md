# 江西财经大学网安协会网站

这是江西财经大学网安协会的官方网站项目，采用HTML、CSS和TypeScript构建，使用Vite作为构建工具。

## 项目特色

- 响应式设计，适配不同设备
- 动态滚动效果和平滑过渡
- 现代化的UI设计
- 遵循Bond风格的视觉效果

## 网站内容

网站包含五个主要部分：
1. 团队介绍
2. 方向分支
3. 历史荣誉
4. 网络服务
5. 历届成员

## 如何运行

### 本地开发

1. 克隆仓库
   ```bash
   git clone https://github.com/你的用户名/jxufe-network-security.git
   cd jxufe-network-security
   ```

2. 安装依赖
   ```bash
   # 使用npm
   npm install

   # 或使用Yarn
   yarn

   # 或使用Bun
   bun install
   ```

3. 启动开发服务器
   ```bash
   # 使用npm
   npm run dev

   # 或使用Yarn
   yarn dev

   # 或使用Bun
   bun run dev
   ```

4. 在浏览器中打开 http://localhost:5173

### 构建项目

```bash
# 使用npm
npm run build

# 或使用Yarn
yarn build

# 或使用Bun
bun run build
```

生成的文件将位于 `dist` 目录中。

## 部署指南

### Netlify 部署

1. 将代码推送到GitHub仓库
2. 在Netlify上创建新站点，连接GitHub仓库
3. 构建设置：
   - 构建命令: `npm run build`
   - 发布目录: `dist`
4. 点击部署

### Vercel 部署

1. 将代码推送到GitHub仓库
2. 在Vercel上导入项目
3. 配置构建设置：
   - 框架预设: `Vite`
   - 构建命令: `npm run build`
   - 输出目录: `dist`
4. 点击部署

### Deno Deploy 部署

1. 将代码推送到GitHub仓库
2. 创建`server.ts`文件：
   ```typescript
   import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
   import { serveDir } from "https://deno.land/std@0.140.0/http/file_server.ts";

   serve((req) => {
     return serveDir(req, {
       fsRoot: "dist",
     });
   });
   ```
3. 在Deno Deploy中连接仓库，设置入口文件为`server.ts`

## 许可证

[MIT](LICENSE)
