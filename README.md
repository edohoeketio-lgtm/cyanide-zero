# CYAN_0 (Cyanide Zero)

## Conception & Background
The idea for **CYAN_0** was born out of an exploration of the BKKDW26 *Coffee Ground Zero* site, an interactive digital exhibition highlighting massive coffee waste in Bangkok and how to upcycle it. The goal was to create an African equivalent with the same raw, sustainable, and high-impact narrative.

We explored the most pressing organic waste issues in West Africa and settled on **Cassava Peels in Nigeria**. Nigeria produces over 14 million tons of toxic cassava peels annually, which are often dumped near processing mills, releasing methane and leaching hydrocyanic acid (cyanide) into local water tables.

## The Brand Evolution
Initially drafted as "Cassava Ground Zero," the name felt too derivative. We needed a brutalist, industrial name that sounded like a premium editorial or architectural intervention. 

We explored concepts like *Garri_Grid*, *Toxic Yield*, and *Project Prussic*, but ultimately the user selected **Cyanide Zero (CYAN_0)**. It perfectly captures the core mission: taking a lethal agricultural byproduct (cyanide) and transforming it into a high-energy urban resource. Zero toxicity, zero waste.

## The Strategy & Copy

**Tagline:** Toxic Waste to Urban Resource.
**Vibe:** Gritty but premium, brutalist but elegant. Industrial intervention rather than a soft "eco-friendly" campaign.

**Visual Identity System:**
*   **Background:** Deep Asphalt (`#0A0A0A`)
*   **Text:** Bone / Cassava Flesh (`#F4F4F0`)
*   **Accent:** Toxic Cyanide Orange (`#D9480F`)
*   **Typography:** Space Grotesk (Headers), Inter (Body), JetBrains Mono (Technical Details).

## The UX Structure & Architecture
The one-page digital exhibition was built as a Vanilla HTML/JS component in the main portfolio, powered by a localized Tailwind CDN and GSAP ScrollTrigger. The scroll journey is divided into 5 interactive zones:

### 01. The Hero Reveal
A stark `#0A0A0A` block with an SVG noise filter. As the user scrolls, the massive `CYAN_0` text parallax-scrolls away, fading in the core problem statement: *"Nigeria produces over 14,000,000 tons of cassava peel waste each year. Left to rot, it releases methane and leaches cyanide into our groundwater..."*

### 02. The Toxic Toll (Sticky Section)
The left side "THE TOXIC TOLL" pins to the viewport. As the user scrolls vertically, the right side smoothly crossfades through 3 distinct problem cards:
1. **Cyanide Runoff:** Sterilizing the soil.
2. **Methane Threat:** Greenhouse emissions.
3. **Hidden Potential:** High-energy biomass.

### 03. The Blueprint (Horizontal Scroll)
A horizontal timeline that hijacks the vertical scroll. It walks the user through the 4-step upcycle cycle:
1. **Gather** from Garri processing hubs.
2. **Extract** (Grate & Press) to remove the acid.
3. **Neutralize** via sealed fermentation.
4. **Upcycle** into sun-dried High-Quality Cassava Peel (HQCP).

### 04. Beyond The Peel (Bento Grid)
A sleek CSS Grid showcasing the 4 major industrial outputs fueled by the waste:
*   HQCP Livestock Feed
*   Bio-Ethanol (Clean Cooking Fuel)
*   Pressed Fiber (Biodegradable Packaging)
*   Mushroom Substrate

### 05. The Map CTA
A monochromatic footer featuring a glowing, pulsing UI that represents a data map of Garri processing hubs in Lagos, inviting users to find a drop-off hub.

## Tech Stack
*   **Framework:** Vanilla HTML
*   **Styling:** Tailwind CSS (via CDN for local isolation)
*   **Animations:** GSAP & ScrollTrigger
*   **Integration:** Linked seamlessly into the main Vite-powered portfolio architecture.
