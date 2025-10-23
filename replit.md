# HGGOP Church Website

## Overview

This is a church website for Hervormde Gemeente Giessen-Oudekerk en Peursum (HGGOP), a Dutch Reformed church community. The application provides service schedules, news updates, event calendars, and community information to congregation members and visitors. Built as a full-stack TypeScript application with React frontend and Express backend, it emphasizes accessibility, clarity, and warm professionalism.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18 with TypeScript for type-safe component development
- Vite for fast development and optimized production builds
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management and caching

**UI Framework:**
- Shadcn/ui component library with Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- Framer Motion for smooth animations and transitions

**Design System:**
- Monochromatic color scheme with neutral grays and deep forest green primary color
- Custom HSL-based theming system supporting light mode
- Inter font family for headings and body text, Merriweather for special content
- Responsive design with mobile-first approach

**State Management:**
- React Query handles all server state with automatic caching and refetching
- Local component state via React hooks
- No global client-side state management needed due to server-driven architecture

**Key Pages:**
- Home: Hero section with service times, upcoming services, latest news
- Services (Diensten): Full service schedule organized by month
- Events (Evenementen): Google Calendar integration for community events
- News (Nieuws): Articles and announcements
- About (Over Ons): Church identity, council members, organizational structure
- Contact: Location and contact information
- Privacy & ANBI: Legal and transparency information

### Backend Architecture

**Technology Stack:**
- Node.js with Express for HTTP server
- TypeScript for type safety across the stack
- Drizzle ORM for database interactions
- PostgreSQL via Neon serverless driver

**API Design:**
- RESTful endpoints under `/api` prefix
- JSON request/response format
- Credential-based sessions (though authentication not yet implemented)

**Key Routes:**
- `/api/services` - Church service schedules (GET all, GET upcoming, POST create)
- `/api/news` - News articles (GET all, GET latest, POST create)
- `/api/council` - Council member information (GET all, POST create)
- `/api/calendar/events` - Google Calendar integration for events

**Data Models:**
- Services: date, time, preacher, location, special notes
- News: title, excerpt, content, date, imageUrl, featured flag
- Council Members: name, role, email, phone, category, sort order

### Database Architecture

**Database Provider:**
- PostgreSQL database via Neon serverless
- Drizzle ORM for schema definition and type-safe queries
- UUID primary keys with `gen_random_uuid()` default

**Schema Design:**
- Three main tables: services, news, council_members
- Text fields for flexible content storage
- Timestamp fields for date tracking
- Integer fields for sorting and feature flags
- No relationships defined (denormalized design for simplicity)

**Migration Strategy:**
- Drizzle Kit for schema migrations
- Schema defined in `/shared/schema.ts` for sharing between frontend and backend
- Zod schemas generated from Drizzle tables for runtime validation

### External Dependencies

**Google Calendar Integration:**
- OAuth2 authentication via Replit Connectors API
- googleapis library for Calendar API v3
- Access token management with automatic refresh
- Fetches upcoming events for church calendar display
- Environment-based connector configuration

**Replit Platform Services:**
- Replit Connectors for Google Calendar OAuth
- Replit identity tokens for authentication
- Development plugins: cartographer, dev banner, runtime error overlay

**Key Libraries:**
- React Hook Form with Zod resolvers for form validation
- date-fns for date formatting and manipulation (Dutch locale support)
- Radix UI for accessible component primitives
- Lucide React for icon system
- embla-carousel for image carousels

**Build & Development:**
- TypeScript compiler for type checking
- ESBuild for server bundling
- Vite for client bundling and HMR
- PostCSS with Tailwind and Autoprefixer

**Session Management:**
- connect-pg-simple for PostgreSQL session storage (configured but authentication not implemented)

**Environment Requirements:**
- `DATABASE_URL` - PostgreSQL connection string (Neon)
- `REPLIT_CONNECTORS_HOSTNAME` - For Google Calendar connector
- `REPL_IDENTITY` or `WEB_REPL_RENEWAL` - For Replit authentication
- `NODE_ENV` - Development/production mode