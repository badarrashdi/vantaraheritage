"use client";

import React, { createContext, useContext, useState } from "react";
import EnquiryModal from "../components/EnquiryModal";

interface EnquiryContextType {
  openEnquiry: (subject: string) => void;
  closeEnquiry: () => void;
}

const EnquiryContext = createContext<EnquiryContextType | undefined>(undefined);

export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [subject, setSubject] = useState("");

  const openEnquiry = (sub: string) => {
    setSubject(sub);
    setIsOpen(true);
  };

  const closeEnquiry = () => {
    setIsOpen(false);
    setSubject("");
  };

  return (
    <EnquiryContext.Provider value={{ openEnquiry, closeEnquiry }}>
      {children}
      <EnquiryModal
        isOpenOverride={isOpen}
        initialSubject={subject}
        onCloseOverride={closeEnquiry}
      />
    </EnquiryContext.Provider>
  );
}

export function useEnquiry() {
  const context = useContext(EnquiryContext);
  if (!context) {
    throw new Error("useEnquiry must be used within an EnquiryProvider");
  }
  return context;
}
