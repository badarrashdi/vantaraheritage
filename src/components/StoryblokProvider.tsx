"use client";

import React from "react";
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

// Map block keys to our React components
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

// Initialize SDK with dynamic plugins
storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN || "mock_token",
  use: [apiPlugin],
  components,
});

export default function StoryblokProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
