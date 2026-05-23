"use client";

import React, { useState } from "react";
import { websiteContent } from "../data/websiteContent";
import styles from "../styles/MasterPlan.module.css";

export default function MasterPlan({ blok }: { blok?: any }) {
  const { masterPlan } = websiteContent;
  const [zoomScale, setZoomScale] = useState(1);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxScale, setLightboxScale] = useState(1);

  const tagline = blok?.tagline || masterPlan.tagline;
  const title = blok?.title || masterPlan.title;
  const imageSrc = blok?.imageSrc?.filename || blok?.imageSrc || masterPlan.imageSrc;
  const altText = blok?.altText || masterPlan.altText;

  const handleZoomIn = () => setZoomScale((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomScale((prev) => Math.max(prev - 0.25, 0.75));
  const handleZoomReset = () => setZoomScale(1);

  const handleLightboxZoomIn = () => setLightboxScale((prev) => Math.min(prev + 0.5, 4));
  const handleLightboxZoomOut = () => setLightboxScale((prev) => Math.max(prev - 0.5, 1));
  const handleLightboxReset = () => setLightboxScale(1);

  const toggleLightbox = () => {
    setIsLightboxOpen(!isLightboxOpen);
    setLightboxScale(1);
  };

  return (
    <>
      <section className={`section-padding ${styles.masterPlanSection}`} id="master-plan">
        <div className="container">
          {/* Header */}
          <div className="section-header">
            <span className="section-tagline">{tagline}</span>
            <h2 className="section-title">{title}</h2>
          </div>

          <div className={styles.viewerWrapper}>
            {/* Control Panel Console */}
            <div className={styles.console}>
              <button className={styles.consoleBtn} onClick={handleZoomIn} aria-label="Zoom in layout map">
                Zoom In (+)
              </button>
              <button className={styles.consoleBtn} onClick={handleZoomOut} aria-label="Zoom out layout map">
                Zoom Out (-)
              </button>
              <button className={styles.consoleBtn} onClick={handleZoomReset} aria-label="Reset zoom scale">
                Reset
              </button>
              <button className={`${styles.consoleBtn} ${styles.expandBtn}`} onClick={toggleLightbox}>
                Full Screen
              </button>
            </div>

            {/* Layout plan viewport */}
            <div className={styles.viewport}>
              <div
                className={styles.mapContainer}
                style={{
                  transform: `scale(${zoomScale})`,
                  cursor: isLightboxOpen ? "zoom-out" : "zoom-in",
                }}
                onClick={toggleLightbox}
              >
                <img
                  src={imageSrc}
                  alt={altText}
                  className={styles.layoutMap}
                  onError={(e) => {
                    // Fallback gorgeous visual layout plan placeholder vector
                    e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'%3E%3Crect width='1200' height='800' fill='%23123026'/%3E%3Ctext x='50%25' y='45%25' font-family='Georgia' font-size='40' fill='%23d4a359' text-anchor='middle'%3EVantara Heritage Vastu Master Plan%3C/text%3E%3Ctext x='50%25' y='55%25' font-family='sans-serif' font-size='20' fill='%23ffffff' text-anchor='middle'%3EClick to view high-resolution plot layout plan%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
            </div>

            {/* Map Key Highlights */}
            <div className={styles.mapMetrics}>
              <div className={styles.metricItem}>
                <div className={`${styles.dot} ${styles.greenDot}`} />
                <span>Theme Parks & Lush Green Spaces</span>
              </div>
              <div className={styles.metricItem}>
                <div className={`${styles.dot} ${styles.blueDot}`} />
                <span>Gated Pathways & Wide Internal Roads (30ft / 40ft)</span>
              </div>
              <div className={styles.metricItem}>
                <div className={`${styles.dot} ${styles.goldDot}`} />
                <span>5-Star Premium Resort-Style Clubhouse & Swimming Pool</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full-screen Lightbox Overlay */}
      {isLightboxOpen && (
        <div className={styles.lightboxOverlay}>
          {/* Close trigger */}
          <button className={styles.lightboxClose} onClick={toggleLightbox} aria-label="Close full screen view">
            &times;
          </button>

          {/* Floating dynamic controller console inside Lightbox */}
          <div className={styles.lightboxConsole}>
            <button className={styles.lightboxConsoleBtn} onClick={handleLightboxZoomIn}>
              Zoom In (+)
            </button>
            <button className={styles.lightboxConsoleBtn} onClick={handleLightboxZoomOut}>
              Zoom Out (-)
            </button>
            <button className={styles.lightboxConsoleBtn} onClick={handleLightboxReset}>
              Reset
            </button>
            <a href={imageSrc} download="Vantara-Heritage-Layout-Plan.jpg" className={`${styles.lightboxConsoleBtn} ${styles.downloadBtn}`}>
              Download Image
            </a>
          </div>

          {/* Dynamic Scroll Viewport */}
          <div className={styles.lightboxViewport}>
            <div
              className={styles.lightboxImageContainer}
              style={{
                transform: `scale(${lightboxScale})`,
              }}
            >
              <img
                src={imageSrc}
                alt={altText}
                className={styles.lightboxImage}
                onError={(e) => {
                  e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'%3E%3Crect width='1200' height='800' fill='%23123026'/%3E%3Ctext x='50%25' y='50%25' font-family='Georgia' font-size='32' fill='%23d4a359' text-anchor='middle'%3EVantara Heritage High-Res Layout Plan%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
