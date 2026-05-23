import React from "react";
import { websiteContent } from "../data/websiteContent";
import styles from "../styles/LocationAdvantage.module.css";

export default function LocationAdvantage({ blok }: { blok?: any }) {
  const { location } = websiteContent;

  const tagline = blok?.tagline || location.tagline;
  const title = blok?.title || location.title;
  const mapIframeUrl = blok?.mapIframeUrl || location.mapIframeUrl;
  const distances = blok?.distances
    ? blok.distances.map((d: any) => ({ place: d.place, distance: d.distance }))
    : location.distances;

  return (
    <section className={`section-padding ${styles.locationSection}`} id="location-advantage">
      <div className="container">
        <div className={styles.grid}>
          {/* Left Column: Premium Connectivity Timeline */}
          <div className={styles.infoCol}>
            <div className="section-header left">
              <span className="section-tagline">{tagline}</span>
              <h2 className="section-title">{title}</h2>
              <p className={styles.subtext}>
                Accessibility is the ultimate luxury. Strategically situated at Brij Ghat, Garhmukteshwar, Vantara Heritage provides rapid transit links to Delhi-NCR, Hapur, and crucial tourist hubs.
              </p>
            </div>

            {/* Linear Gold Timeline Nodes */}
            <div className={styles.timeline}>
              <div className={styles.timelineLine} />
              
              {distances.map((item: any, idx: number) => (
                <div key={idx} className={styles.timelineNode}>
                  <div className={styles.nodeMarker}>
                    <span className={styles.nodeNum}>{idx + 1}</span>
                  </div>
                  <div className={styles.nodeContent}>
                    <h4 className={styles.nodePlace}>{item.place}</h4>
                    <span className={styles.distanceBadge}>{item.distance}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Google Maps integration */}
          <div className={styles.mapCol}>
            <div className={styles.mapCard}>
              <div className={styles.mapHeader}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.mapIcon}
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Live Interactive Satellites Map</span>
              </div>
              <div className={styles.iframeViewport}>
                <iframe
                  src={mapIframeUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Vantara Heritage Location Map"
                  className={styles.mapIframe}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
