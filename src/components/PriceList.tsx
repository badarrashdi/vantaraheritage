"use client";

import React from "react";
import { websiteContent } from "../data/websiteContent";
import { useEnquiry } from "../context/EnquiryContext";
import styles from "../styles/PriceList.module.css";

interface PriceListProps {
  blok?: any;
  onEnquireClick?: (subject: string) => void;
}

export default function PriceList({ blok, onEnquireClick }: PriceListProps) {
  const { priceList } = websiteContent;
  
  let openEnquiryHandler = onEnquireClick;
  try {
    const { openEnquiry } = useEnquiry();
    if (!openEnquiryHandler) {
      openEnquiryHandler = openEnquiry;
    }
  } catch (e) {
    // Fallback if rendered outside of EnquiryProvider
  }

  const tagline = blok?.tagline || priceList.tagline;
  const title = blok?.title || priceList.title;
  const items = blok?.items
    ? blok.items.map((item: any) => ({
        typology: item.typology,
        size: item.size,
        type: item.type,
        priceText: item.priceText,
      }))
    : priceList.items;

  return (
    <section className={`section-padding ${styles.priceSection}`} id="price-list">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-tagline">{tagline}</span>
          <h2 className="section-title">{title}</h2>
        </div>

        {/* Pricing Cards Row */}
        <div className={styles.grid}>
          {items.map((item: any, idx: number) => (
            <div key={idx} className={styles.card}>
              {/* Header Badge */}
              <div className={styles.typologyBadge}>{item.typology}</div>

              {/* Title & Dimension */}
              <div className={styles.cardHeader}>
                <h3 className={styles.plotSize}>{item.size}</h3>
                <span className={styles.plotType}>{item.type}</span>
              </div>

              {/* Cost Overlay */}
              <div className={styles.priceContainer}>
                <span className={styles.priceLabel}>Starting Price</span>
                <span className={styles.priceValue}>{item.priceText}</span>
                <span className={styles.priceClarify}>Down Payment Options Available</span>
              </div>

              {/* Details List */}
              <ul className={styles.detailsList}>
                <li className={styles.detailsItem}>
                  <span className={styles.detailsKey}>Zoning:</span>
                  <span className={styles.detailsVal}>Premium Residential</span>
                </li>
                <li className={styles.detailsItem}>
                  <span className={styles.detailsKey}>Gated Access:</span>
                  <span className={styles.detailsVal}>Yes, 24/7 Security</span>
                </li>
                <li className={styles.detailsItem}>
                  <span className={styles.detailsKey}>Road Connectivity:</span>
                  <span className={styles.detailsVal}>30 ft / 40 ft Roads</span>
                </li>
              </ul>

              {/* Action Trigger */}
              <button
                className={`btn btn-primary ${styles.enquireBtn}`}
                onClick={() => openEnquiryHandler?.(`Pricing - ${item.size} ${item.type}`)}
              >
                Unlock Price Sheet
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
