"use client";

import React, { useState } from "react";
import { websiteContent } from "../data/websiteContent";
import styles from "../styles/ContactForm.module.css";

export default function ContactForm({ blok }: { blok?: any }) {
  const { contactSection, siteSettings } = websiteContent;
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const tagline = blok?.tagline || contactSection.tagline;
  const title = blok?.title || contactSection.title;
  const description = blok?.description || contactSection.description;
  const formTitle = blok?.formTitle || contactSection.formTitle;

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

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, type: "VIP Site Visit Form" }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Lead register error:", error);
      setStatus("error");
    }
  };

  return (
    <section className={`section-padding ${styles.contactSection}`} id="contact-us">
      <div className="container">
        <div className={styles.grid}>
          {/* Left Column: Builder Portfolio & Office info */}
          <div className={styles.infoCol}>
            <div className="section-header left">
              <span className="section-tagline">{tagline}</span>
              <h2 className="section-title">{title}</h2>
            </div>
            
            <p className={styles.description}>{description}</p>
            <p className={styles.description}>
              Driven by a vision to build sustainable, eco-friendly, and future-ready communities, Vantara Group emphasizes strategic locations, superior infrastructure standards, and Vastu-friendly layouts.
            </p>

            {/* Structured Info Card */}
            <div className={styles.infoCard}>
              <div className={styles.infoRow}>
                <div className={styles.infoIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h4 className={styles.infoTitle}>Corporate Location</h4>
                  <p className={styles.infoText}>{siteSettings.address}</p>
                </div>
              </div>

              <div className={styles.infoRow}>
                <div className={styles.infoIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <h4 className={styles.infoTitle}>Relationship Desk</h4>
                  <a href={`tel:${siteSettings.phoneNumber}`} className={styles.infoLink}>
                    {siteSettings.phoneFormatted}
                  </a>
                </div>
              </div>

              <div className={styles.infoRow}>
                <div className={styles.infoIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <h4 className={styles.infoTitle}>Email Correspondence</h4>
                  <a href={`mailto:${siteSettings.email}`} className={styles.infoLink}>
                    {siteSettings.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Submission form */}
          <div className={styles.formCol}>
            <div className={styles.formCard}>
              {status === "success" ? (
                <div className={styles.successState}>
                  <div className={styles.successIcon}>
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3>Site Visit Booked!</h3>
                  <p>Our sales manager will call you to align dates and organize complimentary transportation.</p>
                  <button className="btn btn-accent" onClick={() => setStatus("idle")}>
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <>
                  <h3 className={styles.formHeading}>{formTitle}</h3>
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
                        placeholder="Your Email ID (Optional)"
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
                        placeholder="Active Mobile Number *"
                        className={styles.inputField}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Message (e.g. Schedule for coming Sunday)"
                        className={styles.inputArea}
                        rows={4}
                      />
                    </div>

                    {status === "error" && (
                      <p className={styles.errorText}>Submission failed. Please verify phone number format and try again.</p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className={`btn btn-primary ${styles.submitBtn}`}
                    >
                      {status === "submitting" ? "Registering Lead..." : "Book Site Visit"}
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
