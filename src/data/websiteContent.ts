export interface NavigationItem {
  label: string;
  hash: string;
}

export interface AmenityItem {
  id: string;
  title: string;
  iconType: 'clubhouse' | 'gym' | 'kids' | 'jogging' | 'park' | 'retail' | 'pool' | 'foodcourt';
}

export interface PriceItem {
  typology: string;
  title: string;
  size: string;
  type: string;
  priceText: string;
}

export interface HighlightItem {
  id: string;
  text: string;
}

export interface LocationDistanceItem {
  place: string;
  distance: string;
}

export interface NewsItem {
  id: string;
  src: string;
  alt: string;
  title: string;
}

export interface WebsiteContent {
  siteSettings: {
    logoText: string;
    logoImage: string;
    logoImageGrey: string;
    phoneNumber: string;
    phoneFormatted: string;
    whatsappMessage: string;
    email: string;
    address: string;
    copyright: string;
  };
  navigation: NavigationItem[];
  hero: {
    title: string;
    subtitle: string;
    locationText: string;
    startingPrice: string;
    paymentPlanText: string;
    formTitle: string;
    formSubtitle: string;
    bulletOffers: string[];
    bgImages: string[];
  };
  overview: {
    tagline: string;
    title: string;
    subtitle: string;
    descriptionParagraphs: string[];
    keyFeaturesTitle: string;
    keyFeaturesList: string[];
    spiritualityTitle: string;
    spiritualityDescription: string;
    spiritualityPoints: string[];
    investmentTitle: string;
    investmentDescription: string;
    investmentPoints: { title: string; text: string }[];
  };
  priceList: {
    tagline: string;
    title: string;
    items: PriceItem[];
  };
  highlights: {
    tagline: string;
    title: string;
    items: HighlightItem[];
  };
  amenities: {
    tagline: string;
    title: string;
    items: AmenityItem[];
  };
  masterPlan: {
    tagline: string;
    title: string;
    imageSrc: string;
    altText: string;
  };
  brochure: {
    tagline: string;
    title: string;
    description: string;
    pdfPath: string;
  };
  location: {
    tagline: string;
    title: string;
    mapIframeUrl: string;
    distances: LocationDistanceItem[];
  };
  gallery: {
    tagline: string;
    title: string;
    images: string[];
    newsTitle: string;
    newsSubtitle: string;
    newsItems: NewsItem[];
  };
  contactSection: {
    tagline: string;
    title: string;
    description: string;
    formTitle: string;
  };
}

export const websiteContent: WebsiteContent = {
  siteSettings: {
    logoText: "Vantara Heritage",
    logoImage: "/project-logo.webp",
    logoImageGrey: "/project-logo.webp",
    phoneNumber: "+919873378592",
    phoneFormatted: "+91-9873378592",
    whatsappMessage: "Hello, Looking for Vantara Heritage Garh Mukteshwar. Get in touch with me",
    email: "info@vantaraheritage.co.in",
    address: "Brijghat, Garh Mukteshwar, Uttar Pradesh-245208",
    copyright: "© 2026 Vantara Heritage. All Rights Reserved."
  },
  navigation: [
    { label: "Price", hash: "#price-list" },
    { label: "Highlights", hash: "#highlights" },
    { label: "Amenities", hash: "#amenities" },
    { label: "Master Plan", hash: "#master-plan" },
    { label: "Brochure", hash: "#download-brochure" },
    { label: "Location", hash: "#location-advantage" },
    { label: "Gallery", hash: "#gallery" },
    { label: "Contact", hash: "#contact-us" }
  ],
  hero: {
    title: "Vantara Heritage",
    subtitle: "Villa Plots in Garhmukteshwar",
    locationText: "Near Brijghat, Garhmukteshwar, Uttar Pradesh",
    startingPrice: "₹ 11,999/- per Sq.Yd.",
    paymentPlanText: "Down Payment Plan Available",
    formTitle: "Have a Question?",
    formSubtitle: "Enquire Now",
    bulletOffers: [
      "200 Bigha Gated Township near Garh Ganga Ji",
      "Villa Plots Size ranging from 200 Sq.Yd. to 1000 Sq.Yd.",
      "A secure, gated community that perfectly blends timeless tradition with modern-day comfort.",
      "Luxury clubhouse, Musical Fountain, and a Modern Entrance Gate with 24/7 Security",
      "Experience the perfect blend of resort-style living in a spiritual ambiance",
      "Just 5 KM from Garh Ganga, Brijghat (Mini Haridwar)"
    ],
    bgImages: [
      "/images/banners/banner1.jpg",
      "/images/banners/banner2.jpg",
      "/images/banners/banner3.jpg"
    ]
  },
  overview: {
    tagline: "Overview",
    title: "Vantara Heritage Garhmukteshwar",
    subtitle: "A Premium Integrated Residential Township",
    descriptionParagraphs: [
      "Vantara Heritage is a premium gated plotted development located near the sacred Garh Ganga Ji in Brijghat Garhmukteshwar. Designed for those seeking a peaceful lifestyle rooted in spirituality and nature, the project offers thoughtfully planned residential villa plots with modern infrastructure.",
      "The development features thoughtfully planned villa plots with wide internal roads, landscaped green spaces, and essential modern amenities. With a modern gated entrance, 24/7 security, clubhouse, and recreational features, Vantara Heritage ensures a safe and comfortable lifestyle for residents.",
      "Located in the serene surroundings of Brijghat, Garhmukteshwar, the project enjoys excellent connectivity to Delhi–NCR, making it a perfect choice for both weekend homes and long-term investment. Vantara Heritage Plots & Villa promise a harmonious lifestyle where cultural heritage meets contemporary living."
    ],
    keyFeaturesTitle: "Key Features of Vantara Heritage Villa Plots",
    keyFeaturesList: [
      "Premium villa plots in a secure, gated community",
      "Prime location near Garh Ganga Ji, Brijghat, Garhmukteshwar",
      "Modern entrance gate with 24/7 security and surveillance",
      "Well-planned internal roads and underground wiring infrastructure",
      "Clubhouse with lifestyle, swimming pool, and recreational amenities",
      "Beautiful musical fountain and landscaped green parks",
      "Peaceful, spiritual, and pollution-free atmosphere",
      "Excellent connectivity to Delhi–NCR via NH-9 and Ganga Expressway",
      "Ideal for residential living, weekend luxury homes, and high-appreciation investment"
    ],
    spiritualityTitle: "Prime Location with Spiritual Advantage",
    spiritualityDescription: "Vantara Heritage enjoys a prime location in Brijghat, Garhmukteshwar, near the sacred Garh Ganga Ji, offering a unique blend of spiritual serenity and modern living. Surrounded by natural beauty and peaceful surroundings, the project provides a calm and positive environment away from city chaos.",
    spiritualityPoints: [
      "Just 5 KM from Brij Ghat (Mini Haridwar)",
      "Close to Holy Ganga Ghat & morning/evening Ganga Aarti",
      "Near major spiritual landmarks: Vedanta Mandir, Fulhari Mata Cottage, Hanuman Mandir",
      "Spiritual rites accessibility: Ganga Snan, Mundan Sanskar, and other rituals"
    ],
    investmentTitle: "Why Invest in Vantara Heritage Garhmukteshwar?",
    investmentDescription: "Vantara Heritage offers a rare opportunity to invest in a premium villa and farmhouse plot project located in the spiritually significant region of Garhmukteshwar, near Garh Ganga Ji. The project stands out for its thoughtful planning, serene environment, and future-ready infrastructure, making it ideal for both end users and investors.",
    investmentPoints: [
      {
        title: "Prime Location & Connectivity",
        text: "Located in the serene town of Garhmukteshwar, the project offers excellent connectivity to Delhi, Hapur, and nearby cities. With direct access to NH-9, it strikes a perfect balance between urban convenience and peaceful surroundings."
      },
      {
        title: "Growing Demand for Peaceful Living",
        text: "As homebuyers increasingly seek residential spaces away from crowded city environments, Vantara Heritage is ideally positioned. The rapid growth of the Garhmukteshwar region makes it a promising destination for timely and strategic investment."
      },
      {
        title: "Secure Gated Community",
        text: "Vantara Heritage is a well-planned gated township equipped with 24/7 security, professional boundary walls, and smart CCTV surveillance, ensuring a safe and worry-free environment."
      },
      {
        title: "High Appreciation Potential",
        text: "Ongoing local infrastructure development, high spiritual tourism growth, and the upcoming Ganga Expressway contribute to the area's high growth prospects, promising high appreciation values."
      },
      {
        title: "Spacious & Customizable Plots",
        text: "The project offers generously sized villa plots, giving you full creative freedom to design and build a home that matches your personal taste and luxury lifestyle requirements."
      },
      {
        title: "Eco-Friendly & Sustainable",
        text: "Designed with a strong focus on greenery, Vantara Heritage blends modern utilities with nature, promoting a healthy, serene, and balanced way of living."
      }
    ]
  },
  priceList: {
    tagline: "Price List",
    title: "Your Dream Home at Vantara Heritage",
    items: [
      {
        typology: "Plots",
        title: "200 Sq.Yd. Plot",
        size: "200 Sq.Yd.",
        type: "Villa Plots",
        priceText: "₹ On Request"
      },
      {
        typology: "Plots",
        title: "300 Sq.Yd. Plot",
        size: "300 Sq.Yd.",
        type: "Villa Plots",
        priceText: "₹ On Request"
      },
      {
        typology: "Plots",
        title: "500 Sq.Yd. Plot",
        size: "500 Sq.Yd.",
        type: "Villa Plots",
        priceText: "₹ On Request"
      }
    ]
  },
  highlights: {
    tagline: "Our Highlights",
    title: "Project Highlights",
    items: [
      { id: "01", text: "24/7 Gated Security with Smart CCTV Network" },
      { id: "02", text: "5-Star Facilities Clubhouse with Swimming Pool" },
      { id: "03", text: "Modern Underground Electrical Cabling & Sewerage" },
      { id: "04", text: "Lush Green Theme Parks & Dedicated Kids Play Zones" },
      { id: "05", text: "Badminton Court, Yoga Center & Meditation Zones" },
      { id: "06", text: "Secure 2-Tier Security Access Gates" },
      { id: "07", text: "Extra Wide Internal Roads (30 feet & 40 feet wide)" },
      { id: "08", text: "Eco-Friendly Landscaping with Multi-Tier Plantation" }
    ]
  },
  amenities: {
    tagline: "Our Amenities",
    title: "Iconic Living Amenities",
    items: [
      { id: "am-1", title: "Club House", iconType: "clubhouse" },
      { id: "am-2", title: "Swimming Pool", iconType: "pool" },
      { id: "am-3", title: "Gymnasium", iconType: "gym" },
      { id: "am-4", title: "Kids Play Area", iconType: "kids" },
      { id: "am-5", title: "Jogging Track", iconType: "jogging" },
      { id: "am-6", title: "Green Park", iconType: "park" },
      { id: "am-7", title: "Retail Shops", iconType: "retail" },
      { id: "am-8", title: "Food Court", iconType: "foodcourt" }
    ]
  },
  masterPlan: {
    tagline: "Vantara Heritage Master Plan",
    title: "Vastu Friendly Site Plan",
    imageSrc: "/images/Vantara-Heritage-Layout-Plan.jpg",
    altText: "Vantara Heritage Site Layout Plan"
  },
  brochure: {
    tagline: "Brochure",
    title: "Download E-Brochure",
    description: "View or Download the comprehensive PDF Brochure of Vantara Heritage to explore the gated villa & farmhouse township details, layouts, and investment models.",
    pdfPath: "/Vantara-Heritage-Brochure.pdf"
  },
  location: {
    tagline: "Location Advantage",
    title: "Prime Connectivity Hub",
    mapIframeUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.101752299016!2d78.14915807550385!3d28.716504975619017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390b71001eccaf17%3A0xa728e902645038dd!2sVantara%20Heritage!5e0!3m2!1sen!2sin!4v1770142065665!5m2!1sen!2sin",
    distances: [
      { place: "Garh Town Hub", distance: "1 Km (Approx. 2 Mins)" },
      { place: "Brijghat Ganga bank", distance: "5 KM (Approx. 5 Mins)" },
      { place: "Ganga Expressway Entrance", distance: "10 Mins" },
      { place: "Garh Mukteshwar Railway Station", distance: "10 Mins" },
      { place: "Gajraula Industrial Zone", distance: "20 Mins" }
    ]
  },
  gallery: {
    tagline: "Project Gallery",
    title: "Visual Walkthrough & Milestones",
    images: [
      "/images/gallery/gallery1.jpg",
      "/images/gallery/gallery2.jpg",
      "/images/gallery/gallery3.jpg",
      "/images/vantara-heritage1.jpeg",
      "/images/vantara-heritage2.jpeg",
      "/images/vantara-heritage3.jpeg"
    ],
    newsTitle: "Township Vision 2031",
    newsSubtitle: "गढ़मुक्तेश्वर तीर्थनगरी के विकास के लिए महायोजना 2031",
    newsItems: [
      { id: "news-1", src: "/images/news-expressway.jpg", alt: "Ganga Expressway Future Plan", title: "गंगा एक्सप्रेसवे से बदलेगा क्षेत्र का भविष्य" },
      { id: "news-2", src: "/images/news-plaza.jpg", alt: "Plaza House Development Plan", title: "12 एकड़ जमीन पर बनेगा प्लाजा हाउस" },
      { id: "news-3", src: "/images/location-map.jpg", alt: "Vantara Heritage Location Map", title: "Vantara Heritage Location Map" },
      { id: "news-4", src: "/images/news-expressway.jpg", alt: "Garhmukteshwar Development Plan 4", title: "Brijghat Tourism Expansion" },
      { id: "news-5", src: "/images/news-plaza.jpg", alt: "Garhmukteshwar Development Plan 5", title: "Residential Infrastructure Approval" },
      { id: "news-6", src: "/images/location-map.jpg", alt: "Garhmukteshwar Development Plan 6", title: "Gated Townships Green Zones" }
    ]
  },
  contactSection: {
    tagline: "Contact Us",
    title: "High-Quality Investment Opportunities",
    description: "Vantara Group is a trusted name in real estate, committed to delivering quality developments that combine thoughtful planning, modern infrastructure, and long-term value. Driven by a vision to build sustainable, eco-friendly and future-ready communities, our projects strike the perfect balance between luxury and tradition.",
    formTitle: "Schedule a VIP Site Visit"
  }
};
