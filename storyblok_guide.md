# Vantara Heritage - Storyblok CMS Integration Guide

This guide details how to transition this premium Next.js website to **Storyblok CMS** in the future. The frontend React components we built are fully decoupled and styled as independent blocks, meaning they are ready to be wired to Storyblok data fields instantly.

---

## Step 1: Install Dependencies
First, ensure you have the official Storyblok React SDK installed (we already installed this in the repository workspace):
```bash
npm install @storyblok/react --legacy-peer-deps
```

---

## Step 2: Configure Environment Variables
Create a `.env.local` file in the root of your project and paste your Storyblok API access token:
```env
NEXT_PUBLIC_STORYBLOK_TOKEN=your_preview_token_here
```

---

## Step 3: Create Component Schemas in Storyblok
Login to your Storyblok Dashboard, navigate to **Block Library** (Components), and create the following schemas. Match the field names exactly so they map directly to our React props:

### 1. `page` (Content Type)
*   **body**: Block (Nested blocks - allows drag-and-drop ordering of other sections)

### 2. `hero` (Nested Block)
*   **title**: Text
*   **subtitle**: Text
*   **locationText**: Text
*   **startingPrice**: Text
*   **paymentPlanText**: Text
*   **formTitle**: Text
*   **formSubtitle**: Text
*   **bulletOffers**: Multi-Text (Array of features)
*   **bgImages**: Multi-Asset (Images)

### 3. `overview` (Nested Block)
*   **tagline**: Text
*   **title**: Text
*   **subtitle**: Text
*   **descriptionParagraphs**: Multi-Text
*   **keyFeaturesTitle**: Text
*   **keyFeaturesList**: Multi-Text
*   **spiritualityTitle**: Text
*   **spiritualityDescription**: Text
*   **spiritualityPoints**: Multi-Text
*   **investmentTitle**: Text
*   **investmentDescription**: Text
*   **investmentPoints**: Table or Multi-Block (with columns `title` and `text`)

### 4. `price_list` (Nested Block)
*   **tagline**: Text
*   **title**: Text
*   **items**: Multi-Block (Nested items of type `price_item`)
    *   *price_item* fields: `typology` (Text), `size` (Text), `type` (Text), `priceText` (Text)

### 5. `highlights` (Nested Block)
*   **tagline**: Text
*   **title**: Text
*   **items**: Multi-Block (Nested items of type `highlight_item`)
    *   *highlight_item* fields: `id` (Text/Number), `text` (Text)

### 6. `amenities` (Nested Block)
*   **tagline**: Text
*   **title**: Text
*   **items**: Multi-Block (Nested items of type `amenity_item`)
    *   *amenity_item* fields: `title` (Text), `iconType` (Text - matching 'clubhouse', 'pool', 'gym', etc.)

### 7. `master_plan` (Nested Block)
*   **tagline**: Text
*   **title**: Text
*   **imageSrc**: Asset (Image)
*   **altText**: Text

### 8. `location` (Nested Block)
*   **tagline**: Text
*   **title**: Text
*   **mapIframeUrl**: Text
*   **distances**: Multi-Block (Nested items of type `distance_item`)
    *   *distance_item* fields: `place` (Text), `distance` (Text)

### 9. `gallery` (Nested Block)
*   **tagline**: Text
*   **title**: Text
*   **images**: Multi-Asset (Images)
*   **newsTitle**: Text
*   **newsSubtitle**: Text
*   **newsItems**: Multi-Block (Nested items of type `news_item`)
    *   *news_item* fields: `src` (Asset), `alt` (Text), `title` (Text)

---

## Step 4: Add Storyblok Integration Files in Code

Here is the helper code that will connect your Next.js project to Storyblok. You can activate these files when you are ready.

### 1. The Storyblok Provider (`src/components/StoryblokProvider.tsx`)
Create this file to hook the components to the Storyblok SDK:
```typescript
"use client";

import { storyblokInit, apiPlugin } from "@storyblok/react";
import Hero from "./Hero";
import Overview from "./Overview";
import PriceList from "./PriceList";
import Highlights from "./Highlights";
import Amenities from "./Amenities";
import MasterPlan from "./MasterPlan";
import BrochureCTA from "./BrochureCTA";
import LocationAdvantage from "./LocationAdvantage";
import Gallery from "./Gallery";
import ContactForm from "./ContactForm";

// Register all modular blocks in Storyblok
const components = {
  hero: Hero,
  overview: Overview,
  price_list: PriceList,
  highlights: Highlights,
  amenities: Amenities,
  master_plan: MasterPlan,
  brochure_cta: BrochureCTA,
  location_advantage: LocationAdvantage,
  gallery: Gallery,
  contact_form: ContactForm,
};

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  use: [apiPlugin],
  components,
});

export default function StoryblokProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

### 2. The Dynamic Page Loader (`src/app/[...slug]/page.tsx`)
Create a dynamic catch-all route inside Next.js to fetch CMS page content dynamically and enable Live visual editing inside the Storyblok preview canvas:
```typescript
import { getStoryblokApi, StoryblokComponent } from "@storyblok/react";
import StoryblokProvider from "@/components/StoryblokProvider";

interface PageProps {
  params: {
    slug?: string[];
  };
}

export default async function Page({ params }: PageProps) {
  const slug = params.slug ? params.slug.join("/") : "home";
  const storyblokApi = getStoryblokApi();

  // Fetch data from Storyblok preview API
  const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
    version: "draft", // Use "published" for production builds
  });

  const story = data.story;

  return (
    <StoryblokProvider>
      {/* Renders the nested dynamic blocks */}
      <StoryblokComponent blok={story.content} />
    </StoryblokProvider>
  );
}
```

---

## Step 5: How Visual Editing works
Inside the Storyblok Space:
1. Navigate to **Settings** -> **Visual Editor**.
2. Configure **Location (Default Environment)** to `http://localhost:3000/`.
3. Open a Story page (e.g. `home`) inside the dashboard, and you will see your gorgeous redesigned Next.js site load directly in the visual preview!
4. Clicking any item on the screen will highlight its field in the sidebar, allowing you to edit text, upload photos, or adjust pricing in real-time, instantly reflecting on the page.
