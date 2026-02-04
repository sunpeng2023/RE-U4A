# RE U4A - Web PPT 项目

## 项目概述

这是一个基于 Next.js 16 构建的交互式 Web 演示文稿应用，主题为"Life Beyond Earth?"（地球之外的生命）。该项目将传统的 PowerPoint 演示文稿转换为现代、交互式的 Web 应用，支持步进式内容展示、动画效果和响应式设计。

### 核心技术栈

- **框架**: Next.js 16.1.6 (App Router)
- **前端**: React 19.2.3 + TypeScript 5
- **UI 动画**: Framer Motion 12.29.2
- **样式**: Tailwind CSS 4
- **图标**: Lucide React 0.563.0
- **字体**: Inter (Google Fonts)
- **编译优化**: React Compiler (babel-plugin-react-compiler)

### 项目特点

1. **静态导出**: 配置为静态站点导出 (`output: 'export'`)，可部署到 Netlify 等平台
2. **步进式演示**: 每个幻灯片支持多步内容展示，通过点击或键盘导航
3. **多种布局类型**: 支持标题页、问答、词汇检查、填空、讨论等多种演示布局
4. **响应式设计**: 适配桌面和移动设备
5. **视觉特效**: 包含渐变背景、模糊效果、动画过渡等现代 UI 元素

## 构建和运行

### 开发模式

```bash
npm run dev
```

启动开发服务器，访问 http://localhost:3000

### 生产构建

```bash
npm run build
```

构建静态站点到 `out/` 目录

### 本地预览生产构建

```bash
npm run start
```

注意：由于配置了 `output: 'export'`，此命令主要用于测试构建后的静态文件

### 代码检查

```bash
npm run lint
```

运行 ESLint 进行代码质量检查

## 项目结构

```
/Users/sunpeng/Desktop/ppt/RE U4A/
├── src/
│   └── app/
│       ├── page.tsx          # 主页面，包含完整的幻灯片逻辑
│       ├── layout.tsx        # 根布局，配置元数据和字体
│       └── globals.css       # 全局样式，使用 Tailwind CSS
├── public/
│   └── images/               # 幻灯片背景图片 (slide1.png ~ slide18.png)
├── next.config.ts            # Next.js 配置（静态导出）
├── tsconfig.json             # TypeScript 配置
├── package.json              # 项目依赖和脚本
└── netlify.toml              # Netlify 部署配置
```

## 开发约定

### 代码风格

- 使用 TypeScript 进行类型检查
- 遵循 ESLint 规则（基于 `eslint-config-next`）
- 使用 Tailwind CSS 进行样式设计
- 组件采用函数式组件和 Hooks
- 响应式设计优先，使用 Tailwind 的响应式断点

### 文件组织

- 主要逻辑集中在 `src/app/page.tsx`
- 每个幻灯片作为 `Slide` 接口的对象定义
- 布局渲染逻辑使用条件渲染，基于 `layout` 属性

### 导航控制

- 支持鼠标点击任意位置前进
- 支持键盘导航：
  - 右箭头或空格键：下一步
  - 左箭头或退格键：上一步
- 底部进度条支持快速跳转到任意幻灯片

### 幻灯片布局类型

当前支持的布局类型：
- `title`: 标题页布局
- `questions`: 问题讨论布局
- `qa`: 问答布局（带词汇表）
- `vocabCheck`: 词汇检查布局
- `fillBlanks`: 填空练习布局
- `history`: 历史事实布局
- `risks`: 风险提示布局
- `predict`: 预测讨论布局
- `discussion`: 深度讨论布局
- `summary`: 总结布局

## 部署

### Netlify 部署

项目已配置 Netlify 部署配置 (`netlify.toml`)：
- 构建命令: `npm run build`
- 发布目录: `out/`
- 自动配置 SPA 重定向规则

### 其他静态托管

构建后的 `out/` 目录可直接部署到任何静态托管服务（Vercel、GitHub Pages 等）。

## 图片资源

所有幻灯片背景图片存储在 `public/images/` 目录：
- slide1.png ~ slide18.png
- 每个幻灯片对应一个背景图片
- 图片使用相对路径 `./images/slideX.png` 引用

## 关键功能实现

### 幻灯片数据结构

```typescript
interface Slide {
  id: number;
  bg: string;
  layout: string;
  steps: number;
  title?: string;
  subtitle?: string;
  header?: string;
  questions?: any[];
  facts?: { label: string; text: string }[];
  question?: string;
  answer?: string;
  highlights?: string[];
  vocab?: { word: string; def: string }[];
  // ... 其他可选字段
}
```

### 状态管理

使用 React Hooks 管理演示状态：
- `currentSlide`: 当前幻灯片索引
- `currentStep`: 当前幻灯片的步骤索引

### 动画效果

使用 Framer Motion 实现：
- 幻灯片切换的淡入淡出效果
- 内容元素的进场动画（从不同方向滑入）
- 文本高亮的视觉强调效果
- 进度条的弹性动画

### 关键词高亮

通过 `highlightText` 函数实现：
- 使用正则表达式匹配关键词
- 应用特殊的样式类（颜色、下划线、发光效果）
- 不区分大小写匹配

## 主题和设计

### 色彩方案

- 主色调：Emerald Green (#10b981) 和 Cyan (#06b6d4)
- 背景色：深色主题 (#0a0a0a)
- 文本色：白色和灰色系
- 强调色：用于关键词高亮和重要提示

### 字体

- 主要字体：Inter (Google Fonts)
- 字体大小：响应式设计，从移动端到桌面端自动调整

### 视觉效果

- 渐变背景叠加
- 毛玻璃效果 (backdrop-blur)
- 圆角和边框设计
- 发光效果和阴影
- 脉冲动画（背景装饰）

## 注意事项

1. **静态导出限制**: 由于使用静态导出，某些 Next.js 功能（如 API 路由、服务器组件）不可用
2. **图片优化**: 配置了 `images: { unoptimized: true }` 以支持静态导出
3. **React Compiler**: 已启用 React Compiler 进行编译优化
4. **路径配置**: 使用 `assetPrefix: './'` 确保相对路径正确

## 扩展建议

如需扩展此项目，可以考虑：

1. 添加更多幻灯片布局类型
2. 支持音频或视频内容
3. 添加演讲者笔记功能
4. 实现幻灯片打印或导出 PDF 功能
5. 添加多语言支持
6. 实现演示文稿编辑器
7. 添加进度保存功能（本地存储）