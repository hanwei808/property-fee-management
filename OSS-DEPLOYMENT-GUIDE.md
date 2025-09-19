# OSS 部署配置指南

## 前置条件

### 1. 阿里云 OSS Bucket 设置

1. **创建 OSS Bucket**

   - 登录阿里云控制台
   - 进入对象存储 OSS 服务
   - 创建新的 Bucket，选择合适的地域
   - 记录 Bucket 名称和地域信息

2. **配置静态网站托管**

   - 在 Bucket 管理页面，找到"基础设置"
   - 启用"静态网站托管"
   - 设置默认首页为 `index.html`
   - 设置默认 404 页面为 `index.html`（重要：用于 SPA 路由）

   **特别注意：** 为了解决单页应用（SPA）的客户端路由问题，必须将 404 错误页面也设置为 `index.html`，这样当用户直接访问 `/workbench/todo` 等路径时，OSS 会返回首页，然后由 Next.js 的客户端路由处理。

3. **设置 Bucket 权限**

   - 在"权限管理"中设置 Bucket 策略
   - 添加公共读权限：

   ```json
   {
     "Version": "1",
     "Statement": [
       {
         "Effect": "Allow",
         "Principal": "*",
         "Action": ["oss:GetObject"],
         "Resource": ["acs:oss:*:*:your-bucket-name/*"]
       }
     ]
   }
   ```

4. **绑定自定义域名**（可选）
   - 在"传输管理">"域名管理"中绑定您的域名
   - 配置 CNAME 记录指向 Bucket 的外网访问域名
   - 申请 SSL 证书（推荐）

### 2. 安装 ossutil64 工具

#### Windows 安装方法：

1. **下载 ossutil64**

   ```powershell
   # 下载最新版本的 ossutil64
   Invoke-WebRequest -Uri "https://gosspublic.alicdn.com/ossutil/1.7.16/ossutil64.exe" -OutFile "ossutil64.exe"

   # 将 ossutil64.exe 移动到系统 PATH 中的目录
   Move-Item ossutil64.exe "C:\Windows\System32\"
   ```

2. **验证安装**
   ```powershell
   ossutil64 --version
   ```

#### 其他安装方法：

- 从阿里云官网下载：https://help.aliyun.com/document_detail/120075.html
- 使用包管理器安装（如果支持）

### 3. 获取访问密钥

1. **创建 RAM 用户**（推荐）

   - 登录阿里云 RAM 控制台
   - 创建新的 RAM 用户
   - 为用户分配 OSS 相关权限：
     - `AliyunOSSFullAccess`（完全权限）
     - 或创建自定义权限策略（仅包含需要的权限）

2. **获取 AccessKey**
   - 为 RAM 用户创建 AccessKey
   - 记录 AccessKeyId 和 AccessKeySecret（注意保密）

## 部署步骤

### 1. 配置环境变量

```powershell
# 设置阿里云访问密钥
$env:ALI_OSS_ACCESS_KEY_ID="your_access_key_id"
$env:ALI_OSS_ACCESS_KEY_SECRET="your_access_key_secret"
```

### 2. 修改部署配置

编辑 `deploy-to-oss.js` 文件中的 OSS_CONFIG：

```javascript
const OSS_CONFIG = {
  region: 'oss-cn-hangzhou', // 您的 OSS 区域
  bucket: 'your-bucket-name', // 您的 Bucket 名称
  deployPath: '' // 部署路径，空字符串表示根目录
}
```

### 3. 执行部署

```powershell
# 构建并部署
npm run deploy:build

# 或者分步执行
npm run export    # 仅构建
npm run deploy    # 仅上传
```

## 访问您的网站

部署成功后，您可以通过以下地址访问：

- **OSS 默认域名**：`https://your-bucket-name.oss-cn-hangzhou.aliyuncs.com`
- **自定义域名**：`https://your-domain.com`（如果已配置）

## 故障排除

### 常见问题

1. **侧边栏点击无法跳转页面 / 页面刷新后 404**

   **原因**：单页应用（SPA）的客户端路由问题

   **解决方法**：

   - 确保 OSS 静态网站托管中的"默认 404 页面"设置为 `index.html`
   - 检查侧边栏组件是否使用了 Next.js 的 `Link` 组件（已修复）
   - 确保 `next.config.mjs` 中配置了 `trailingSlash: true`

   **手动配置步骤**：

   ```
   1. 登录阿里云 OSS 控制台
   2. 选择您的 Bucket
   3. 进入"基础设置" > "静态网站托管"
   4. 设置默认首页：index.html
   5. 设置默认 404 页面：index.html （重要！）
   6. 保存配置
   ```

2. **权限错误**

   - 检查 AccessKey 权限
   - 确认 Bucket 策略配置正确

3. **ossutil64 命令不存在**

   - 确认已正确安装 ossutil64
   - 检查环境变量 PATH 配置

4. **构建失败**

   - 检查 `next.config.mjs` 配置
   - 确认所有依赖已安装

5. **404 错误**
   - 确认已启用静态网站托管
   - 检查文件路径和文件名

### 调试技巧

1. **查看构建输出**

   ```powershell
   # 构建后检查 out 目录
   Get-ChildItem -Recurse out
   ```

2. **手动测试上传**

   ```powershell
   # 测试 ossutil64 连接
   ossutil64 ls oss://your-bucket-name
   ```

3. **检查网站文件**
   ```powershell
   # 验证上传的文件
   ossutil64 ls oss://your-bucket-name/ -r
   ```

## 高级配置

### 1. CDN 加速

- 在阿里云 CDN 控制台配置 CDN 加速
- 源站设置为您的 OSS Bucket 域名
- 配置缓存规则和 HTTPS

### 2. 自动化部署

可以配置 GitHub Actions 或其他 CI/CD 工具自动部署：

```yaml
# .github/workflows/deploy.yml
name: Deploy to OSS
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run deploy:build
        env:
          ALI_OSS_ACCESS_KEY_ID: ${{ secrets.ALI_OSS_ACCESS_KEY_ID }}
          ALI_OSS_ACCESS_KEY_SECRET: ${{ secrets.ALI_OSS_ACCESS_KEY_SECRET }}
```

### 3. 多环境部署

修改 `deploy-to-oss.js` 支持多环境：

```javascript
const environment = process.env.NODE_ENV || 'production'
const OSS_CONFIG = {
  production: {
    bucket: 'your-prod-bucket',
    deployPath: ''
  },
  staging: {
    bucket: 'your-staging-bucket',
    deployPath: 'staging'
  }
}[environment]
```
