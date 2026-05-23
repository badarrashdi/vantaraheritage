"use client";

import React, { useState } from "react";
import { websiteContent } from "../data/websiteContent";
import styles from "../styles/Gallery.module.css";

type GalleryView = "photos" | "news";

export default function Gallery({ blok }: { blok?: any }) {
  const { gallery } = websiteContent;
  const [activeTab, setActiveTab] = useState<GalleryView>("photos");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const tagline = blok?.tagline || gallery.tagline;
  const title = blok?.title || gallery.title;
  
  const images = blok?.images && blok.images.length > 0
    ? blok.images.map((img: any) => img.image?.filename || img.filename || img)
    : gallery.images;

  const newsTitle = blok?.newsTitle || gallery.newsTitle;
  const newsSubtitle = blok?.newsSubtitle || gallery.newsSubtitle;

  const newsItems = blok?.newsItems
    ? blok.newsItems.map((item: any, idx: number) => ({
        id: idx,
        src: item.image?.filename || item.src?.filename || item.src || "",
        alt: item.alt || "",
        title: item.title || "",
      }))
    : gallery.newsItems;

  const handleOpenLightbox = (index: number, tab: GalleryView) => {
    // We calculate standard index representation based on active tab
    setLightboxIndex(index);
    setActiveTab(tab);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const getCurrentImageSrc = () => {
    if (lightboxIndex === null) return "";
    if (activeTab === "photos") {
      return images[lightboxIndex];
    } else {
      return newsItems[lightboxIndex].src;
    }
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    const max = activeTab === "photos" ? images.length : newsItems.length;
    setLightboxIndex((lightboxIndex - 1 + max) % max);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    const max = activeTab === "photos" ? images.length : newsItems.length;
    setLightboxIndex((lightboxIndex + 1) % max);
  };

  return (
    <>
      <section className={`section-padding ${styles.gallerySection}`} id="gallery">
        <div className="container">
          {/* Header */}
          <div className="section-header">
            <span className="section-tagline">{tagline}</span>
            <h2 className="section-title">{title}</h2>
          </div>

          {/* Interactive Switchers */}
          <div className={styles.tabButtons}>
            <button
              className={`${styles.tabBtn} ${activeTab === "photos" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("photos")}
            >
              Township Gallery
            </button>
            <button
              className={`${styles.tabBtn} ${activeTab === "news" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("news")}
            >
              Development News
            </button>
          </div>

          {/* Dynamic Grid Panels */}
          <div className={styles.panelContainer}>
            {activeTab === "photos" ? (
              <div className={`${styles.masonryGrid} animate-fade-in-up`}>
                {images.map((imgSrc: string, idx: number) => (
                  <div key={idx} className={styles.galleryCard} onClick={() => handleOpenLightbox(idx, "photos")}>
                    <img
                      src={imgSrc}
                      alt={`Vantara Heritage Landscape ${idx + 1}`}
                      className={styles.galleryImage}
                      onError={(e) => {
                        e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23123026'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='16' fill='%23d4a359' text-anchor='middle'%3EProject View ${idx + 1}%3C/text%3E%3C/svg%3E`;
                      }}
                    />
                    <div className={styles.imageOverlay}>
                      <span className={styles.zoomIcon}>+ View Image</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`${styles.newsPanel} animate-fade-in-up`}>
                <div className={styles.newsHeading}>
                  <h3>{newsTitle}</h3>
                  <p>{newsSubtitle}</p>
                </div>
                <div className={styles.newsGrid}>
                  {newsItems.map((item: any, idx: number) => (
                    <div key={item.id} className={styles.newsCard} onClick={() => handleOpenLightbox(idx, "news")}>
                      <div className={styles.newsImageContainer}>
                        <img
                          src={item.src}
                          alt={item.alt}
                          className={styles.newsImage}
                          onError={(e) => {
                            e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23123026'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='16' fill='%23d4a359' text-anchor='middle'%3ENews cutting ${idx + 1}%3C/text%3E%3C/svg%3E`;
                          }}
                        />
                        <div className={styles.imageOverlay}>
                          <span className={styles.zoomIcon}>+ Read Clipping</span>
                        </div>
                      </div>
                      <div className={styles.newsMeta}>
                        <h4 className={styles.newsTitleLabel}>{item.title}</h4>
                        <span className={styles.newsDate}>Mahayojana 2031 Plan</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Lightbox Slider Overlay */}
      {lightboxIndex !== null && (
        <div className={styles.lightboxOverlay} onClick={handleCloseLightbox}>
          {/* Close buttons */}
          <button className={styles.closeBtn} onClick={handleCloseLightbox} aria-label="Close image popup">
            &times;
          </button>

          {/* Previous Slide Trigger */}
          <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={handlePrevImage} aria-label="Previous image">
            &#8249;
          </button>

          {/* Current Slide Display */}
          <div className={styles.lightboxViewport} onClick={(e) => e.stopPropagation()}>
            <img src={getCurrentImageSrc()} alt="Enlarged view Vantara Heritage" className={styles.lightboxImage} />
          </div>

          {/* Next Slide Trigger */}
          <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={handleNextImage} aria-label="Next image">
            &#8250;
          </button>
        </div>
      )}
    </>
  );
}
