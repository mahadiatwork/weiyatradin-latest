# Overview

WeiyaTrading is a B2B e-commerce platform built with Next.js 14 that connects businesses with wholesale manufacturers in China. The application facilitates bulk sourcing and wholesale orders with features for product browsing, dynamic pricing (single vs bulk), shopping cart management, RFQ (Request for Quote) submissions, and checkout processing.

The platform is designed for business buyers looking to source products at scale, offering transparent pricing tiers based on order quantities, minimum order quantity (MOQ) enforcement, and comprehensive product information including shipping details and lead times.

# User Preferences

Preferred communication style: Simple, everyday language.

# Branding & Contact Information

**Company Contact Details**:
- Phone: +86 15138088555
- Email: lizhenhua991121@gmail.com
- Address: No.11, Building 11, Wenzhou Trade City, Fengshou Road, Wangchu Sub-district, Jiaozuo City, Henan Province, China
- Favicon: Globe icon with China highlighted (located at `/public/favicon.ico`)

**Navigation & Header** (Updated September 2025):
- Logo sized at h-10 w-40 (sm: h-12 w-48) for optimal visibility without cramping
- Navigation layout uses flex-1 with justify-start and ml-8 for better spacing
- Navigation visible on md+ breakpoints (tablets and desktop)
- Mobile menu not yet implemented (navigation hidden on screens <768px)

# System Architecture

## Frontend Architecture

**Framework**: Next.js 14 with App Router and React Server Components
- Uses the `/app` directory structure for file-based routing
- Client components marked with `"use client"` directive for interactivity
- Server components by default for improved performance

**UI Component System**: shadcn/ui with Radix UI primitives
- Consistent component library using the "new-york" style variant
- Tailwind CSS for styling with custom OKLCH color system
- Dark mode support built into the design system
- Components are aliased via `@/components` path mapping

**State Management**:
- **Zustand** for global client-side state (shopping cart with persistence)
- **React Context** for feature-specific state (RFQ drawer/form state)
- Local component state using React hooks for UI interactions

**Routing Strategy**:
- Dynamic routes for product pages (`/product/[slug]`)
- Static routes for main pages (catalog, cart, checkout, about, contact)
- Custom 404 and loading states for enhanced UX

## Data Layer

**WooCommerce Integration** (September 2025):
- Connected to WordPress backend at cms.weiyatrading.com
- WooCommerce REST API v3 for product data and order management
- Server-side API routes keep credentials secure
- Custom adapter layer transforms WooCommerce data to Product interface
- Supports bulk pricing tiers, MOQ, and custom product fields via meta_data

**Key Data Models**:
- `Product`: Core product entity with images, pricing tiers, MOQ, shipping details
- `CartItem`: Product instance with quantity and price mode selection
- `PriceTier`: Bulk pricing structure with minimum quantity thresholds
- `RFQFormData`: Quote request submission data

**Pricing Logic** (`/lib/price.ts`):
- Dual pricing modes: single order vs. bulk order
- Dynamic tier calculation based on quantity
- Automatic savings calculation when using bulk pricing
- Smart price mode recommendations based on quantity and MOQ

**Cart Persistence**:
- Zustand with persistence middleware
- LocalStorage-based cart state preservation
- Survives page refreshes and browser sessions

## Key Features & Design Patterns

**Dynamic Pricing System**:
- Toggle between single-unit and bulk pricing modes
- Real-time price calculations based on quantity
- Visual MOQ hints when quantity doesn't meet minimum thresholds
- Tiered bulk pricing that scales with order size

**RFQ (Request for Quote) System**:
- Global drawer component accessible from any product
- Context-based state management for form data
- Pre-populated product information when opened from product pages
- Support for custom requirements, certifications, and Incoterms

**Product Browsing**:
- Category-based filtering
- Price range and MOQ range sliders
- Sort options (relevance, price, MOQ, rating)
- Grid and list view modes
- Search parameter persistence via URL

**Media Handling**:
- Multi-image product galleries with navigation
- Video support (poster images and controls)
- Responsive image loading with Next.js Image optimization
- Priority loading for above-fold images
- Category images loaded from WooCommerce API (category.image.src)
- Fallback Package icon for categories without images
- External images marked as unoptimized for WooCommerce domain compatibility
- Events Gallery component displays company event photos with modern hover effects and modal popup (September 2025)

**Team Information**:
- TeamMemberCard component with professional profiles
- Interactive WeChat QR code popup dialogs (using Radix UI Dialog)
- Direct contact methods (email, phone)
- Displayed on both homepage and about page
- Team members: Chairman (Li Guoping), COO (Md Estihad Faysal), CTO (Md Mahadi Hasan)

## External Dependencies

**Core Framework**:
- Next.js 14.2.16 (React framework with App Router)
- React 18+ (UI library)
- TypeScript (type safety)

**UI & Styling**:
- Tailwind CSS (utility-first styling)
- Radix UI (headless component primitives)
- shadcn/ui (component library)
- Lucide React (icon system)
- class-variance-authority & clsx (conditional styling)
- Geist Font (typography)

**Form Handling**:
- React Hook Form (form state management)
- @hookform/resolvers (form validation)
- Zod (schema validation - implied by resolver usage)

**State Management**:
- Zustand with persistence (cart state)
- Immer (immutable state updates)

**UI Enhancements**:
- embla-carousel-react (image galleries)
- cmdk (command palette/search)
- date-fns (date formatting)
- input-otp (OTP input handling)

**Analytics & Monitoring**:
- @vercel/analytics (visitor tracking and performance monitoring)

**Deployment**:
- Vercel (hosting platform)
- Automatic deployments from v0.app integration

**API Integration Architecture** (Production-Ready, October 2025):
- `/app/api/products` - Fetches and transforms WooCommerce products (supports ?id, ?slug, or list queries)
- `/app/api/categories` - Fetches product categories from WooCommerce
- `/app/api/checkout` - Creates orders in WooCommerce (findOrCreateCustomer + createOrder)
- `/app/api/airwallex/auth` - Authenticates with Airwallex payment gateway
- `/app/api/airwallex/create-payment-intent` - Creates Airwallex PaymentIntent for checkout
- `/lib/wc.ts` - WooCommerce API client with HTTP Basic Auth, includes:
  - `getProduct(id)` - Fetch single product by ID
  - `getProductBySlug(slug)` - Fetch single product by slug using WooCommerce filter
  - `listProducts(params)` - Fetch products with pagination, category, and search filters
  - `listCategories()` - Fetch all product categories
  - `createOrder()` - Create orders in WooCommerce
- `/lib/wc-adapter.ts` - Transforms WooCommerce data to app's Product type, includes categoryId for accurate filtering
- All API routes use Node.js runtime for Buffer support in authentication

**Payment Integration** (October 2025):
- **Airwallex Payment Gateway**: Integrated for secure payment processing
  - Supports Visa, Mastercard, American Express, UnionPay, Alipay, WeChat Pay
  - Ideal for China-based B2B operations with competitive cross-border FX rates
  - SDK: `@airwallex/components-sdk` for embedded card payment elements
  - Checkout flow: PaymentIntent creation → Card element mounting → Payment confirmation → WooCommerce order creation
  - Orders marked as "paid" automatically when credit card payment succeeds
  - Alternative payment methods (bank transfer, letter of credit) create pending orders
  - Environment variable: AIRWALLEX_ENV ('demo' for testing, 'prod' for live)

**Future Enhancements**:
- Email service for order confirmations and RFQ notifications
- Authentication system for B2B user accounts with custom pricing
- Advanced order tracking and shipment management
- Webhook integration for real-time payment status updates