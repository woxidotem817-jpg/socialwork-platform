@echo off
chcp 65001 >nul
echo ========================================
echo 安宁疗护平台装饰文件生成器
echo ========================================
echo.
echo 正在打开图片生成器...
echo.
echo 提示：
echo 1. 点击"生成所有图片"预览效果
echo 2. 满意后点击"下载所有图片"
echo 3. 将下载的文件移动到本文件夹
echo.
echo ========================================
echo.

start "" "%~dp0generate-images.html"

echo.
echo 浏览器已打开生成器页面
echo 请按照页面提示操作
echo.
pause
