# 江西财经大学网安协会网站 🛡️
这是江西财经大学网安协会的官方网站项目，使用现代化的 Web 技术栈构建，旨在打造一个美观、实用、易于维护的平台，展示协会风采。
**技术栈:** HTML, CSS, TypeScript, Vite
## ✨ 项目特色
*   **响应式设计:** 完美适配各种设备，无论是在电脑、平板还是手机上，都能获得最佳浏览体验。
*   **动态滚动效果和平滑过渡:** 优雅的动画效果，增强用户互动性和视觉吸引力。
*   **现代化的UI设计:** 采用现代设计理念，界面简洁美观，信息呈现清晰。
*   **Bond风格视觉效果:** 遵循Bond风格的设计规范，打造统一、专业的视觉形象。
## 📝 网站内容
网站包含以下六个主要板块：
1.  **协会简介:** 全面介绍协会的性质、目标和组织架构。
2.  **团队介绍:** 展示协会核心成员的风采，彰显团队实力。
3.  **方向分支:** 详细介绍协会各个技术方向，方便成员和访客了解。
4.  **历史荣誉:** 记录协会获得的各项荣誉，激励成员不断进步。
5.  **网络服务:** 提供协会相关的网络服务入口，方便用户使用。
6.  **历届成员:** 记录协会的传承和发展，致敬每一位参与者。
## 🚀 如何运行
### 💻 本地开发
1.  **克隆仓库**
    ```bash
    git clone https://github.com/JUFEWPST/WPST-website.git
    cd WPST-website
    ```
2.  **安装依赖**
    选择你喜欢的包管理器：
    ```bash
    # 使用 npm
    npm install
    # 或使用 Yarn
    yarn
    # 或使用 Bun (速度更快!)
    bun install
    ```
3.  **启动开发服务器**
    ```bash
    # 使用 npm
    npm run dev
    # 或使用 Yarn
    yarn dev
    # 或使用 Bun
    bun run dev
    ```
4.  **在浏览器中打开** `http://localhost:5173`
### 📦 构建项目
```bash
# 使用 npm
npm run build
# 或使用 Yarn
yarn build
# 或使用 Bun
bun run build
```
构建完成后，文件将保存在 `dist` 目录中。
## 🌍 部署指南
### 一键部署 🚀
使用以下按钮快速部署到你喜欢的平台！
#### vercel
[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/citlali985211s-projects/wpst-website)
#### 🦕 Deno Deploy
1.  将代码推送到 GitHub 仓库
2.  创建 `server.ts` 文件：
    ```typescript
    import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
    import { serveDir } from "https://deno.land/std@0.140.0/http/file_server.ts";
    serve((req) => {
      return serveDir(req, {
        fsRoot: "dist",
      });
    });
    ```
3.  在 [Deno Deploy](https://deno.com/deploy) 中连接仓库，设置入口文件为 `server.ts`
## 📜 许可证
[MIT](LICENSE)
