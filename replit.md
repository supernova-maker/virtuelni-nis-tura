# Virtual Niš - 360° Panorama Business Directory

## Overview

This is a full-stack web application that showcases businesses in Niš, Serbia through a virtual tour experience with 360° panoramas. The application combines a business directory with immersive panoramic views, allowing users to explore local businesses virtually.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a modern full-stack architecture with clear separation between frontend and backend components:

- **Frontend**: React-based SPA with TypeScript
- **Backend**: Express.js REST API with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS with shadcn/ui components
- **Build Tool**: Vite for development and production builds
- **Deployment**: Production-ready with ESBuild bundling

## Key Components

### Frontend Architecture
- **React 18** with TypeScript for type safety
- **Component Library**: shadcn/ui components built on Radix UI primitives
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with CSS variables for theming
- **3D/VR**: A-Frame integration for 360° panorama viewing

### Backend Architecture
- **Express.js** server with TypeScript
- **RESTful API** design with proper error handling
- **Memory Storage**: In-memory data storage for development (with interface for easy database migration)
- **Middleware**: Request logging, JSON parsing, error handling

### Database Schema
Two main entities managed through Drizzle ORM:
- **Businesses**: Contains business information including location coordinates and panorama URLs
- **Panoramas**: Standalone 360° panoramic views with hotspot support

### Data Storage Strategy
**Migrated to PostgreSQL Database**: The application now uses PostgreSQL with Drizzle ORM for persistent data storage. Key features include:

- **PostgreSQL Database**: Production-ready with geographic data support
- **Drizzle ORM**: Type-safe database queries with automatic migration
- **Enhanced Schema**: Extended business and panorama models with additional fields:
  - Business: website URLs, social media links, online ordering, contact emails
  - Panoramas: view counts, public visibility, tagging system
- **Automatic Seeding**: Sample data from Niš businesses automatically loaded on startup
- **Advanced Search**: PostgreSQL full-text search capabilities for business discovery

## Data Flow

1. **User Interaction**: Users interact with React components
2. **API Calls**: TanStack Query manages API requests to Express backend
3. **Data Processing**: Express routes handle business logic and data retrieval
4. **Response**: JSON data returned to frontend for rendering
5. **360° Viewing**: A-Frame renders panoramic images when triggered

### Key API Endpoints
- `GET /api/businesses` - Retrieve all businesses with optional filtering
- `GET /api/businesses/:id` - Get specific business details
- `GET /api/panoramas` - Retrieve panoramic views
- `GET /api/panoramas/:id` - Get specific panorama

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React with extensive Radix UI component library
- **3D/VR**: A-Frame for WebGL-based 360° panorama rendering
- **State Management**: TanStack Query for server state
- **Form Handling**: React Hook Form with Zod validation
- **Utilities**: date-fns for date manipulation, clsx for conditional styling

### Backend Dependencies
- **Database**: Neon serverless PostgreSQL with Drizzle ORM
- **Session Management**: connect-pg-simple for PostgreSQL session storage
- **Validation**: Zod for runtime type checking and validation
- **Development**: tsx for TypeScript execution, ESBuild for production bundling

### Development Tools
- **Build System**: Vite with React plugin and runtime error overlay
- **Type Checking**: TypeScript with strict mode enabled
- **Code Quality**: Path aliases for clean imports
- **Styling**: PostCSS with Tailwind CSS and Autoprefixer

## Deployment Strategy

### Development Environment
- Vite dev server with HMR (Hot Module Replacement)
- Express server with automatic TypeScript compilation
- Replit-specific optimizations with cartographer plugin
- Real-time error reporting and logging

### Production Build
- Frontend: Vite builds optimized React bundle to `dist/public`
- Backend: ESBuild compiles TypeScript server code to `dist/index.js`
- Assets: Static files served from built frontend
- Database: PostgreSQL migrations managed through Drizzle Kit

### Environment Configuration
- **Development**: `npm run dev` - runs TypeScript directly with tsx
- **Production**: `npm run build` && `npm start` - builds and runs compiled JavaScript
- **Database**: `npm run db:push` - applies schema changes to PostgreSQL

The architecture supports easy scaling from development to production while maintaining type safety and developer experience throughout the stack.