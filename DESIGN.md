---
version: alpha
name: Aura Field Notes
description: Design system for AURA TRAVEL, a boutique travel agency site. Luxury travel editorial with the nerve of an award winning digital product.

colors:
  primary: "#21392C"
  secondary: "#57534B"
  tertiary: "#FA5D29"
  tertiary-deep: "#A8340A"
  highlight: "#FFF083"
  neutral: "#E4DFD3"
  surface: "#EFECE6"
  on-surface: "#171614"
  border: "#CDC7B9"
  inverse: "#111110"
  error: "#8A2B20"
  aura-japan: "#E0432A"
  aura-bali: "#6F9A3E"
  aura-italy: "#E0A92B"
  aura-palawan: "#1F9AA0"

typography:
  display:
    fontFamily: Newsreader
    fontSize: 96px
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Newsreader
    fontSize: 60px
    fontWeight: 400
    lineHeight: 1
    letterSpacing: -0.03em
  headline-md:
    fontFamily: Newsreader
    fontSize: 36px
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Newsreader
    fontSize: 24px
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: -0.015em
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.45
  label-caps:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: 0.14em
  button:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0.01em

rounded:
  none: 0px
  xs: 2px
  md: 6px
  full: 9999px

spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 32px
  xl: 64px
  xxl: 96px

components:
  page:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
  nav:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-caps}"
    padding: "{spacing.md}"
  hero:
    backgroundColor: "{colors.inverse}"
    textColor: "{colors.surface}"
    typography: "{typography.display}"
    padding: "{spacing.xl}"
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-surface}"
    typography: "{typography.button}"
    rounded: "{rounded.xs}"
    padding: "{spacing.md}"
  button-primary-hover:
    backgroundColor: "{colors.on-surface}"
    textColor: "{colors.surface}"
  button-dark:
    backgroundColor: "{colors.inverse}"
    textColor: "{colors.surface}"
    typography: "{typography.button}"
    rounded: "{rounded.xs}"
    padding: "{spacing.md}"
  button-secondary:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
    typography: "{typography.button}"
    rounded: "{rounded.xs}"
    padding: "{spacing.md}"
  mark:
    backgroundColor: "{colors.highlight}"
    textColor: "{colors.on-surface}"
    typography: "{typography.headline-lg}"
  link-accent:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.tertiary-deep}"
    typography: "{typography.label-caps}"
  card:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
  card-meta:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.secondary}"
    typography: "{typography.body-sm}"
  chip:
    backgroundColor: "{colors.border}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.full}"
    padding: "{spacing.sm}"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xs}"
    padding: "{spacing.md}"
  input-error:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.error}"
    typography: "{typography.body-sm}"
  band-forest:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    typography: "{typography.headline-lg}"
    padding: "{spacing.xxl}"
  band-signal:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-surface}"
    typography: "{typography.display}"
    padding: "{spacing.xxl}"
  aura-japan:
    backgroundColor: "{colors.aura-japan}"
    size: 10px
  aura-bali:
    backgroundColor: "{colors.aura-bali}"
    size: 10px
  aura-italy:
    backgroundColor: "{colors.aura-italy}"
    size: 10px
  aura-palawan:
    backgroundColor: "{colors.aura-palawan}"
    size: 10px
---

# Aura Field Notes

## Overview

AURA TRAVEL is a boutique travel consultancy, not a booking engine. The register is **luxury travel editorial with the nerve of an award winning digital product**: full bleed photography, a big serif that speaks in full sentences, a quiet sans for everything functional, and a hot signal orange for the moments where the visitor is asked to act.

The colour direction was taken from Awwwards itself: near black ink, a pale butter highlight, and a vivid orange red. Those three are set against the restrained travel base from the brief (paper, sand, stone, charcoal, forest green). The result is calm most of the time and loud in exactly three places: the action button, the highlighted word, and the closing band.

The core idea is the **aura**: the quality of light in a place. It shows up in three ways, and all three should survive any change:

1. **The halo.** A thin ring with one point of light on its edge is the brand mark. It reappears, cropped, in the hero, page headers, and the closing band.
2. **Signature light per destination.** Japan has vermilion, Bali a paddy green, Italy lemon gold, Palawan lagoon teal. They appear only as a small dot beside a destination name, in the marquee, and as the live dot in the hero caption. They never fill a surface.
3. **Field notes.** Coordinates, index numerals (01, 02), day numerals, and small uppercase labels give the site the feel of an annotated journal.

It gives up density and dark mode. It is light by default, with charcoal, forest, and orange bands used as punctuation.

When a case is not covered, ask what a printed travel magazine would do: quiet type, hairline rules, one loud photograph, one highlighted word.

## Colors

- **Surface (#EFECE6):** paper, the page. Replaces pure white everywhere.
- **On-surface (#171614):** warm near black ink for text, and the label color on orange.
- **Inverse (#111110):** charcoal, for the hero, tagline, footer, and menu. Carries a fine film grain.
- **Neutral (#E4DFD3):** sand, the fill for raised sections, cards, and secondary buttons.
- **Border (#CDC7B9):** stone, for hairlines, dividers, and chips.
- **Primary (#21392C):** natural forest green, for the itinerary band and quiet contrast.
- **Secondary (#57534B):** umber, for muted text and metadata.
- **Tertiary (#FA5D29):** signal orange. Fills only: primary buttons, the scroll progress line, the closing band, and text on dark surfaces. Ink text sits on it (5.8:1). Never used as small text on light surfaces.
- **Tertiary deep (#A8340A):** the same hue darkened to pass 4.5:1 for small text and numerals on paper and sand.
- **Highlight (#FFF083):** butter. A flat block behind one key word per view, the marquee band, and hover states. Text on it is always ink.
- **Error (#8A2B20):** brick, from the accent family.
- **Aura colors:** decorative dots only; never used for text.

On forest green, small labels use butter rather than orange, which fails contrast there.

## Typography

Two faces that differ by classification, both open source and served through next/font.

- **Newsreader** carries the voice: headlines, index numerals, and pull quotes. Weight 400, optical sizing on, never italic.
- **Hanken Grotesk** carries the apparatus: navigation, labels, buttons, prices, dates, forms, and body copy. Weights 400 and 700 only.

Sizes resolve to Tailwind's scale. Display is 48px on phones and up to 96px on large screens with −0.04em tracking and 0.95 line height. Small uppercase labels open to +0.14em. Headings use `text-wrap: balance` and paragraphs `text-wrap: pretty`. Body measure is capped near 680px. Copy uses sentence case, has no hyphens inside sentences, and never centers long paragraphs. The one exception to the type scale is the decorative ghost wordmark in the footer, which is `aria-hidden`.

## Layout

A 1280px container with 24px side padding on phones and 40px from tablet up. Spacing uses the approved steps only and section padding is 96 to 128px.

The layout is **asymmetric by commitment**: 7/5 splits, a sticky left column beside a long right column, images that break the grid, and one horizontal rail of journeys. Text is flush left. On phones everything collapses to one column and the rail becomes a swipe strip with a visible peek of the next card.

## Elevation & Depth

Flat. Hierarchy comes from the step from paper to sand, hairlines in stone, and space. No drop shadows on cards, buttons, or images. Images carry a 1px translucent outline. The only floating element is the slim plan bar on detail pages, which is solid charcoal.

No glassmorphism and no gradients on backgrounds. Depth on dark bands comes from a fine film grain (a tiled noise texture at 9% opacity).

## Shapes

Print derived and hierarchical, never uniform. Buttons and inputs are 2px; cards and frames are 6px only where a frame is needed; editorial photography is square cornered; chips, avatars, and circular controls are fully round. Borders are 1px and go all the way around a shape or not at all.

## Components and motion

- **Header:** wordmark left (the mark rotates on hover), uppercase links, one orange action right. It is transparent over the hero, solid once scrolled, hides on the way down and returns on the way up. The current page gets an orange dot. On phones it becomes a solid charcoal sheet with numbered serif links that rise in from a mask.
- **Hero:** a full height slideshow of four destinations with a flat 50% scrim, a butter highlight on "journey", staggered entrance, thumbnails with a timer line, and a pause control. Autoplay is off for reduced motion.
- **Marquee:** a butter band of destination names with their aura dots. It pauses on hover and stops for reduced motion.
- **Destination panels:** four photographs as expanding strips. Hover or focus opens one. On phones they stack.
- **Journey rail:** horizontal snap scroller with arrows and a progress line.
- **Buttons:** a solid fill wipes across on hover; press scales to 0.96. One orange button per view area.
- **Cursor:** on fine pointers a ring trails the mouse and becomes a butter "View" chip over cards. The system cursor stays.
- **Reveal:** section content rises 48px and fades in over 900ms with `cubic-bezier(0.32, 0.72, 0, 1)`. Photographs open like a curtain. Nothing else animates on scroll.
- **Scroll progress:** a 3px orange line along the top, driven by a CSS scroll timeline.
- **Tagline reveal:** one large statement whose words rise from 30% to full opacity as they cross a line near the bottom of the viewport.
- **Sticky plan bar:** appears on destination and trip pages after the hero and leaves before the closing band.
- **Questionnaire:** one question per step, large tappable tiles, a thin progress line, a sticky action bar on phones, and a review step with edit links.

Everything animated respects `prefers-reduced-motion`.

## Do's and Don'ts

- Do keep orange to fills and to text on dark. Use tertiary deep for orange text on light surfaces.
- Do use the butter highlight on one word per view, never on whole sentences.
- Do keep aura colors to dots.
- Do let photographs run large, credit them on the credits page, and check text over them for 4.5:1 (the scrim is part of the design).
- Do set prices, dates, and coordinates with tabular figures.
- Don't use #FFFFFF or #000000, a second accent, background gradients, glassmorphism, italics, or shadows on cards.
- Don't use Inter, Poppins, Playfair Display, or a centered hero with a three column icon grid.
- Don't say "book now". The conversion is "Plan your trip", and every request is labeled a travel request, not a booking.
- Don't invent claims about real hotels or guarantees. Content is fictional and prices are illustrative.
