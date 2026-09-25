export interface NavLink {
  label: string;
  href: string;
}

/**
 * Section links use the "/#section" form so they work from any page.
 * The Navbar rewrites them to "#section" when already on the home page.
 */
export const NAV_LINKS: readonly NavLink[] = [
  { label: "Services", href: "/#services" },
  { label: "Architecture", href: "/#architecture" },
  { label: "Capabilities", href: "/#capabilities" },
  { label: "Insights", href: "/#insights" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
];
