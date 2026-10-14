import { useCallback, useState } from "react";
import { portalSections } from "./portalSections.js";

export default function usePortalNavigation() {
  const [activeSection, setActiveSection] = useState("inicio");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navigate = useCallback((section) => {
    if (!portalSections[section]) return;
    setActiveSection(section);
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  }, []);

  const resetNavigation = useCallback(() => {
    setActiveSection("inicio");
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  }, []);

  return { activeSection, mobileMenuOpen, setMobileMenuOpen, userMenuOpen, setUserMenuOpen, navigate, resetNavigation };
}