# HGGOP Church Website - Design Guidelines

## Design Approach

**Selected Approach:** Design System with Community Organization Inspiration

**Justification:** Church websites require clarity, accessibility, and trust. The site must efficiently present service schedules, news, and community information while maintaining a welcoming, professional appearance. Drawing from modern community organization patterns while maintaining systematic consistency.

**Key Design Principles:**
- Clarity and readability above all
- Warm professionalism that balances tradition with modernity
- Accessible information architecture
- Trust through consistent, clean design
- Community-focused visual language

## Core Design Elements

### A. Color Palette

**Primary Colors:**
- Primary: 25 45% 35% (Deep forest green - representing growth, community, stability)
- Primary Light: 25 40% 50%
- Primary Dark: 25 50% 25%

**Neutral Colors:**
- Background Light: 0 0% 98%
- Background: 0 0% 100%
- Surface: 25 20% 95%
- Text Primary: 0 0% 15%
- Text Secondary: 0 0% 45%
- Border: 0 0% 88%

**Accent Colors (use sparingly):**
- Accent: 35 85% 50% (Warm amber for call-to-action elements only)
- Success: 142 71% 45%
- Info: 210 100% 50%

### B. Typography

**Font Families:**
- Headings: 'Inter', system-ui, sans-serif (weights: 600, 700)
- Body: 'Inter', system-ui, sans-serif (weights: 400, 500)
- Special/Quotes: 'Merriweather', Georgia, serif (weight: 400, italic for quotes)

**Type Scale:**
- Hero/H1: text-4xl md:text-5xl lg:text-6xl (font-bold)
- H2: text-3xl md:text-4xl (font-semibold)
- H3: text-2xl md:text-3xl (font-semibold)
- H4: text-xl md:text-2xl (font-semibold)
- Body Large: text-lg (font-normal)
- Body: text-base (font-normal)
- Body Small: text-sm (font-normal)
- Caption: text-xs (font-medium)

### C. Layout System

**Spacing Primitives:** Use Tailwind units of 4, 6, 8, 12, 16, 20, 24
- Component spacing: p-6, p-8
- Section spacing: py-12, py-16, py-20
- Grid gaps: gap-6, gap-8
- Element margins: mb-4, mb-6, mb-8

**Container Widths:**
- Full-width sections: w-full with max-w-7xl mx-auto px-6
- Content sections: max-w-4xl
- Text content: max-w-prose

**Grid System:**
- Service schedule: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- News cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Contact info: grid-cols-1 md:grid-cols-2

### D. Component Library

**Navigation:**
- Clean horizontal nav with primary links
- Dropdown menus for "About" section (council, youth, etc.)
- Mobile: hamburger menu with full-screen overlay
- Sticky header on scroll with subtle shadow

**Hero Section:**
- Large hero image of church building or community
- Overlay with church name and welcoming tagline
- Current service times prominently displayed
- CTA buttons: "Watch Live" (primary), "Visit Us" (outline on image with backdrop-blur)

**Service Schedule Cards:**
- Card-based layout with date, time, preacher
- Visual indicator for current/upcoming service
- Special occasion badges
- Border-l-4 accent for highlighted items

**News/Announcement Cards:**
- Image thumbnail (if available)
- Date badge (top-right corner, small)
- Title, excerpt, read more link
- Hover: subtle lift with shadow

**Contact Section:**
- Two-column layout: contact info + location/map reference
- Icon + text format for email, phone, address
- Office hours clearly listed

**Footer:**
- Multi-column: About, Quick Links, Contact, Social
- Copyright, Privacy Policy, ANBI status links
- Newsletter signup (simple email input + button)

### E. Special Elements

**Quote/Scripture Blocks:**
- Use Merriweather italic
- Left border accent (border-l-4)
- Light background (bg-surface)
- Generous padding (p-8)

**Event/Activity Listings:**
- Timeline-style layout with date markers
- Clean separation between items
- Category tags for type of activity

**Photo Galleries:**
- Masonry or grid layout
- Lightbox on click
- Caption overlay on hover

## Images

**Hero Image:**
- Large, high-quality photograph of the church building (exterior with tower) or congregation gathering
- Warm, welcoming lighting (golden hour preferred)
- Dimensions: 1920x800px minimum
- Overlay: Dark gradient (from bottom) for text readability
- Placement: Top of homepage, full viewport width

**Additional Images:**
- News thumbnails: 400x300px (3:2 ratio)
- Event photos: Various sizes for gallery
- Community activity photos: Candid, warm, inclusive shots
- About page: Historical church photos, current leadership portraits

**Image Treatment:**
- Subtle rounded corners (rounded-lg) for cards
- No rounded corners for full-width images
- Lazy loading for performance
- Alt text for all images (accessibility)

## Accessibility & Dark Mode

- Maintain consistent dark mode with warm, muted tones
- Dark background: 25 15% 12%
- Dark surface: 25 12% 18%
- Ensure WCAG AA contrast ratios minimum
- Focus states: ring-2 ring-primary ring-offset-2
- Keyboard navigation fully supported