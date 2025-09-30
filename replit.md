# Overview

WeiyaTrading is a B2B e-commerce platform built with Next.js 14 that connects businesses with wholesale manufacturers in China. The application facilitates bulk sourcing and wholesale orders with features for product browsing, dynamic pricing (single vs bulk), shopping cart management, RFQ (Request for Quote) submissions, and checkout processing.

The platform is designed for business buyers looking to source products at scale, offering transparent pricing tiers based on order quantities, minimum order quantity (MOQ) enforcement, and comprehensive product information including shipping details and lead times.

# User Preferences

Preferred communication style: Simple, everyday language.

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

**API Integration Architecture**:
- `/app/api/products` - Fetches and transforms WooCommerce products
- `/app/api/categories` - Fetches product categories from WooCommerce
- `/app/api/checkout` - Creates orders in WooCommerce (findOrCreateCustomer + createOrder)
- `/lib/wc.ts` - WooCommerce API client with HTTP Basic Auth
- `/lib/wc-adapter.ts` - Transforms WooCommerce data to app's Product type

**Future Enhancements**:
- Payment gateway integration (Stripe/PayPal) for set_paid orders
- Email service for order confirmations and RFQ notifications
- Authentication system for B2B user accounts with custom pricing
- Advanced order tracking and shipment management