# Performance Optimization Guide

## التحسينات المطبقة:

### 1. تحسين الصور
- ✅ إضافة `sizes` لجميع الصور
- ✅ استخدام `loading="lazy"` للصور غير الحرجة
- ✅ تقليل `priority` للصورة الرئيسية فقط
- ✅ تقليل `quality` إلى 85
- ✅ تفعيل AVIF و WebP

### 2. تحسين الخطوط
- ✅ تقليل أوزان Poppins من 3 إلى 2
- ✅ إضافة `display: swap`
- ✅ إزالة Roboto من CSS
- ✅ إضافة preconnect للخطوط

### 3. تحسين JavaScript
- ✅ تحويل FeaturedProducts إلى Server Component
- ✅ Dynamic import للـ Footer
- ✅ تفعيل `removeConsole` في production
- ✅ تفعيل `swcMinify`

### 4. تحسين التخزين المؤقت
- ✅ إضافة `revalidate: 3600` للصفحة الرئيسية
- ✅ إضافة middleware للـ cache headers
- ✅ تفعيل `minimumCacheTTL` للصور

### 5. تحسين الحزم
- ✅ إضافة `optimizePackageImports` لـ framer-motion و react-icons
- ✅ تفعيل `optimizeCss`

## النتائج المتوقعة:

### قبل:
- FCP: 3.8s
- LCP: 5.4s
- Speed Index: 4.3s

### بعد:
- FCP: ~1.5s (تحسن 60%)
- LCP: ~2.5s (تحسن 54%)
- Speed Index: ~2.0s (تحسن 53%)

## خطوات إضافية للتحسين:

### 1. ضغط الصور
```bash
# استخدم أداة لضغط الصور في /public/images/
npm install -g sharp-cli
sharp -i public/images/*.webp -o public/images/ --webp
```

### 2. تفعيل ISR
- الصفحة الرئيسية تستخدم الآن `revalidate: 3600`
- يتم إعادة بناء الصفحة كل ساعة

### 3. CDN
- تأكد من رفع الموقع على Vercel للاستفادة من Edge Network
- الصور ستُحمل من CDN تلقائياً

### 4. تحليل الحزم
```bash
npm run analyze
```

## أوامر مهمة:

```bash
# Development
npm run dev

# Production Build
npm run build

# Start Production
npm start

# Analyze Bundle
npm run analyze
```

## ملاحظات:
- تأكد من تحديث `.env.production` بمعلومات Firebase الصحيحة
- راجع middleware.ts للتأكد من cache headers
- استخدم Vercel Speed Insights لمراقبة الأداء
