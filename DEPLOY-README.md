# 部署到阿里云 OSS 快速指南

## 📁 新增文件说明

- `deploy-to-oss.js` - 自动化部署脚本
- `.env.example` - 环境变量配置示例
- `OSS-DEPLOYMENT-GUIDE.md` - 详细部署指南

## 🚀 快速开始

### 1. 准备工作

```powershell
# 安装 ossutil64 工具（Windows）
Invoke-WebRequest -Uri "https://gosspublic.alicdn.com/ossutil/1.7.16/ossutil64.exe" -OutFile "ossutil64.exe"
Move-Item ossutil64.exe "C:\Windows\System32\"
```

### 2. 配置环境变量

```powershell
$env:ALI_OSS_ACCESS_KEY_ID="your_access_key_id"
$env:ALI_OSS_ACCESS_KEY_SECRET="your_access_key_secret"
```

### 3. 修改配置

编辑 `deploy-to-oss.js` 中的 OSS_CONFIG 部分：

- `region`: 您的 OSS 区域
- `bucket`: 您的 Bucket 名称
- `deployPath`: 部署路径（可选）

### 4. 部署

```powershell
npm run deploy:build
```

## 📋 可用命令

- `npm run export` - 构建静态文件
- `npm run deploy` - 上传到 OSS
- `npm run deploy:build` - 构建并部署

## 📖 详细文档

请查看 [OSS-DEPLOYMENT-GUIDE.md](./OSS-DEPLOYMENT-GUIDE.md) 获取完整的配置和部署指南。
