import React from "react";
import { websiteContent } from "../data/websiteContent";
import styles from "../styles/Highlights.module.css";

export default function Highlights({ blok }: { blok?: any }) {
  const { highlights } = websiteContent;

  const tagline = blok?.tagline || highlights.tagline;
  const title = blok?.title || highlights.title;
  const items = blok?.items
    ? blok.items.map((i: any) => ({ id: i.number, text: i.text }))
    : highlights.items;

  return (
    <section className={`section-padding ${styles.highlightsSection}`} id="highlights">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-tagline">{tagline}</span>
          <h2 className="section-title">{title}</h2>
        </div>

        {/* Staggered Grid */}
        <div className={styles.grid}>
          {items.map((item: any) => (
            <div key={item.id} className={styles.card}>
              <div className={styles.counterBox}>
                <span className={styles.counterNum}>{item.id}</span>
                <div className={styles.counterGlow} />
              </div>
              <div className={styles.content}>
                <p className={styles.highlightText}>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
