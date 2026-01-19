# 安宁疗护平台装饰文件使用说明

本文件夹包含平台装饰文件，用于增强界面的视觉质感和专业度。

## 📁 文件清单

| 文件名 | 尺寸 | 格式 | 用途 |
|--------|------|------|------|
| logo.png | 200×80 | PNG | 平台核心标识 |
| pattern.png | 1024×1024 | PNG | 背景纹理 |
| gradient-1.jpg | 1920×1080 | JPG | 专业平静渐变背景 |
| gradient-2.jpg | 1920×1080 | JPG | 温暖人文渐变背景 |

## 🎨 设计规范

### 核心原则
- **低饱和度**：所有颜色饱和度≤35%，保持柔和
- **高柔和度**：避免强烈对比，传递温暖、专业的氛围
- **简约定制**：无复杂元素、无立体阴影，线条简洁流畅
- **统一风格**：与平台"温暖+专业"的核心氛围保持一致

### 色彩体系
```
主色：#8066D2（淡紫）- 传递人文关怀
辅助色：#41A8F9（浅蓝）- 体现医疗专业
文字色：#333333（深灰）- 避免纯黑的生硬感
背景色1：#E8F4F8（浅蓝）- 平静专业
背景色2：#EDE7F6（淡紫）- 温柔包容
背景色3：#FFE4C4（暖米色）- 温暖陪伴
背景色4：#FCE4EC（浅粉）- 柔和关爱
```

## 📖 使用场景

### 1. logo.png
**使用位置：**
- 导航栏左上角（src/components/Layout/MainLayout.tsx）
- 登录页头部（src/components/Login/LoginPage.tsx）
- 底部版权区（MainLayout）
- 资料下载文件水印

**使用示例：**
```tsx
<img src="/images/decorative/logo.png" alt="安享宁护" />
```

---

### 2. pattern.png
**功能定位：** 低存在感增强页面质感，不干扰主内容

**使用位置：**
- 卡片背景（如资源库下载卡片）
- 页面角落装饰
- 表单背景（降低纯白单调感）

**CSS 使用示例：**
```css
.card-background {
  background-image: url('/images/decorative/pattern.png');
  background-repeat: repeat;
  background-size: auto;
  opacity: 0.5;
}
```

**推荐使用位置：**
- 资源中心的卡片背景（src/pages/ResourceCenter.tsx）
- 社区帖子的背景装饰（src/pages/Community.tsx）
- 表单容器的背景（src/pages/ServiceBooking.tsx）

---

### 3. gradient-1.jpg
**风格定位：** 专业平静

**适用板块：**
- 症状控制专区
- 医疗资源库页面
- 医护人员入口页面

**CSS 使用示例：**
```css
.professional-bg {
  background: linear-gradient(135deg, #E8F4F8 0%, #EDE7F6 100%);
  /* 或者直接使用图片 */
  background: url('/images/decorative/gradient-1.jpg') center/cover;
}
```

**推荐使用位置：**
- 生命体征监测页面（src/pages/VitalSigns.tsx）
- 医疗记录页面（src/pages/MedicalRecords.tsx）
- 护理记录页面（src/pages/NursingRecords.tsx）
- 药物管理页面（src/pages/Medication.tsx）

---

### 4. gradient-2.jpg
**风格定位：** 温暖人文

**适用板块：**
- 心理支持专区
- 家属专区页面
- 生命纪念板块

**CSS 使用示例：**
```css
.warm-bg {
  background: linear-gradient(135deg, #FFE4C4 0%, #FCE4EC 100%);
  /* 或者直接使用图片 */
  background: url('/images/decorative/gradient-2.jpg') center/cover;
}
```

**推荐使用位置：**
- 心理支持页面（src/pages/PsychologicalSupport.tsx）
- 心理评估页面（src/pages/PsychologicalAssessment.tsx）
- 家属沟通页面（src/pages/FamilyCommunication.tsx）
- 生命纪念页面（src/pages/DeathEducation.tsx）

## 🔧 生成工具

如果需要重新生成或修改装饰文件，请使用以下工具：

### 方式一：使用 HTML 生成器
1. 在浏览器中打开 `generate-images.html`
2. 点击"生成所有图片"预览效果
3. 满意后点击"下载所有图片"
4. 将下载的文件移动到本文件夹

### 方式二：在线工具推荐
- **Logo设计**：Canva（免费模板）输入"hospice care logo"
- **渐变背景**：CSS Gradient Generator 或 Pexels 搜索"soft gradient"
- **纹理素材**：PNGtree 搜索"subtle pattern"，筛选 CC0 免费商用

### 方式三：专业设计工具
- **Adobe Illustrator**：矢量Logo设计
- **Figma**：UI设计协作
- **Photoshop**：图片优化处理

## 📐 技术规范

### Logo 规范
- 最小显示尺寸：40×16px（仍保持可读性）
- 安全区域：内边距 5px，避免被裁切
- 透明度：PNG透明背景
- 分辨率：72 DPI（Web标准）

### Pattern 规范
- 平铺方式：repeat（无缝重复）
- 透明度：≤40%（不干扰主内容）
- 缩放：可缩放至任意尺寸不模糊

### 渐变规范
- 文字可读性：叠加文字后清晰度≥85%
- 亮度范围：85%-90%（避免过亮或过暗）
- 文件大小：JPG格式，推荐质量85-95%

## 🎯 最佳实践

### 1. 响应式设计
```tsx
// 小屏显示简化版logo
<img
  src="/images/decorative/logo.png"
  alt="安享宁护"
  style={{
    maxWidth: '100%',
    height: 'auto'
  }}
/>
```

### 2. 性能优化
- 渐变背景优先使用 CSS 而非图片（减少HTTP请求）
- Pattern 使用 CSS `background-repeat: repeat` 而非大尺寸图片
- Logo 使用 WebP 格式可进一步减小文件大小

### 3. 无障碍访问
- 为所有图片添加 `alt` 属性
- 确保文字在背景上的对比度≥4.5:1
- 使用 `aria-label` 提供屏幕阅读器支持

### 4. 品牌一致性
- 所有页面使用相同的 Logo
- 同类功能板块使用相同的渐变背景
- 保持整体色调的统一性

## 🔄 更新日志

| 版本 | 日期 | 更新内容 |
|------|------|----------|
| 1.0.0 | 2025-01-18 | 初始版本，包含4个基础装饰文件 |

## 📞 技术支持

如有设计或使用问题，请参考：
- 《安宁疗护实践指南（2025年版）》- 视觉规范章节
- 项目 README.md - 整体设计原则

---

**注：** 所有装饰文件均遵循安宁疗护"温暖+专业"的核心设计理念，体现对生命的尊重与关怀。
