import React from "react";
import { websiteContent, AmenityItem } from "../data/websiteContent";
import styles from "../styles/Amenities.module.css";

// Handcrafted custom linear SVG icons in champagne gold
function AmenityIcon({ type }: { type: AmenityItem["iconType"] }) {
  const strokeWidth = 1.5;
  const strokeColor = "currentColor";

  switch (type) {
    case "clubhouse":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} width="32" height="32">
          <path d="M3 21h18M5 21V10l7-6 7 6v11M9 21v-4a3 3 0 0 1 6 0v4M12 4v4M8 10h8" />
        </svg>
      );
    case "pool":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} width="32" height="32">
          <path d="M2 6c.6 0 1.2-.2 1.6-.6L5.2 4c.8-.8 2-.8 2.8 0l1.6 1.4c.4.4 1 .6 1.6.6s1.2-.2 1.6-.6l1.6-1.4c.8-.8 2-.8 2.8 0l1.6 1.4c.4.4 1 .6 1.6.6M2 12c.6 0 1.2-.2 1.6-.6l1.6-1.4c.8-.8 2-.8 2.8 0l1.6 1.4c.4.4 1 .6 1.6.6s1.2-.2 1.6-.6l1.6-1.4c.8-.8 2-.8 2.8 0l1.6 1.4c.4.4 1 .6 1.6.6M2 18c.6 0 1.2-.2 1.6-.6l1.6-1.4c.8-.8 2-.8 2.8 0l1.6 1.4c.4.4 1 .6 1.6.6s1.2-.2 1.6-.6l1.6-1.4c.8-.8 2-.8 2.8 0l1.6 1.4c.4.4 1 .6 1.6.6" />
        </svg>
      );
    case "gym":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} width="32" height="32">
          <path d="M6.5 6.5h11M6.5 17.5h11M3 9.5a1.5 1.5 0 0 1 3 0v5a1.5 1.5 0 0 1-3 0v-5zM18 9.5a1.5 1.5 0 0 1 3 0v5a1.5 1.5 0 0 1-3 0v-5zM6.5 12h11" />
        </svg>
      );
    case "kids":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} width="32" height="32">
          <path d="M4 14l6-6 4 4 6-6M4 20h16M7 11V6a2 2 0 1 1 4 0v5M13 13v-3a2 2 0 1 1 4 0v3" />
        </svg>
      );
    case "jogging":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} width="32" height="32">
          <path d="M12 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM4 9l4.5 1.5L10 15M14 9l-4 1.5L9.5 15M13 18l-3 4-2-1.5M10 15h4v6M18 9l-4 .5M8 9V6" />
        </svg>
      );
    case "park":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} width="32" height="32">
          <path d="M12 2L3 15h6v7h6v-7h6L12 2zM12 9V5" />
        </svg>
      );
    case "retail":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} width="32" height="32">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9zM9 22V12h6v10M12 2v6" />
        </svg>
      );
    case "foodcourt":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} width="32" height="32">
          <path d="M12 2v20M7 8V3M17 8V3M5 8h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Amenities({ blok }: { blok?: any }) {
  const { amenities } = websiteContent;

  const tagline = blok?.tagline || amenities.tagline;
  const title = blok?.title || amenities.title;
  const items = blok?.items
    ? blok.items.map((i: any, idx: number) => ({ id: idx, title: i.title, iconType: i.iconType }))
    : amenities.items;

  return (
    <section className={`section-padding ${styles.amenitiesSection}`} id="amenities">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-tagline">{tagline}</span>
          <h2 className="section-title">{title}</h2>
        </div>

        {/* 4x2 Grid Layout */}
        <div className={styles.grid}>
          {items.map((item: any) => (
            <div key={item.id} className={styles.card}>
              <div className={styles.iconContainer}>
                <AmenityIcon type={item.iconType} />
              </div>
              <h4 className={styles.cardTitle}>{item.title}</h4>
              <p className={styles.cardText}>World-class facility crafted for luxury and traditional comfort.</p>
              <div className={styles.cardGlow} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
