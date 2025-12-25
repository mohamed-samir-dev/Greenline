# 🌱 Greenline - Premium Fertilizer E-Commerce Platform

A modern, full-stack e-commerce platform specializing in agricultural fertilizers and plant nutrition products. Built with Next.js 16, TypeScript, and Firebase for optimal performance and scalability.

## ✨ Features

### 🛒 Customer Experience
- **Product Catalog** - Browse organic fertilizers, chemical formulas, liquid concentrates, and granular products
- **Real-time Stock Management** - Live inventory updates and availability tracking
- **Shopping Cart** - Seamless cart management with Zustand state management
- **User Authentication** - Secure registration and login system
- **Product Reviews** - Customer feedback and rating system
- **Responsive Design** - Mobile-first approach with Tailwind CSS

### 🔧 Admin Dashboard
- **Product Management** - Add, edit, and manage fertilizer inventory
- **Order Management** - Track and process customer orders
- **Customer Analytics** - Monitor user engagement and sales metrics
- **Stock Control** - Real-time inventory management
- **Admin Authentication** - Secure admin access with Firebase Auth

### 🚀 Technical Features
- **Server-Side Rendering** - Next.js App Router for optimal SEO
- **Real-time Updates** - Firebase Firestore for live data synchronization
- **Type Safety** - Full TypeScript implementation
- **Form Validation** - React Hook Form with Zod schema validation
- **Payment Integration** - Stripe payment processing
- **Animations** - Framer Motion for smooth user interactions

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Database:** Firebase Firestore
- **Authentication:** Firebase Auth
- **State Management:** Zustand
- **Forms:** React Hook Form + Zod
- **Payments:** Stripe
- **UI Components:** Headless UI, Heroicons, Lucide React
- **Animations:** Framer Motion

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Greenline
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file with the following variables:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
   ```

4. **Firebase Configuration**
   - Set up Firebase project with Firestore and Authentication
   - Configure Firestore security rules (see `firestore.rules`)
   - Import initial data structure (see `FIRESTORE_STRUCTURE.json`)

5. **Run the development server**
   ```bash
   npm run dev
   ```

## 🚀 Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard pages
│   ├── products/          # Product catalog pages
│   ├── cart/              # Shopping cart page
│   └── auth/              # Authentication pages
├── components/            # Reusable UI components
│   ├── admin/            # Admin-specific components
│   ├── auth/             # Authentication components
│   ├── cart/             # Cart-related components
│   └── products/         # Product display components
├── lib/                  # Utility libraries
│   └── firebase/         # Firebase configuration and helpers
├── hooks/                # Custom React hooks
├── stores/               # Zustand state stores
├── types/                # TypeScript type definitions
└── public/               # Static assets
```

## 🔐 Authentication System

The platform supports dual authentication:

- **Customer Authentication** - Firestore-based user management
- **Admin Authentication** - Firebase Auth + Firestore admin verification
- **Role-based Access** - Separate interfaces for customers and administrators

## 📊 Admin Features

Access the admin dashboard at `/admin` with proper credentials:

- Product inventory management
- Order processing and tracking
- Customer analytics and insights
- Real-time stock monitoring
- Sales reporting and metrics

## 🛡️ Security

- Firebase security rules for data protection
- Input validation with Zod schemas
- Secure authentication flows
- Admin privilege verification
- Environment variable protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and inquiries, please contact the development team or create an issue in the repository.

---

**Built with ❤️ for sustainable agriculture and plant nutrition**