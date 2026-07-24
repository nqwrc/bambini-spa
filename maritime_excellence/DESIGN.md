---
name: Maritime Excellence
colors:
  surface: '#faf9fa'
  surface-dim: '#dbdadb'
  surface-bright: '#faf9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f4'
  surface-container: '#efedee'
  surface-container-high: '#e9e8e9'
  surface-container-highest: '#e3e2e3'
  on-surface: '#1b1c1d'
  on-surface-variant: '#42474f'
  inverse-surface: '#2f3031'
  inverse-on-surface: '#f2f0f1'
  outline: '#727780'
  outline-variant: '#c2c6d0'
  surface-tint: '#326094'
  primary: '#003662'
  on-primary: '#ffffff'
  primary-container: '#1a4d80'
  on-primary-container: '#93bef8'
  inverse-primary: '#a2c9ff'
  secondary: '#546500'
  on-secondary: '#ffffff'
  secondary-container: '#d1f052'
  on-secondary-container: '#5a6c00'
  tertiary: '#343434'
  on-tertiary: '#ffffff'
  tertiary-container: '#4b4b4b'
  on-tertiary-container: '#bbbbbb'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d3e4ff'
  primary-fixed-dim: '#a2c9ff'
  on-primary-fixed: '#001c38'
  on-primary-fixed-variant: '#13487b'
  secondary-fixed: '#d1f052'
  secondary-fixed-dim: '#b6d337'
  on-secondary-fixed: '#181e00'
  on-secondary-fixed-variant: '#3f4c00'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c6'
  on-tertiary-fixed: '#1b1b1b'
  on-tertiary-fixed-variant: '#474747'
  background: '#faf9fa'
  on-background: '#1b1c1d'
  surface-variant: '#e3e2e3'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-tablet: 32px
  margin-mobile: 20px
---

## Brand & Style

This design system embodies the prestige and logistical precision of high-end maritime operations. It is designed to project a sense of unwavering reliability, heritage, and modern engineering prowess. The aesthetic is **Minimalist-Corporate**, characterized by expansive white space, rigorous structural alignment, and a high-contrast palette that ensures clarity in complex offshore data environments.

The visual narrative avoids unnecessary ornamentation, focusing instead on "functional luxury"—where quality is signaled through perfect typography, generous margins, and a palette that mirrors the deep ocean and sustainable innovation. The target audience includes executive stakeholders in energy, logistics, and vessel engineering who demand efficiency and professionalism.

## Colors

The palette is anchored by **Deep Navy (#1A4D80)**, representing the stability and authority of the maritime industry. This is complemented by **Brand Green (#9CB819)** for progress and **Absolute Black (#000000)** for grounding technical precision.

- **Primary (Deep Navy):** Used for headers, primary navigation, and core branding elements.
- **Secondary (Brand Green):** Reserved for CTAs, success states, and key navigational highlights.
- **Tertiary (Absolute Black):** Used for high-contrast accents, technical boundaries, and deep-level grounding of UI components.
- **Neutral (Slate Gray):** Used for primary body text and iconography to ensure high legibility against white backgrounds.

Backgrounds should primarily remain **White (#FFFFFF)** to maintain the high-end minimalist aesthetic, with **Offshore White** used sparingly for subtle section differentiation.

## Typography

This design system utilizes a dual-typeface strategy to balance corporate prestige with technical utility. 

**Montserrat** is the display face, used for headlines and titles. Its geometric construction provides a modern, architectural feel. For body copy and data-dense interfaces, **Inter** is employed for its exceptional legibility and neutral tone. 

- **Hierarchy:** Use heavy weights (600-700) for Montserrat to establish a strong visual anchor.
- **Micro-copy:** Labels and captions use Inter with increased letter spacing and uppercase styling to evoke engineering specifications.
- **Scaling:** On mobile, display sizes are reduced significantly to maintain a "zero clutter" appearance.

## Layout & Spacing

The layout philosophy follows a **Fixed Grid** model on desktop to maintain the "prestigious" feel of a controlled, editorial-style composition.

- **Grid:** A 12-column grid with a maximum container width of 1280px.
- **Rhythm:** An 8px base unit governs all padding and margins. 
- **White Space:** High-end appeal is achieved through "oversized" vertical margins (80px+ between sections) to ensure the interface never feels crowded, even when displaying complex logistics data.
- **Responsive Behavior:** On mobile, margins tighten to 20px, and content stacks vertically, maintaining a single-column focus to preserve clarity.

## Elevation & Depth

This design system avoids heavy shadows, instead using **Tonal Layers** and **Low-Contrast Outlines** to define hierarchy.

- **Surface Strategy:** Content lives on a pure white base. Secondary information (like sidebars or data panels) is placed on a light gray (#F8F9FA) surface.
- **Borders:** Subtle, 1px solid borders in a light neutral tone are used to define cards and input fields.
- **Interaction:** Shadows are used only on hovering elements (e.g., a card hover) and should be extremely subtle: `0 4px 12px rgba(26, 77, 128, 0.08)`. This "tinted shadow" keeps the elevation feeling connected to the primary brand color.

## Shapes

To reflect the industrial and engineering nature of the maritime business, the shape language is **Soft (0.25rem)**. 

- **Standard Elements:** Buttons, input fields, and tags use a 4px corner radius. This provides a professional, "machined" look that is cleaner than sharp corners but more serious than fully rounded shapes.
- **Feature Cards:** Larger components use an 8px (0.5rem) radius to provide a modern, high-end container feel without appearing "bubbly."

## Components

- **Buttons:** Primary CTAs use a solid **Brand Green** fill with white text for maximum visibility. Secondary buttons use a **Deep Navy** outline with a 1px weight. All buttons have a minimum height of 48px to ensure a premium, tactile feel.
- **Input Fields:** Use a white background with a 1px border. On focus, the border transitions to Deep Navy with a 1px inset glow.
- **Chips/Status:** Use muted background tints of the status color (e.g., light green background for "In Transit") with high-contrast bold text in the primary color.
- **Cards:** Cards are used for vessel profiles and logistics summaries. They feature no shadow by default, instead using a 1px border. On hover, the border darkens, and a subtle Deep Navy tint shadow appears.
- **Data Tables:** High-density logistics data uses Inter at 14px with "Zebra" striping in Offshore White to maintain readability without adding visual noise.
- **Vessel Profile Component:** A specialized card layout featuring a large Montserrat headline and a technical grid of Inter labels for ship specifications (DWT, LOA, Power).