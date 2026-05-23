"use client";

import React, { useState, useEffect } from "react";
import { websiteContent } from "../data/websiteContent";
import styles from "../styles/EnquiryModal.module.css";

interface EnquiryModalProps {
  isOpenOverride: boolean;
  initialSubject?: string;
  onCloseOverride: () => void;
}

export default function EnquiryModal({ isOpenOverride, initialSubject = "", onCloseOverride }: EnquiryModalProps) {
  const { siteSettings } = websiteContent;
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  // Delayed trigger on mount (only if not overridden)
  useEffect(() => {
    if (isOpenOverride) {
      setIsOpen(true);
      // Pre-fill message if dynamic subject is provided
      if (initialSubject) {
        setFormData((prev) => ({ ...prev, message: `Interested in: ${initialSubject}` }));
      }
      return;
    }

    // Check if dismissed in this session
    const isDismissed = sessionStorage.getItem("vh-modal-dismissed");
    if (isDismissed === "true") return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 7000); // 7 seconds delay matching original

    return () => clearTimeout(timer);
  }, [isOpenOverride, initialSubject]);

  const handleClose = () => {
    setIsOpen(false);
    onCloseOverride();
    sessionStorage.setItem("vh-modal-dismissed", "true");
  };

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
        body: JSON.stringify({ ...formData, type: `PopUp Modal Enquiry - Subject: ${initialSubject || "General"}` }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
        // Auto-close success modal after 3 seconds
        setTimeout(() => {
          handleClose();
          setStatus("idle");
        }, 3000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Lead submission error:", error);
      setStatus("error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className={styles.closeBtn} onClick={handleClose} aria-label="Close popup modal">
          &times;
        </button>

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
            <h3>Request Received!</h3>
            <p>Thank you for connecting with Vantara Heritage. We will contact you momentarily.</p>
          </div>
        ) : (
          <>
            {/* Header info */}
            <div className={styles.modalHeader}>
              <div className={styles.logoBadge}>VH</div>
              <h3 className={styles.title}>{siteSettings.logoText}</h3>
              <span className={styles.subtitle}>Gated Plots near Garh Ganga</span>
              <div className={styles.priceCallout}>
                <span className={styles.priceLabel}>Starting Price</span>
                <span className={styles.priceValue}>₹ 11,999/- Sq.Yd.</span>
              </div>
            </div>

            {/* Callback form */}
            <form onSubmit={handleSubmit} className={styles.actualForm}>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Your Name *"
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
                  placeholder="Mobile Number *"
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
                  rows={2}
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
                {status === "submitting" ? "Registering Request..." : "Request Call"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
