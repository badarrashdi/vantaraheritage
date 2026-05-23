"use client";

import React from "react";
import { useStoryblokState } from "@storyblok/react";
import Header from "./Header";
import Footer from "./Footer";
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
import { EnquiryProvider, useEnquiry } from "../context/EnquiryContext";
import { websiteContent } from "../data/websiteContent";

// Map the Storyblok components to render inside visual editor
const blokComponents: Record<string, React.ComponentType<any>> = {
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

function PageBody({ story }: { story: any }) {
  const { openEnquiry } = useEnquiry();
  const { siteSettings } = websiteContent;

  // Visual Editor Live Bridge (optional fallback if story is empty)
  const currentStory = useStoryblokState(story) as any;

  if (currentStory && currentStory.content && currentStory.content.body) {
    const siteSettingsBlok = currentStory.content.body.find((b: any) => b.component === "site_settings");

    return (
      <>
        {/* Storyblok Rendered Layout */}
        <Header siteSettings={siteSettingsBlok} />

        <main style={{ minHeight: "100vh" }}>
          {currentStory.content.body.map((blok: any) => {
            // Do not render site settings directly in layout
            if (blok.component === "site_settings") return null;

            const Component = blokComponents[blok.component];
            if (Component) {
              return <Component key={blok._uid} blok={blok} />;
            }
            return (
              <div key={blok._uid} style={{ padding: "20px", background: "#f00", color: "#fff" }}>
                Component "{blok.component}" is not registered.
              </div>
            );
          })}
        </main>

        <Footer siteSettings={siteSettingsBlok} />

        {/* Floating Mobile Drawer */}
        <div className="mobile-action-bar">
          <a href={`tel:${siteSettingsBlok?.phoneNumber || siteSettings.phoneNumber}`} className="action-item call-action" aria-label="Tap to Call Vantara Heritage">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>Tap to Call</span>
          </a>

          <button className="action-item enquire-action" onClick={() => openEnquiry("Mobile Floating Bar")} aria-label="Enquire Now leading popup">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <span>Enquire Now</span>
          </button>

          <a
            href={`https://api.whatsapp.com/send?phone=${siteSettingsBlok?.phoneNumber || siteSettings.phoneNumber}&text=${encodeURIComponent(siteSettingsBlok?.whatsappMessage || siteSettings.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="action-item whatsapp-action"
            aria-label="Contact us via WhatsApp"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            <span>WhatsApp</span>
          </a>
        </div>
      </>
    );
  }

  // Pure Static Fallback Layout
  return (
    <>
      <Header />

      <main style={{ minHeight: "100vh" }}>
        <Hero />
        <Overview />
        <PriceList />
        <Highlights />
        <Amenities />
        <MasterPlan />
        <BrochureCTA />
        <LocationAdvantage />
        <Gallery />
        <ContactForm />
      </main>

      <Footer />

      {/* Floating Mobile Drawer */}
      <div className="mobile-action-bar">
        <a href={`tel:${siteSettings.phoneNumber}`} className="action-item call-action" aria-label="Tap to Call Vantara Heritage">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <span>Tap to Call</span>
        </a>

        <button className="action-item enquire-action" onClick={() => openEnquiry("Mobile Floating Bar")} aria-label="Enquire Now leading popup">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          <span>Enquire Now</span>
        </button>

        <a
          href={`https://api.whatsapp.com/send?phone=${siteSettings.phoneNumber}&text=${encodeURIComponent(siteSettings.whatsappMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="action-item whatsapp-action"
          aria-label="Contact us via WhatsApp"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
          <span>WhatsApp</span>
        </a>
      </div>
    </>
  );
}

export default function VantaraPageClient({ story }: { story: any }) {
  return (
    <EnquiryProvider>
      <PageBody story={story} />
    </EnquiryProvider>
  );
}
