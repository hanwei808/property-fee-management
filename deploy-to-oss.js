const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// OSS 配置 - 请根据您的实际情况修改
const OSS_CONFIG = {
  region: 'oss-cn-hangzhou', // 您的 OSS 区域
  bucket: 'your-bucket-name', // 您的 Bucket 名称
  accessKeyId: process.env.ALI_OSS_ACCESS_KEY_ID, // 从环境变量获取
  accessKeySecret: process.env.ALI_OSS_ACCESS_KEY_SECRET, // 从环境变量获取
  deployPath: '', // 部署到 Bucket 的路径，空字符串表示根目录
};

// 验证环境变量
function checkEnvironment() {
  console.log('🔍 检查环境配置...');
  
  if (!OSS_CONFIG.accessKeyId || !OSS_CONFIG.accessKeySecret) {
    console.error('❌ 请设置以下环境变量：');
    console.error('   ALI_OSS_ACCESS_KEY_ID');
    console.error('   ALI_OSS_ACCESS_KEY_SECRET');
    console.error('');
    console.error('Windows 设置方法：');
    console.error('   $env:ALI_OSS_ACCESS_KEY_ID="your_access_key_id"');
    console.error('   $env:ALI_OSS_ACCESS_KEY_SECRET="your_access_key_secret"');
    process.exit(1);
  }
  
  console.log('✅ 环境配置检查通过');
}

// 构建项目
function buildProject() {
  console.log('🔨 开始构建项目...');
  
  try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ 项目构建完成');
  } catch (error) {
    console.error('❌ 项目构建失败:', error.message);
    process.exit(1);
  }
}

// 检查构建输出
function checkBuildOutput() {
  const outDir = path.join(__dirname, 'out');
  
  if (!fs.existsSync(outDir)) {
    console.error('❌ 未找到构建输出目录 ./out');
    console.error('请确认 next.config.mjs 中已配置 output: "export"');
    process.exit(1);
  }
  
  console.log('✅ 构建输出目录检查通过');
  return outDir;
}

// 配置 OSS 静态网站托管
function configureOSSWebsite() {
  console.log('🌐 配置 OSS 静态网站托管...');
  
  try {
    // 配置静态网站托管
    const websiteCmd = `ossutil64 website --method put oss://${OSS_CONFIG.bucket} index.html 404.html`;
    console.log(`执行: ${websiteCmd}`);
    execSync(websiteCmd, { stdio: 'inherit' });
    
    // 配置错误页面重定向规则（可选）
    const routingRulesFile = path.join(__dirname, 'oss-routing-rules.json');
    if (fs.existsSync(routingRulesFile)) {
      const routingCmd = `ossutil64 website --method put oss://${OSS_CONFIG.bucket} index.html 404.html --routing-rules-file ${routingRulesFile}`;
      console.log(`执行: ${routingCmd}`);
      execSync(routingCmd, { stdio: 'inherit' });
      console.log('✅ 路由规则配置完成');
    }
    
    console.log('✅ 静态网站托管配置完成');
    
  } catch (error) {
    console.warn('⚠️  静态网站托管配置失败，请手动在 OSS 控制台配置');
    console.warn('   1. 启用静态网站托管');
    console.warn('   2. 设置默认首页：index.html');
    console.warn('   3. 设置默认404页：404.html');
    console.warn('   4. 配置错误页面重定向到首页（用于 SPA 路由）');
  }
}

// 上传到 OSS (使用 ossutil)
function uploadToOSS(outDir) {
  console.log('📤 开始上传到阿里云 OSS...');
  
  try {
    // 检查是否安装了 ossutil
    execSync('ossutil64 --version', { stdio: 'pipe' });
  } catch (error) {
    console.error('❌ 未找到 ossutil64 命令');
    console.error('请先安装 ossutil64：');
    console.error('https://help.aliyun.com/document_detail/120075.html');
    process.exit(1);
  }
  
  try {
    // 配置 ossutil
    const configCmd = `ossutil64 config -e ${OSS_CONFIG.region}.aliyuncs.com -i ${OSS_CONFIG.accessKeyId} -k ${OSS_CONFIG.accessKeySecret}`;
    execSync(configCmd, { stdio: 'pipe' });
    
    // 上传文件
    const uploadPath = OSS_CONFIG.deployPath ? `oss://${OSS_CONFIG.bucket}/${OSS_CONFIG.deployPath}/` : `oss://${OSS_CONFIG.bucket}/`;
    const uploadCmd = `ossutil64 cp ${outDir} ${uploadPath} -r -f`;
    
    console.log(`上传命令: ${uploadCmd}`);
    execSync(uploadCmd, { stdio: 'inherit' });
    
    // 配置静态网站托管
    configureOSSWebsite();
    
    console.log('✅ 上传完成！');
    console.log(`🌐 访问地址: https://${OSS_CONFIG.bucket}.${OSS_CONFIG.region}.aliyuncs.com${OSS_CONFIG.deployPath ? '/' + OSS_CONFIG.deployPath : ''}`);
    
  } catch (error) {
    console.error('❌ 上传失败:', error.message);
    process.exit(1);
  }
}

// 主函数
function main() {
  console.log('🚀 开始部署到阿里云 OSS...');
  console.log('');
  
  checkEnvironment();
  buildProject();
  const outDir = checkBuildOutput();
  uploadToOSS(outDir);
  
  console.log('');
  console.log('🎉 部署完成！');
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = { main, OSS_CONFIG };