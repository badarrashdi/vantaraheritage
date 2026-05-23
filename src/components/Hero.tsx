"use client";

import React, { useState, useEffect } from "react";
import { websiteContent } from "../data/websiteContent";
import styles from "../styles/Hero.module.css";

export default function Hero({ blok }: { blok?: any }) {
  const { hero } = websiteContent;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const title = blok?.title || hero.title;
  const subtitle = blok?.subtitle || hero.subtitle;
  const locationText = blok?.locationText || hero.locationText;
  const startingPrice = blok?.startingPrice || hero.startingPrice;
  const paymentPlanText = blok?.paymentPlanText || hero.paymentPlanText;
  const formTitle = blok?.formTitle || hero.formTitle;
  const formSubtitle = blok?.formSubtitle || hero.formSubtitle;

  const bulletOffers = blok?.bulletOffers
    ? (typeof blok.bulletOffers === "string" ? blok.bulletOffers.split("\n").filter((l: string) => l.trim()) : blok.bulletOffers)
    : hero.bulletOffers;

  const bgImages = blok?.bgImages && blok.bgImages.length > 0
    ? blok.bgImages.map((img: any) => img.image?.filename || img.filename || img)
    : hero.bgImages;

  // Carousel background image rotation
  useEffect(() => {
    if (!bgImages || bgImages.length === 0) return;
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bgImages.length);
    }, 5000); // Rotate every 5s
    return () => clearInterval(timer);
  }, [bgImages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Name and Mobile Number are required!");
      return;
    }

    setFormStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, type: "Hero Enquiry Form" }),
      });

      if (response.ok) {
        setFormStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setFormStatus("error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setFormStatus("error");
    }
  };

  return (
    <section className={styles.heroSection} id="home">
      {/* Background Cross-fade Slider */}
      <div className={styles.carouselContainer}>
        {bgImages && bgImages.map((image: string, index: number) => (
          <div
            key={image}
            className={`${styles.carouselSlide} ${index === currentImageIndex ? styles.activeSlide : ""}`}
            style={{
              backgroundImage: `linear-gradient(to right, rgba(18, 48, 38, 0.85), rgba(18, 48, 38, 0.4)), url(${image})`,
            }}
          />
        ))}
      </div>

      <div className={`container ${styles.heroContainer}`}>
        <div className={styles.grid}>
          {/* Left Column: Key Copy & Badges */}
          <div className={styles.copyCol}>
            <div className={styles.badgeRow}>
              <span className={styles.goldBadge}>Gated Township</span>
              <span className={styles.locationBadge}>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {locationText}
              </span>
            </div>

            <h1 className={styles.heroHeading}>
              {title}
              <span className={styles.heroSubheading}>{subtitle}</span>
            </h1>

            {/* Price Highlight */}
            <div className={styles.priceContainer}>
              <span className={styles.priceLabel}>Plot Price Starting At</span>
              <div className={styles.priceValue}>
                <span className={styles.amount}>{startingPrice}</span>
              </div>
              <span className={styles.priceDetails}>{paymentPlanText}</span>
            </div>

            {/* Structured Bullet Features */}
            <ul className={styles.featuresList}>
              {bulletOffers && bulletOffers.map((offer: string, index: number) => (
                <li key={index} className={styles.featureItem}>
                  <svg
                    className={styles.checkIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{offer}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Floating glassmorphic Lead Form */}
          <div className={styles.formCol}>
            <div className={styles.formCard}>
              {formStatus === "success" ? (
                <div className={styles.successState}>
                  <div className={styles.successIcon}>
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <h3>Thank You!</h3>
                  <p>Your enquiry has been received. Our relationship officer will reach out to you shortly.</p>
                  <button className="btn btn-accent" onClick={() => setFormStatus("idle")}>
                    Send Another Question
                  </button>
                </div>
              ) : (
                <>
                  <div className={styles.formHeader}>
                    <h3>{formTitle}</h3>
                    <p>{formSubtitle}</p>
                  </div>

                  <form onSubmit={handleSubmit} className={styles.actualForm}>
                    <div className={styles.formGroup}>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Your Full Name *"
                        className={styles.inputField}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email Address (Optional)"
                        className={styles.inputField}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        pattern="^[0-9\-\+\s]{10,15}$"
                        placeholder="Mobile Number * (e.g. 9876543210)"
                        className={styles.inputField}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Message (e.g., Interested in site visit)"
                        className={styles.inputArea}
                        rows={3}
                      />
                    </div>

                    {formStatus === "error" && (
                      <p className={styles.errorMessage}>Failed to submit. Please check connectivity and try again.</p>
                    )}

                    <button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      className={`btn btn-accent ${styles.submitBtn}`}
                    >
                      {formStatus === "submitting" ? "Sending Request..." : "Request Callback"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
