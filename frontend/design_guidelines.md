# Design Guidelines for Asset Management Platform

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern financial platforms like Linear (for clean UI), Notion (for data organization), and professional dashboards. This utility-focused application prioritizes clarity, efficiency, and trust.

## Core Design Principles
- **Professional Trust**: Clean, corporate aesthetic that conveys financial reliability
- **Data Clarity**: Information hierarchy that makes complex financial data scannable
- **Efficient Workflows**: Minimal cognitive load for frequent CRUD operations

## Color Palette

### Primary Colors
- **Primary**: 213 94% 68% (Professional blue for CTAs and primary actions)
- **Primary Dark**: 213 84% 58% (Darker variant for hover states)

### Neutral Colors
- **Background Light**: 0 0% 98% (Off-white for main backgrounds)
- **Background Dark**: 222 84% 5% (Dark mode primary background)
- **Surface Light**: 0 0% 100% (Card and component backgrounds)
- **Surface Dark**: 217 33% 17% (Dark mode card backgrounds)
- **Border**: 214 32% 91% (Light mode borders)
- **Border Dark**: 217 33% 24% (Dark mode borders)

### Status Colors
- **Success**: 142 71% 45% (Green for positive values, success states)
- **Error**: 0 84% 60% (Red for negative values, errors)
- **Warning**: 38 92% 50% (Amber for pending states)
- **Muted Text**: 215 16% 47% (Secondary text color)

## Typography
- **Primary Font**: Inter (via Google Fonts CDN)
- **Headings**: Font weights 600-700, sizes from text-lg to text-3xl
- **Body Text**: Font weight 400-500, primarily text-sm and text-base
- **Data/Numbers**: Font weight 600 for emphasis, monospace for aligned data

## Layout System
**Tailwind Spacing Units**: Primarily using 2, 4, 6, 8, 12, 16 for consistent rhythm
- **Micro spacing**: p-2, m-2 (8px) for tight elements
- **Standard spacing**: p-4, m-4 (16px) for general component padding
- **Section spacing**: p-6, m-6 (24px) for card interiors
- **Layout spacing**: p-8, m-8 (32px) for major layout sections

## Component Library

### Navigation
- **Sidebar**: Fixed width (240px), collapsible on mobile
- **Header**: Clean with user avatar, notifications, minimal branding
- **Breadcrumbs**: Subtle navigation aids for deep pages

### Data Display
- **Tables**: Zebra striping, sortable headers, inline actions
- **Cards**: Subtle shadows, rounded corners (rounded-lg)
- **Summary Cards**: Large numbers, trend indicators, icon support

### Forms
- **Input Fields**: Clean borders, clear focus states, proper spacing
- **Buttons**: Primary (solid), Secondary (outline), Ghost for table actions
- **Validation**: Inline error messages, success states

### Feedback
- **Toasts**: Corner positioning, auto-dismiss, status color coding
- **Loading States**: Skeleton components for tables and cards
- **Empty States**: Helpful illustrations with action suggestions

## Page-Specific Guidelines

### Login Page
- **Layout**: Centered card on neutral background
- **Styling**: Minimal, professional, subtle company branding
- **Focus**: Clear form validation, loading states

### Dashboard
- **Grid Layout**: 2-3 column responsive grid for summary cards
- **Hierarchy**: Large numbers for key metrics, supporting charts
- **Navigation**: Quick access tiles to main sections

### CRUD Pages (Clients/Assets/Movements)
- **Table-First**: Primary data in clean, sortable tables
- **Actions**: Consistent button placement, clear icons
- **Filters**: Collapsible filter panel, clear active state indicators
- **Pagination**: Standard controls with count information

### Forms & Modals
- **Layout**: Single column, logical field grouping
- **Validation**: Real-time feedback, clear error messages
- **Actions**: Primary/cancel button pairing, consistent placement

## Responsive Behavior
- **Desktop**: Full sidebar, multi-column layouts
- **Tablet**: Collapsible sidebar, stacked cards
- **Mobile**: Hidden sidebar with hamburger menu, single column tables with horizontal scroll

## Dark Mode Implementation
- Consistent theme switching across all components
- Maintain color contrast ratios for accessibility
- Ensure form inputs and data tables remain highly readable

This design system prioritizes functionality and trust while maintaining modern aesthetics appropriate for a professional financial management platform.