"use client";

import React, { useState, useEffect } from "react";
import { websiteContent } from "../data/websiteContent";
import styles from "../styles/Header.module.css";

export default function Header({ siteSettings: blok }: { siteSettings?: any }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { siteSettings, navigation } = websiteContent;

  const logoText = blok?.logoText || siteSettings.logoText;
  const phoneNumber = blok?.phoneNumber || siteSettings.phoneNumber;
  const phoneFormatted = blok?.phoneFormatted || siteSettings.phoneFormatted;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (!mobileMenuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    document.body.classList.remove("no-scroll");
  };

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <div className={`container ${styles.headerContainer}`}>
          {/* Logo Section */}
          <a href="#home" className={styles.logoContainer} onClick={closeMobileMenu}>
            <img src="/project-logo.webp" alt="Vantara Heritage Logo" style={{ height: "42px", width: "auto", borderRadius: "4px" }} />
            <span className={styles.logoText}>
              {logoText}
              <span className={styles.logoSubtext}>Garhmukteshwar</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            {navigation.map((item) => (
              <a key={item.hash} href={item.hash} className={styles.navLink}>
                {item.label}
              </a>
            ))}
          </nav>

          {/* Call to Action Button */}
          <div className={styles.actions}>
            <a href={`tel:${phoneNumber}`} className={`btn ${styles.callBtn}`}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <div className={styles.callDetails}>
                <span className={styles.callLabel}>VIP Line</span>
                <span className={styles.callNum}>{phoneFormatted}</span>
              </div>
            </a>

            {/* Hamburger button for mobile */}
            <button
              className={`${styles.hamburger} ${mobileMenuOpen ? styles.hamburgerActive : ""}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div className={`${styles.mobileDrawer} ${mobileMenuOpen ? styles.drawerOpen : ""}`}>
        <div className={styles.drawerHeader}>
          <img src="/project-logo.webp" alt="Vantara Heritage Logo" style={{ height: "40px", width: "auto", borderRadius: "4px" }} />
          <span className={styles.drawerLogoText}>{logoText}</span>
          <button className={styles.closeBtn} onClick={toggleMobileMenu} aria-label="Close menu">
            &times;
          </button>
        </div>
        <nav className={styles.mobileNav}>
          {navigation.map((item) => (
            <a
              key={item.hash}
              href={item.hash}
              className={styles.mobileNavLink}
              onClick={closeMobileMenu}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className={styles.drawerFooter}>
          <p className={styles.drawerFooterText}>Contact our relationship manager today</p>
          <a href={`tel:${phoneNumber}`} className={`btn btn-primary ${styles.drawerCall}`}>
            Call Now
          </a>
        </div>
      </div>

      {/* Backdrop overlay */}
      {mobileMenuOpen && <div className={styles.backdrop} onClick={closeMobileMenu} />}
    </>
  );
}
