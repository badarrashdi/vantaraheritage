"use client";

import React, { useState } from "react";
import { websiteContent } from "../data/websiteContent";
import styles from "../styles/BrochureCTA.module.css";

export default function BrochureCTA({ blok }: { blok?: any }) {
  const { brochure } = websiteContent;

  const tagline = blok?.tagline || brochure.tagline;
  const title = blok?.title || brochure.title;
  const description = blok?.description || brochure.description;
  const pdfPath = blok?.pdfPath || brochure.pdfPath;
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        body: JSON.stringify({ ...formData, type: "Brochure Download Form" }),
      });

      if (response.ok) {
        setStatus("success");
        // Trigger actual download of brochure
        const link = document.createElement("a");
        link.href = pdfPath;
        link.download = "Vantara-Heritage-Brochure.pdf";
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Brochure download trigger failed:", error);
      setStatus("error");
    }
  };

  return (
    <section className={`section-padding ${styles.brochureSection}`} id="download-brochure">
      <div className="container">
        <div className={styles.grid}>
          {/* Left Column: Visual Mock Booklet */}
          <div className={styles.visualCol}>
            <div className={styles.bookWrapper}>
              <div className={styles.book}>
                <div className={styles.bookCover}>
                  <div className={styles.coverDesign}>
                    <span className={styles.coverBadge}>Gated Villa Plots</span>
                    <h3 className={styles.coverTitle}>VANTARA</h3>
                    <span className={styles.coverSubtitle}>HERITAGE</span>
                    <hr className={styles.coverLine} />
                    <p className={styles.coverFooter}>Brijghat, Garhmukteshwar</p>
                  </div>
                </div>
                <div className={styles.bookPages}>
                  <div className={styles.pageDetails}>
                    <span>Plot Plans</span>
                    <span>Zoning Rules</span>
                    <span>VIP Amenities</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Form */}
          <div className={styles.formCol}>
            <div className="section-header left">
              <span className="section-tagline">{tagline}</span>
              <h2 className="section-title">{title}</h2>
              <p className={styles.description}>{description}</p>
            </div>

            {status === "success" ? (
              <div className={styles.successMessage}>
                <div className={styles.successIcon}>
                  <svg
                    width="32"
                    height="32"
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
                <div>
                  <h4>Download Started!</h4>
                  <p>
                    Thank you. The high-resolution PDF brochure is now downloading. If it didn't trigger,{" "}
                    <a href={pdfPath} download className={styles.directLink}>
                      click here to download directly
                    </a>
                    .
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.downloadForm}>
                <div className={styles.formGrid}>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Your Name *"
                    className={styles.inputField}
                  />

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    pattern="^[0-9\-\+\s]{10,15}$"
                    placeholder="Mobile Number *"
                    className={styles.inputField}
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address (Optional)"
                    className={styles.inputField}
                  />
                </div>

                {status === "error" && (
                  <p className={styles.errorText}>Submission failed. Please check internet connection and try again.</p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className={`btn btn-accent ${styles.submitBtn}`}
                >
                  {status === "submitting" ? "Processing..." : "Download PDF Brochure"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
