import React from "react";
import { websiteContent } from "../data/websiteContent";
import styles from "../styles/Footer.module.css";

export default function Footer({ siteSettings: blok }: { siteSettings?: any }) {
  const { siteSettings, navigation } = websiteContent;

  const logoText = blok?.logoText || siteSettings.logoText;
  const address = blok?.address || siteSettings.address;
  const phoneNumber = blok?.phoneNumber || siteSettings.phoneNumber;
  const phoneFormatted = blok?.phoneFormatted || siteSettings.phoneFormatted;
  const email = blok?.email || siteSettings.email;
  const copyright = blok?.copyright || siteSettings.copyright;

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          {/* Brand Info */}
          <div className={styles.brandInfo}>
            <div className={styles.logoContainer}>
              <img src="/project-logo.webp" alt="Vantara Heritage Logo" style={{ height: "45px", width: "auto", borderRadius: "4px" }} />
              <span className={styles.logoText}>
                {logoText}
                <span className={styles.logoSubtext}>Garhmukteshwar</span>
              </span>
            </div>
            <p className={styles.brandDescription}>
              Vantara Heritage is a prestigious gated plotted residential development located near the sacred banks of Garh Ganga Ji in Brijghat Garhmukteshwar. Experience a secure, traditional, and premium spiritual lifestyle.
            </p>
          </div>

          {/* Quick Links */}
          <div className={styles.linkGroup}>
            <h4 className={styles.groupTitle}>Explore</h4>
            <ul className={styles.linkList}>
              {navigation.slice(0, 5).map((item) => (
                <li key={item.hash}>
                  <a href={item.hash} className={styles.footerLink}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column 2 */}
          <div className={styles.linkGroup}>
            <h4 className={styles.groupTitle}>Resources</h4>
            <ul className={styles.linkList}>
              {navigation.slice(5).map((item) => (
                <li key={item.hash}>
                  <a href={item.hash} className={styles.footerLink}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className={styles.contactDetails}>
            <h4 className={styles.groupTitle}>Township Office</h4>
            <p className={styles.contactText}>
              <strong>Location:</strong> {address}
            </p>
            <p className={styles.contactText}>
              <strong>Direct Call:</strong>{" "}
              <a href={`tel:${phoneNumber}`} className={styles.highlightLink}>
                {phoneFormatted}
              </a>
            </p>
            <p className={styles.contactText}>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${email}`} className={styles.highlightLink}>
                {email}
              </a>
            </p>
          </div>
        </div>

        <hr className={styles.divider} />

        {/* Legal & Copyright */}
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>{copyright}</p>
          <div className={styles.legalLinks}>
            <a href="/privacy-policy" className={styles.legalLink}>
              Disclaimer & Privacy Policy
            </a>
            <span className={styles.legalSeparator}>|</span>
            <a href="/sitemap.xml" className={styles.legalLink}>
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
