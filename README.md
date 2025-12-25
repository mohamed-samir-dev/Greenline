<div align="center">
  <img src="./public/images/logo.png" alt="Greenline Logo" width="120" height="120">
  
  # 🌱 Greenline
  ### Premium Fertilizer E-Commerce Platform
  
  [![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Firebase](https://img.shields.io/badge/Firebase-10.0-orange?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
  
  *A modern, full-stack e-commerce platform specializing in agricultural fertilizers and plant nutrition products. Built with cutting-edge technologies for optimal performance, scalability, and user experience.*
  
  [🚀 Live Demo](https://greenline-lcbc.vercel.app/) • [🐛 Report Bug](https://github.com/mohamed-samir-dev/greenline/issues) • [✨ Request Feature](https://github.com/mohamed-samir-dev/greenline/issues)
</div>

---

## 📋 Table of Contents

- [🎯 Overview](#-overview)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [📦 Installation](#-installation)
- [⚙️ Configuration](#️-configuration)
- [🏗️ Project Structure](#️-project-structure)
- [🔐 Authentication](#-authentication)
- [📊 Admin Dashboard](#-admin-dashboard)
- [🌐 API Reference](#-api-reference)
- [🚀 Deployment](#-deployment)
- [🧪 Testing](#-testing)
- [🛡️ Security](#️-security)
- [📈 Performance](#-performance)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [📞 Support](#-support)

---

## 🎯 Overview

Greenline is a comprehensive e-commerce platform designed specifically for the agricultural industry, focusing on fertilizers and plant nutrition products. The platform provides a seamless shopping experience for farmers, gardeners, and agricultural professionals while offering powerful management tools for administrators.

### 🎯 Key Objectives
- **Accessibility**: Make quality fertilizers accessible to all agricultural professionals
- **Efficiency**: Streamline the purchasing process with real-time inventory management
- **Reliability**: Ensure consistent product availability and accurate information
- **Scalability**: Support growing business needs with modern architecture

---

## ✨ Features

### 🛒 Customer Experience

| Feature | Description | Status |
|---------|-------------|--------|
| **Product Catalog** | Browse organic fertilizers, chemical formulas, liquid concentrates, and granular products | ✅ |
| **Advanced Search** | Filter by product type, NPK ratios, organic/synthetic, price range | ✅ |
| **Real-time Stock** | Live inventory updates and availability tracking | ✅ |
| **Shopping Cart** | Persistent cart with quantity management and price calculations | ✅ |
| **User Profiles** | Account management, order history, and preferences | ✅ |
| **Product Reviews** | Customer feedback system with ratings and photos | ✅ |
| **Wishlist** | Save products for future purchase | ✅ |
| **Mobile App** | Progressive Web App with offline capabilities | 🚧 |

### 🚀 Technical Features

- **🔄 Server-Side Rendering**: Next.js App Router for optimal SEO and performance
- **⚡ Real-time Updates**: Firebase Firestore for live data synchronization
- **🛡️ Type Safety**: Full TypeScript implementation with strict mode
- **📝 Form Validation**: React Hook Form with Zod schema validation
- **💳 Payment Processing**: Stripe integration with multiple payment methods
- **🎨 Animations**: Framer Motion for smooth, engaging user interactions
- **📱 Responsive Design**: Mobile-first approach with Tailwind CSS
- **🔍 SEO Optimized**: Meta tags, structured data, and sitemap generation

---

## 🛠️ Tech Stack

### Frontend
```
├── Next.js 16 (App Router)     # React framework with SSR/SSG
├── TypeScript 5.0              # Type-safe JavaScript
├── Tailwind CSS 4.0            # Utility-first CSS framework
├── Framer Motion 10.0          # Animation library
├── React Hook Form 7.0         # Form management
├── Zod 3.0                     # Schema validation
└── Headless UI 2.0             # Unstyled UI components
```

### Backend & Database
```
├── Firebase Firestore          # NoSQL document database
├── Firebase Auth               # Authentication service
├── Firebase Storage            # File storage
├── Firebase Functions          # Serverless functions
└── Stripe API                  # Payment processing
```

### Development & Deployment
```
├── ESLint + Prettier           # Code linting and formatting
├── Husky + lint-staged         # Git hooks
├── Jest + Testing Library      # Unit and integration testing
├── Cypress                     # E2E testing
├── Vercel                      # Deployment platform
└── GitHub Actions              # CI/CD pipeline
```

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/mohamed-samir-dev/greenline.git
cd greenline

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

### Data Protection

- **PII Encryption**: Personal data encrypted at rest
- **Payment Security**: PCI DSS compliant via Stripe
- **Audit Logging**: All admin actions logged
- **Data Backup**: Automated daily backups
- **GDPR Compliance**: Data export and deletion capabilities

---

## 🤝 Contributing

We welcome contributions from the community! Please follow our contribution guidelines.

### Development Workflow

1. **Fork the Repository**
   ```bash
   git clone https://github.com/mohamed-samir-dev/greenline.git
   cd greenline
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Changes**
   - Follow the coding standards
   - Add tests for new features
   - Update documentation

4. **Run Tests**
   ```bash
   npm run test
   npm run lint
   npm run type-check
   ```

5. **Commit Changes**
   ```bash
   git commit -m "feat: add amazing feature"
   ```

6. **Push and Create PR**
   ```bash
   git push origin feature/amazing-feature
   ```

---

## 📞 Support

### Getting Help

- **📧 Email**: [support@greenline.com](mohammedsamiermouawad@gmail.com)
- **🐛 Issues**: [GitHub Issues](https://github.com/mohamed-samir-dev/greenline/issues)

### Maintainers

- **Lead Developer**: [@username](https://github.com/mohamed-samir-dev)
- **Backend Lead**: [@backend-dev](https://github.com/mohamed-samir-dev)
- **UI/UX Lead**: [@design-lead](https://github.com/mohamed-samir-dev)
---

<div align="center">
  
### 🌱 Built with ❤️ for Green Line Store
Made with [Next.js](https://nextjs.org/) • [React](https://react.dev/) • [TypeScript](https://www.typescriptlang.org/) • [Tailwind CSS](https://tailwindcss.com/) • [Firebase](https://firebase.google.com/) • [Framer Motion](https://www.framer.com/motion/) • [Zustand](https://zustand-demo.pmnd.rs/) • [React Hook Form](https://react-hook-form.com/) • [Zod](https://zod.dev/) • [React Firebase Hooks](https://github.com/CSFrequency/react-firebase-hooks) • [Stripe](https://stripe.com/docs/js) • [@stripe/stripe-js](https://stripe.com/docs/js) • [Swiper](https://swiperjs.com/) • [Headless UI](https://headlessui.com/) • [Heroicons](https://heroicons.com/) • [Lucide React](https://lucide.dev/) • [React Icons](https://react-icons.github.io/react-icons/) • [React Loading Skeleton](https://github.com/dvtng/react-loading-skeleton) • [Sonner](https://sonner.style/) • [Vercel Speed Insights](https://vercel.com/speed-insights)

  
</div>