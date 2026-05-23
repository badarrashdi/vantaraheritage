"use client";

import React, { useState } from "react";
import { websiteContent } from "../data/websiteContent";
import styles from "../styles/Overview.module.css";

type TabType = "about" | "spirituality" | "investment";

export default function Overview({ blok }: { blok?: any }) {
  const { overview } = websiteContent;
  const [activeTab, setActiveTab] = useState<TabType>("about");

  const tagline = blok?.tagline || overview.tagline;
  const title = blok?.title || overview.title;
  const subtitle = blok?.subtitle || overview.subtitle;

  const descriptionParagraphs = blok?.descriptionParagraphs
    ? (typeof blok.descriptionParagraphs === "string" ? blok.descriptionParagraphs.split("\n").filter((p: string) => p.trim()) : blok.descriptionParagraphs)
    : overview.descriptionParagraphs;

  const keyFeaturesTitle = blok?.keyFeaturesTitle || overview.keyFeaturesTitle;
  const keyFeaturesList = blok?.keyFeaturesList
    ? (typeof blok.keyFeaturesList === "string" ? blok.keyFeaturesList.split("\n").filter((f: string) => f.trim()) : blok.keyFeaturesList)
    : overview.keyFeaturesList;

  const spiritualityTitle = blok?.spiritualityTitle || overview.spiritualityTitle;
  const spiritualityDescription = blok?.spiritualityDescription || overview.spiritualityDescription;
  const spiritualityPoints = blok?.spiritualityPoints
    ? (typeof blok.spiritualityPoints === "string" ? blok.spiritualityPoints.split("\n").filter((p: string) => p.trim()) : blok.spiritualityPoints)
    : overview.spiritualityPoints;

  const investmentTitle = blok?.investmentTitle || overview.investmentTitle;
  const investmentDescription = blok?.investmentDescription || overview.investmentDescription;
  const investmentPoints = blok?.investmentPoints
    ? blok.investmentPoints.map((ip: any) => ({ title: ip.title, text: ip.text }))
    : overview.investmentPoints;

  return (
    <section className={`section-padding ${styles.overviewSection}`} id="overview">
      <div className="container">
        <div className={styles.grid}>
          {/* Left Column: Interactive Tabbed Interface */}
          <div className={styles.contentCol}>
            <div className="section-header left">
              <span className="section-tagline">{tagline}</span>
              <h2 className="section-title">
                {title}
                <span>{subtitle}</span>
              </h2>
            </div>

            {/* Premium Tab Buttons */}
            <div className={styles.tabButtons}>
              <button
                className={`${styles.tabBtn} ${activeTab === "about" ? styles.activeTab : ""}`}
                onClick={() => setActiveTab("about")}
              >
                Overview
              </button>
              <button
                className={`${styles.tabBtn} ${activeTab === "spirituality" ? styles.activeTab : ""}`}
                onClick={() => setActiveTab("spirituality")}
              >
                Spirituality
              </button>
              <button
                className={`${styles.tabBtn} ${activeTab === "investment" ? styles.activeTab : ""}`}
                onClick={() => setActiveTab("investment")}
              >
                Why Invest?
              </button>
            </div>

            {/* Tab Content Panel */}
            <div className={styles.tabPanel}>
              {/* Tab 1: About Vantara Heritage */}
              {activeTab === "about" && (
                <div className={`${styles.panelContent} animate-fade-in-up`}>
                  {descriptionParagraphs.map((para: string, idx: number) => (
                    <p key={idx} className={styles.description}>
                      {para}
                    </p>
                  ))}

                  <h4 className={styles.listTitle}>{keyFeaturesTitle}</h4>
                  <ul className={styles.featureGrid}>
                    {keyFeaturesList.map((feature: string, idx: number) => (
                      <li key={idx} className={styles.featureItem}>
                        <div className={styles.bulletDot} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tab 2: Spirituality Advantage */}
              {activeTab === "spirituality" && (
                <div className={`${styles.panelContent} animate-fade-in-up`}>
                  <p className={styles.description}>{spiritualityDescription}</p>
                  <div className={styles.spiritCard}>
                    <h4 className={styles.listTitle}>{spiritualityTitle}</h4>
                    <ul className={styles.spiritList}>
                      {spiritualityPoints.map((point: string, idx: number) => (
                        <li key={idx} className={styles.spiritItem}>
                          <svg
                            className={styles.lotusIcon}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                          </svg>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Tab 3: Investment Potential */}
              {activeTab === "investment" && (
                <div className={`${styles.panelContent} animate-fade-in-up`}>
                  <p className={styles.description}>{investmentDescription}</p>
                  <div className={styles.investmentGrid}>
                    {investmentPoints.map((point: any, idx: number) => (
                      <div key={idx} className={styles.investmentCard}>
                        <span className={styles.investmentIdx}>0{idx + 1}</span>
                        <h4 className={styles.investmentLabel}>{point.title}</h4>
                        <p className={styles.investmentText}>{point.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Visual Frame and Local Video */}
          <div className={styles.mediaCol}>
            <div className={styles.mediaWrapper}>
              {/* Premium Video Player Container */}
              <div className={styles.videoCard}>
                <div className={styles.videoGlow} />
                <div className={styles.playerFrame}>
                  {/* Floating badge */}
                  <span className={styles.liveBadge}>Actual View</span>
                  {/* Local video tag using site resource */}
                  <video
                    width="100%"
                    height="100%"
                    controls
                    muted
                    autoPlay
                    loop
                    className={styles.videoPlayer}
                  >
                    <source src="/projectvideo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>

              {/* Photo Collage Stack */}
              <div className={styles.photoGrid}>

    
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
