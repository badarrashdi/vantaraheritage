/**
 * Vantara Heritage — Storyblok Migration Script
 * ================================================
 * This script automates the creation of all component schemas (blocks)
 * and the Home page with real content in your Storyblok space.
 *
 * Usage:  node scripts/storyblok-migrate.mjs
 *
 * Prerequisites:
 *   - STORYBLOK_SPACE_ID and STORYBLOK_MANAGEMENT_TOKEN in .env.local
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Load environment variables from .env.local ──────────────────────
function loadEnv() {
  const envPath = resolve(__dirname, "..", ".env.local");
  const content = readFileSync(envPath, "utf-8");
  const vars = {};
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    vars[trimmed.slice(0, eqIdx).trim()] = trimmed.slice(eqIdx + 1).trim();
  }
  return vars;
}

const env = loadEnv();
const SPACE_ID = env.STORYBLOK_SPACE_ID;
const TOKEN = env.STORYBLOK_MANAGEMENT_TOKEN;

if (!SPACE_ID || !TOKEN) {
  console.error("❌ Missing STORYBLOK_SPACE_ID or STORYBLOK_MANAGEMENT_TOKEN in .env.local");
  process.exit(1);
}

const BASE = `https://mapi.storyblok.com/v1/spaces/${SPACE_ID}`;
const headers = {
  Authorization: TOKEN,
  "Content-Type": "application/json",
};

// ── Helpers ─────────────────────────────────────────────────────────
async function apiCall(method, path, body) {
  const url = `${BASE}${path}`;
  const opts = { method, headers };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(url, opts);
  const text = await res.text();

  if (!res.ok) {
    // Rate-limit handling: retry after delay
    if (res.status === 429) {
      console.log("   ⏳ Rate-limited, waiting 1s...");
      await delay(1000);
      return apiCall(method, path, body);
    }
    console.error(`❌ API ${method} ${path} → ${res.status}`);
    console.error(text);
    throw new Error(`API error ${res.status}`);
  }

  return text ? JSON.parse(text) : {};
}

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

// ── Step 0 — Clean up any previous migration components ─────────────
async function getExistingComponents() {
  const data = await apiCall("GET", "/components");
  return data.components || [];
}

// ── Step 1 — Create component schemas ──────────────────────────────
// Each component definition follows Storyblok's Management API schema
// Reference: https://www.storyblok.com/docs/api/management/core-resources/components

const componentDefinitions = [
  // ── Nested leaf blocks (used inside other blocks) ──
  {
    name: "price_item",
    display_name: "Price Item",
    is_root: false,
    is_nestable: true,
    schema: {
      typology: { type: "text", pos: 0 },
      size: { type: "text", pos: 1 },
      type: { type: "text", pos: 2 },
      priceText: { type: "text", pos: 3 },
    },
  },
  {
    name: "highlight_item",
    display_name: "Highlight Item",
    is_root: false,
    is_nestable: true,
    schema: {
      number: { type: "text", pos: 0 },
      text: { type: "text", pos: 1 },
    },
  },
  {
    name: "amenity_item",
    display_name: "Amenity Item",
    is_root: false,
    is_nestable: true,
    schema: {
      title: { type: "text", pos: 0 },
      iconType: {
        type: "option",
        pos: 1,
        options: [
          { name: "clubhouse", value: "clubhouse" },
          { name: "pool", value: "pool" },
          { name: "gym", value: "gym" },
          { name: "kids", value: "kids" },
          { name: "jogging", value: "jogging" },
          { name: "park", value: "park" },
          { name: "retail", value: "retail" },
          { name: "foodcourt", value: "foodcourt" },
        ],
      },
    },
  },
  {
    name: "investment_point",
    display_name: "Investment Point",
    is_root: false,
    is_nestable: true,
    schema: {
      title: { type: "text", pos: 0 },
      text: { type: "textarea", pos: 1 },
    },
  },
  {
    name: "distance_item",
    display_name: "Distance Item",
    is_root: false,
    is_nestable: true,
    schema: {
      place: { type: "text", pos: 0 },
      distance: { type: "text", pos: 1 },
    },
  },
  {
    name: "news_item",
    display_name: "News Item",
    is_root: false,
    is_nestable: true,
    schema: {
      image: { type: "asset", filetypes: ["images"], pos: 0 },
      alt: { type: "text", pos: 1 },
      title: { type: "text", pos: 2 },
    },
  },
  {
    name: "gallery_image",
    display_name: "Gallery Image",
    is_root: false,
    is_nestable: true,
    schema: {
      image: { type: "asset", filetypes: ["images"], pos: 0 },
      caption: { type: "text", pos: 1 },
    },
  },
  {
    name: "banner_image",
    display_name: "Banner Image",
    is_root: false,
    is_nestable: true,
    schema: {
      image: { type: "asset", filetypes: ["images"], pos: 0 },
      alt: { type: "text", pos: 1 },
    },
  },

  // ── Section blocks ────────────────────────────────────
  {
    name: "hero",
    display_name: "Hero Section",
    is_root: false,
    is_nestable: true,
    schema: {
      title: { type: "text", pos: 0 },
      subtitle: { type: "text", pos: 1 },
      locationText: { type: "text", pos: 2 },
      startingPrice: { type: "text", pos: 3 },
      paymentPlanText: { type: "text", pos: 4 },
      formTitle: { type: "text", pos: 5 },
      formSubtitle: { type: "text", pos: 6 },
      bulletOffers: { type: "textarea", pos: 7 },
      bgImages: { type: "bloks", restrict_type: "", restrict_components: true, component_whitelist: ["banner_image"], pos: 8 },
    },
  },
  {
    name: "overview",
    display_name: "Overview Section",
    is_root: false,
    is_nestable: true,
    schema: {
      tagline: { type: "text", pos: 0 },
      title: { type: "text", pos: 1 },
      subtitle: { type: "text", pos: 2 },
      descriptionParagraphs: { type: "textarea", pos: 3 },
      keyFeaturesTitle: { type: "text", pos: 4 },
      keyFeaturesList: { type: "textarea", pos: 5 },
      spiritualityTitle: { type: "text", pos: 6 },
      spiritualityDescription: { type: "textarea", pos: 7 },
      spiritualityPoints: { type: "textarea", pos: 8 },
      investmentTitle: { type: "text", pos: 9 },
      investmentDescription: { type: "textarea", pos: 10 },
      investmentPoints: { type: "bloks", restrict_type: "", restrict_components: true, component_whitelist: ["investment_point"], pos: 11 },
    },
  },
  {
    name: "price_list",
    display_name: "Price List Section",
    is_root: false,
    is_nestable: true,
    schema: {
      tagline: { type: "text", pos: 0 },
      title: { type: "text", pos: 1 },
      items: { type: "bloks", restrict_type: "", restrict_components: true, component_whitelist: ["price_item"], pos: 2 },
    },
  },
  {
    name: "highlights",
    display_name: "Highlights Section",
    is_root: false,
    is_nestable: true,
    schema: {
      tagline: { type: "text", pos: 0 },
      title: { type: "text", pos: 1 },
      items: { type: "bloks", restrict_type: "", restrict_components: true, component_whitelist: ["highlight_item"], pos: 2 },
    },
  },
  {
    name: "amenities",
    display_name: "Amenities Section",
    is_root: false,
    is_nestable: true,
    schema: {
      tagline: { type: "text", pos: 0 },
      title: { type: "text", pos: 1 },
      items: { type: "bloks", restrict_type: "", restrict_components: true, component_whitelist: ["amenity_item"], pos: 2 },
    },
  },
  {
    name: "master_plan",
    display_name: "Master Plan Section",
    is_root: false,
    is_nestable: true,
    schema: {
      tagline: { type: "text", pos: 0 },
      title: { type: "text", pos: 1 },
      imageSrc: { type: "asset", filetypes: ["images"], pos: 2 },
      altText: { type: "text", pos: 3 },
    },
  },
  {
    name: "brochure_cta",
    display_name: "Brochure CTA Section",
    is_root: false,
    is_nestable: true,
    schema: {
      tagline: { type: "text", pos: 0 },
      title: { type: "text", pos: 1 },
      description: { type: "textarea", pos: 2 },
      pdfPath: { type: "text", pos: 3 },
    },
  },
  {
    name: "location_advantage",
    display_name: "Location Advantage Section",
    is_root: false,
    is_nestable: true,
    schema: {
      tagline: { type: "text", pos: 0 },
      title: { type: "text", pos: 1 },
      mapIframeUrl: { type: "text", pos: 2 },
      distances: { type: "bloks", restrict_type: "", restrict_components: true, component_whitelist: ["distance_item"], pos: 3 },
    },
  },
  {
    name: "gallery",
    display_name: "Gallery Section",
    is_root: false,
    is_nestable: true,
    schema: {
      tagline: { type: "text", pos: 0 },
      title: { type: "text", pos: 1 },
      images: { type: "bloks", restrict_type: "", restrict_components: true, component_whitelist: ["gallery_image"], pos: 2 },
      newsTitle: { type: "text", pos: 3 },
      newsSubtitle: { type: "text", pos: 4 },
      newsItems: { type: "bloks", restrict_type: "", restrict_components: true, component_whitelist: ["news_item"], pos: 5 },
    },
  },
  {
    name: "contact_form",
    display_name: "Contact Form Section",
    is_root: false,
    is_nestable: true,
    schema: {
      tagline: { type: "text", pos: 0 },
      title: { type: "text", pos: 1 },
      description: { type: "textarea", pos: 2 },
      formTitle: { type: "text", pos: 3 },
    },
  },
  {
    name: "site_settings",
    display_name: "Site Settings",
    is_root: false,
    is_nestable: true,
    schema: {
      logoText: { type: "text", pos: 0 },
      phoneNumber: { type: "text", pos: 1 },
      phoneFormatted: { type: "text", pos: 2 },
      whatsappMessage: { type: "text", pos: 3 },
      email: { type: "text", pos: 4 },
      address: { type: "text", pos: 5 },
      copyright: { type: "text", pos: 6 },
    },
  },

  // ── Root page content type ────────────────────────────
  {
    name: "page",
    display_name: "Page",
    is_root: true,
    is_nestable: false,
    schema: {
      body: {
        type: "bloks",
        pos: 0,
        restrict_type: "",
        restrict_components: true,
        component_whitelist: [
          "hero",
          "overview",
          "price_list",
          "highlights",
          "amenities",
          "master_plan",
          "brochure_cta",
          "location_advantage",
          "gallery",
          "contact_form",
          "site_settings",
        ],
      },
    },
  },
];

async function createComponents() {
  const existing = await getExistingComponents();
  const existingNames = new Set(existing.map((c) => c.name));

  for (const def of componentDefinitions) {
    if (existingNames.has(def.name)) {
      // Update existing component
      const existingComp = existing.find((c) => c.name === def.name);
      console.log(`   🔄 Updating component: ${def.name}`);
      await apiCall("PUT", `/components/${existingComp.id}`, { component: def });
    } else {
      console.log(`   ✨ Creating component: ${def.name}`);
      await apiCall("POST", "/components", { component: def });
    }
    await delay(250); // Respect rate limits
  }
}

// ── Step 2 — Create the Home page with real content ─────────────────

function buildHomeContent() {
  return {
    component: "page",
    body: [
      // ── Hero ──
      {
        component: "hero",
        title: "Vantara Heritage",
        subtitle: "Villa Plots in Garhmukteshwar",
        locationText: "Near Brijghat, Garhmukteshwar, Uttar Pradesh",
        startingPrice: "₹ 11,999/- per Sq.Yd.",
        paymentPlanText: "Down Payment Plan Available",
        formTitle: "Have a Question?",
        formSubtitle: "Enquire Now",
        bulletOffers:
          "200 Bigha Gated Township near Garh Ganga Ji\nVilla Plots Size ranging from 200 Sq.Yd. to 1000 Sq.Yd.\nA secure, gated community that perfectly blends timeless tradition with modern-day comfort.\nLuxury clubhouse, Musical Fountain, and a Modern Entrance Gate with 24/7 Security\nExperience the perfect blend of resort-style living in a spiritual ambiance\nJust 5 KM from Garh Ganga, Brijghat (Mini Haridwar)",
        bgImages: [],
        _uid: crypto.randomUUID(),
      },

      // ── Overview ──
      {
        component: "overview",
        tagline: "Overview",
        title: "Vantara Heritage Garhmukteshwar",
        subtitle: "A Premium Integrated Residential Township",
        descriptionParagraphs:
          "Vantara Heritage is a premium gated plotted development located near the sacred Garh Ganga Ji in Brijghat Garhmukteshwar. Designed for those seeking a peaceful lifestyle rooted in spirituality and nature, the project offers thoughtfully planned residential villa plots with modern infrastructure.\n\nThe development features thoughtfully planned villa plots with wide internal roads, landscaped green spaces, and essential modern amenities. With a modern gated entrance, 24/7 security, clubhouse, and recreational features, Vantara Heritage ensures a safe and comfortable lifestyle for residents.\n\nLocated in the serene surroundings of Brijghat, Garhmukteshwar, the project enjoys excellent connectivity to Delhi–NCR, making it a perfect choice for both weekend homes and long-term investment.",
        keyFeaturesTitle: "Key Features of Vantara Heritage Villa Plots",
        keyFeaturesList:
          "Premium villa plots in a secure, gated community\nPrime location near Garh Ganga Ji, Brijghat, Garhmukteshwar\nModern entrance gate with 24/7 security and surveillance\nWell-planned internal roads and underground wiring infrastructure\nClubhouse with lifestyle, swimming pool, and recreational amenities\nBeautiful musical fountain and landscaped green parks\nPeaceful, spiritual, and pollution-free atmosphere\nExcellent connectivity to Delhi–NCR via NH-9 and Ganga Expressway\nIdeal for residential living, weekend luxury homes, and high-appreciation investment",
        spiritualityTitle: "Prime Location with Spiritual Advantage",
        spiritualityDescription:
          "Vantara Heritage enjoys a prime location in Brijghat, Garhmukteshwar, near the sacred Garh Ganga Ji, offering a unique blend of spiritual serenity and modern living. Surrounded by natural beauty and peaceful surroundings, the project provides a calm and positive environment away from city chaos.",
        spiritualityPoints:
          "Just 5 KM from Brij Ghat (Mini Haridwar)\nClose to Holy Ganga Ghat & morning/evening Ganga Aarti\nNear major spiritual landmarks: Vedanta Mandir, Fulhari Mata Cottage, Hanuman Mandir\nSpiritual rites accessibility: Ganga Snan, Mundan Sanskar, and other rituals",
        investmentTitle: "Why Invest in Vantara Heritage Garhmukteshwar?",
        investmentDescription:
          "Vantara Heritage offers a rare opportunity to invest in a premium villa and farmhouse plot project located in the spiritually significant region of Garhmukteshwar, near Garh Ganga Ji.",
        investmentPoints: [
          { component: "investment_point", title: "Prime Location & Connectivity", text: "Located in the serene town of Garhmukteshwar, the project offers excellent connectivity to Delhi, Hapur, and nearby cities. With direct access to NH-9, it strikes a perfect balance between urban convenience and peaceful surroundings.", _uid: crypto.randomUUID() },
          { component: "investment_point", title: "Growing Demand for Peaceful Living", text: "As homebuyers increasingly seek residential spaces away from crowded city environments, Vantara Heritage is ideally positioned. The rapid growth of the Garhmukteshwar region makes it a promising destination for timely and strategic investment.", _uid: crypto.randomUUID() },
          { component: "investment_point", title: "Secure Gated Community", text: "Vantara Heritage is a well-planned gated township equipped with 24/7 security, professional boundary walls, and smart CCTV surveillance, ensuring a safe and worry-free environment.", _uid: crypto.randomUUID() },
          { component: "investment_point", title: "High Appreciation Potential", text: "Ongoing local infrastructure development, high spiritual tourism growth, and the upcoming Ganga Expressway contribute to the area's high growth prospects, promising high appreciation values.", _uid: crypto.randomUUID() },
          { component: "investment_point", title: "Spacious & Customizable Plots", text: "The project offers generously sized villa plots, giving you full creative freedom to design and build a home that matches your personal taste and luxury lifestyle requirements.", _uid: crypto.randomUUID() },
          { component: "investment_point", title: "Eco-Friendly & Sustainable", text: "Designed with a strong focus on greenery, Vantara Heritage blends modern utilities with nature, promoting a healthy, serene, and balanced way of living.", _uid: crypto.randomUUID() },
        ],
        _uid: crypto.randomUUID(),
      },

      // ── Price List ──
      {
        component: "price_list",
        tagline: "Price List",
        title: "Your Dream Home at Vantara Heritage",
        items: [
          { component: "price_item", typology: "Plots", size: "200 Sq.Yd.", type: "Villa Plots", priceText: "₹ On Request", _uid: crypto.randomUUID() },
          { component: "price_item", typology: "Plots", size: "300 Sq.Yd.", type: "Villa Plots", priceText: "₹ On Request", _uid: crypto.randomUUID() },
          { component: "price_item", typology: "Plots", size: "500 Sq.Yd.", type: "Villa Plots", priceText: "₹ On Request", _uid: crypto.randomUUID() },
        ],
        _uid: crypto.randomUUID(),
      },

      // ── Highlights ──
      {
        component: "highlights",
        tagline: "Our Highlights",
        title: "Project Highlights",
        items: [
          { component: "highlight_item", number: "01", text: "24/7 Gated Security with Smart CCTV Network", _uid: crypto.randomUUID() },
          { component: "highlight_item", number: "02", text: "5-Star Facilities Clubhouse with Swimming Pool", _uid: crypto.randomUUID() },
          { component: "highlight_item", number: "03", text: "Modern Underground Electrical Cabling & Sewerage", _uid: crypto.randomUUID() },
          { component: "highlight_item", number: "04", text: "Lush Green Theme Parks & Dedicated Kids Play Zones", _uid: crypto.randomUUID() },
          { component: "highlight_item", number: "05", text: "Badminton Court, Yoga Center & Meditation Zones", _uid: crypto.randomUUID() },
          { component: "highlight_item", number: "06", text: "Secure 2-Tier Security Access Gates", _uid: crypto.randomUUID() },
          { component: "highlight_item", number: "07", text: "Extra Wide Internal Roads (30 feet & 40 feet wide)", _uid: crypto.randomUUID() },
          { component: "highlight_item", number: "08", text: "Eco-Friendly Landscaping with Multi-Tier Plantation", _uid: crypto.randomUUID() },
        ],
        _uid: crypto.randomUUID(),
      },

      // ── Amenities ──
      {
        component: "amenities",
        tagline: "Our Amenities",
        title: "Iconic Living Amenities",
        items: [
          { component: "amenity_item", title: "Club House", iconType: "clubhouse", _uid: crypto.randomUUID() },
          { component: "amenity_item", title: "Swimming Pool", iconType: "pool", _uid: crypto.randomUUID() },
          { component: "amenity_item", title: "Gymnasium", iconType: "gym", _uid: crypto.randomUUID() },
          { component: "amenity_item", title: "Kids Play Area", iconType: "kids", _uid: crypto.randomUUID() },
          { component: "amenity_item", title: "Jogging Track", iconType: "jogging", _uid: crypto.randomUUID() },
          { component: "amenity_item", title: "Green Park", iconType: "park", _uid: crypto.randomUUID() },
          { component: "amenity_item", title: "Retail Shops", iconType: "retail", _uid: crypto.randomUUID() },
          { component: "amenity_item", title: "Food Court", iconType: "foodcourt", _uid: crypto.randomUUID() },
        ],
        _uid: crypto.randomUUID(),
      },

      // ── Master Plan ──
      {
        component: "master_plan",
        tagline: "Vantara Heritage Master Plan",
        title: "Vastu Friendly Site Plan",
        imageSrc: { filename: "", alt: "Vantara Heritage Site Layout Plan" },
        altText: "Vantara Heritage Site Layout Plan",
        _uid: crypto.randomUUID(),
      },

      // ── Brochure CTA ──
      {
        component: "brochure_cta",
        tagline: "Brochure",
        title: "Download E-Brochure",
        description:
          "View or Download the comprehensive PDF Brochure of Vantara Heritage to explore the gated villa & farmhouse township details, layouts, and investment models.",
        pdfPath: "/Vantara-Heritage-Brochure.pdf",
        _uid: crypto.randomUUID(),
      },

      // ── Location Advantage ──
      {
        component: "location_advantage",
        tagline: "Location Advantage",
        title: "Prime Connectivity Hub",
        mapIframeUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.101752299016!2d78.14915807550385!3d28.716504975619017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390b71001eccaf17%3A0xa728e902645038dd!2sVantara%20Heritage!5e0!3m2!1sen!2sin!4v1770142065665!5m2!1sen!2sin",
        distances: [
          { component: "distance_item", place: "Garh Town Hub", distance: "1 Km (Approx. 2 Mins)", _uid: crypto.randomUUID() },
          { component: "distance_item", place: "Brijghat Ganga bank", distance: "5 KM (Approx. 5 Mins)", _uid: crypto.randomUUID() },
          { component: "distance_item", place: "Ganga Expressway Entrance", distance: "10 Mins", _uid: crypto.randomUUID() },
          { component: "distance_item", place: "Garh Mukteshwar Railway Station", distance: "10 Mins", _uid: crypto.randomUUID() },
          { component: "distance_item", place: "Gajraula Industrial Zone", distance: "20 Mins", _uid: crypto.randomUUID() },
        ],
        _uid: crypto.randomUUID(),
      },

      // ── Gallery ──
      {
        component: "gallery",
        tagline: "Project Gallery",
        title: "Visual Walkthrough & Milestones",
        images: [],
        newsTitle: "Township Vision 2031",
        newsSubtitle: "गढ़मुक्तेश्वर तीर्थनगरी के विकास के लिए महायोजना 2031",
        newsItems: [
          { component: "news_item", image: { filename: "", alt: "" }, alt: "Garhmukteshwar Development Plan 1", title: "Maha Yojana 2031 - Phase 1", _uid: crypto.randomUUID() },
          { component: "news_item", image: { filename: "", alt: "" }, alt: "Garhmukteshwar Development Plan 2", title: "Ganga Development Masterplan", _uid: crypto.randomUUID() },
          { component: "news_item", image: { filename: "", alt: "" }, alt: "Garhmukteshwar Development Plan 3", title: "Expressway Connectivity Impact", _uid: crypto.randomUUID() },
          { component: "news_item", image: { filename: "", alt: "" }, alt: "Garhmukteshwar Development Plan 4", title: "Brijghat Tourism Expansion", _uid: crypto.randomUUID() },
          { component: "news_item", image: { filename: "", alt: "" }, alt: "Garhmukteshwar Development Plan 5", title: "Residential Infrastructure Approval", _uid: crypto.randomUUID() },
          { component: "news_item", image: { filename: "", alt: "" }, alt: "Garhmukteshwar Development Plan 6", title: "Gated Townships Green Zones", _uid: crypto.randomUUID() },
        ],
        _uid: crypto.randomUUID(),
      },

      // ── Contact Form ──
      {
        component: "contact_form",
        tagline: "Contact Us",
        title: "High-Quality Investment Opportunities",
        description:
          "Vantara Group is a trusted name in real estate, committed to delivering quality developments that combine thoughtful planning, modern infrastructure, and long-term value. Driven by a vision to build sustainable, eco-friendly and future-ready communities, our projects strike the perfect balance between luxury and tradition.",
        formTitle: "Schedule a VIP Site Visit",
        _uid: crypto.randomUUID(),
      },

      // ── Site Settings ──
      {
        component: "site_settings",
        logoText: "Vantara Heritage",
        phoneNumber: "+919873378592",
        phoneFormatted: "+91-9873378592",
        whatsappMessage: "Hello, Looking for Vantara Heritage Garh Mukteshwar. Get in touch with me",
        email: "info@vantaraheritage.co.in",
        address: "Brijghat, Garh Mukteshwar, Uttar Pradesh-245208",
        copyright: "© 2026 Vantara Heritage. All Rights Reserved.",
        _uid: crypto.randomUUID(),
      },
    ],
  };
}

async function createHomePage() {
  // Check if a story named 'home' already exists
  const storiesRes = await apiCall("GET", "/stories?with_slug=home");
  const stories = storiesRes.stories || [];

  const content = buildHomeContent();

  if (stories.length > 0) {
    const existing = stories[0];
    console.log(`   🔄 Updating existing Home story (id: ${existing.id}, parent_id: ${existing.parent_id})`);
    
    const storyPayload = {
      story: {
        name: "Home",
        slug: "home",
        content,
        is_startpage: false,
        parent_id: existing.parent_id,
      },
    };
    await apiCall("PUT", `/stories/${existing.id}`, storyPayload);
  } else {
    console.log("   ✨ Creating Home story");
    const storyPayload = {
      story: {
        name: "Home",
        slug: "home",
        content,
        is_startpage: false,
        parent_id: 0,
      },
    };
    await apiCall("POST", "/stories", storyPayload);
  }
}

// ── Main ────────────────────────────────────────────────────────────
async function main() {
  console.log("╔════════════════════════════════════════════════════╗");
  console.log("║  Vantara Heritage — Storyblok Migration Script    ║");
  console.log("╚════════════════════════════════════════════════════╝");
  console.log(`\n🔗 Space ID: ${SPACE_ID}\n`);

  console.log("═══ Step 1: Creating Component Schemas ═══");
  await createComponents();
  console.log("✅ All component schemas created!\n");

  await delay(500);

  console.log("═══ Step 2: Creating Home Page with Content ═══");
  await createHomePage();
  console.log("✅ Home page created with all real content!\n");

  console.log("╔════════════════════════════════════════════════════╗");
  console.log("║  🎉 Migration Complete!                           ║");
  console.log("║                                                    ║");
  console.log("║  Open your Storyblok dashboard to verify:          ║");
  console.log("║  → Block Library: 20+ components created           ║");
  console.log("║  → Content: 'Home' page with all sections filled   ║");
  console.log("║                                                    ║");
  console.log("║  Next: Upload images to Storyblok Asset Manager    ║");
  console.log("║  and link them in the Hero, Gallery, and Master    ║");
  console.log("║  Plan blocks.                                      ║");
  console.log("╚════════════════════════════════════════════════════╝");
}

main().catch((err) => {
  console.error("\n❌ Migration failed:", err.message);
  process.exit(1);
});
