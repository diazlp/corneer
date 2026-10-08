"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { DemoRole, useDemo } from "@/components/demo-provider";

const roleHomes: Record<DemoRole, string> = {
  public: "/",
  buyer: "/buyer/rfqs",
  supplier: "/supplier/opportunities",
  admin: "/admin/verification",
};

const navItems: Record<DemoRole, { label: string; href: string }[]> = {
  public: [
    { label: "Browse suppliers", href: "/suppliers" },
    { label: "My requests", href: "/buyer/rfqs" },
    { label: "How it works", href: "/#how-it-works" },
  ],
  buyer: [
    { label: "Browse suppliers", href: "/suppliers" },
    { label: "My requests", href: "/buyer/rfqs" },
    { label: "Messages", href: "/messages" },
  ],
  supplier: [
    { label: "Opportunities", href: "/supplier/opportunities" },
    { label: "Company profile", href: "/suppliers/pearl-river" },
    { label: "Products", href: "/products" },
    { label: "Messages", href: "/messages" },
  ],
  admin: [
    { label: "Verification", href: "/admin/verification" },
    { label: "RFQ review", href: "/admin/verification?tab=rfqs" },
    { label: "Directory", href: "/suppliers" },
  ],
};

export function SiteHeader() {
  const { role, setRole, locale, setLocale } = useDemo();
  const pathname = usePathname();
  const router = useRouter();
  const [roleOpen, setRoleOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const roleMenuRef = useRef<HTMLDivElement>(null);
  const roleTriggerRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const mobileTriggerRef = useRef<HTMLButtonElement>(null);
  const effectiveRole = role;

  useEffect(() => {
    if (!roleOpen && !mobileOpen) return;

    const dismissOutside = (event: PointerEvent) => {
      if (!(event.target instanceof Node)) return;
      if (!roleMenuRef.current?.contains(event.target)) setRoleOpen(false);
      if (!headerRef.current?.contains(event.target)) setMobileOpen(false);
    };
    const dismissEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (roleOpen) roleTriggerRef.current?.focus();
      if (mobileOpen) mobileTriggerRef.current?.focus();
      setRoleOpen(false);
      setMobileOpen(false);
    };
    document.addEventListener("pointerdown", dismissOutside);
    document.addEventListener("keydown", dismissEscape);
    return () => {
      document.removeEventListener("pointerdown", dismissOutside);
      document.removeEventListener("keydown", dismissEscape);
    };
  }, [roleOpen, mobileOpen]);

  const changeRole = (nextRole: DemoRole) => {
    setRole(nextRole);
    setRoleOpen(false);
    setMobileOpen(false);
    router.push(roleHomes[nextRole]);
  };

  return (
    <>
      <div className="demo-bar">
        <div className="container demo-controls">
          <span>Frontend demo · Fictional companies and opportunities</span>
          <div className="role-menu" ref={roleMenuRef}>
            <button
              ref={roleTriggerRef}
              type="button"
              className="role-trigger demo-switch"
              onClick={() => setRoleOpen(!roleOpen)}
              aria-expanded={roleOpen}
              aria-controls="demo-role-options"
              aria-label="Switch demo view"
            >
              <span className={`role-avatar role-${effectiveRole}`}>
                {effectiveRole === "public"
                  ? "D"
                  : effectiveRole.charAt(0).toUpperCase()}
              </span>
              <span>
                <small>Demo view</small>
                {effectiveRole === "public" ? "Visitor" : effectiveRole}
              </span>
              <ChevronDown size={15} />
            </button>
            {roleOpen && (
              <div className="role-dropdown" id="demo-role-options">
                {(["public", "buyer", "supplier", "admin"] as DemoRole[]).map(
                  (item) => (
                    <button
                      type="button"
                      key={item}
                      onClick={() => changeRole(item)}
                      className={effectiveRole === item ? "selected" : ""}
                      aria-pressed={effectiveRole === item}
                    >
                      <span className={`role-avatar role-${item}`}>
                        {item === "public" ? "D" : item.charAt(0).toUpperCase()}
                      </span>
                      <span>
                        {item === "public" ? "Visitor" : item}
                        <small>
                          {item === "public"
                            ? "Public marketplace"
                            : `${item} workspace`}
                        </small>
                      </span>
                      {effectiveRole === item && (
                        <span className="checkmark">✓</span>
                      )}
                    </button>
                  ),
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <header className="site-header" ref={headerRef}>
        <div className="container header-inner">
          <Link
            href="/"
            className="brand"
            aria-label="Corneer home"
            onClick={() => setMobileOpen(false)}
          >
            <img
              className="brand-mark"
              src="/icon.svg"
              width={32}
              height={32}
              alt=""
            />
            <span>CORNEER</span>
          </Link>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems[effectiveRole].map((item) => (
              <Link
                key={item.href + item.label}
                className={
                  pathname === item.href || pathname.startsWith(item.href + "/")
                    ? "active"
                    : ""
                }
                aria-current={
                  pathname === item.href || pathname.startsWith(item.href + "/")
                    ? "page"
                    : undefined
                }
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <div
              className="language-switch"
              role="group"
              aria-label="Language / Bahasa"
            >
              <button
                type="button"
                aria-pressed={locale === "id"}
                className={locale === "id" ? "active" : ""}
                onClick={() => setLocale("id")}
                title="Bahasa Indonesia"
              >
                ID
              </button>
              <button
                type="button"
                aria-pressed={locale === "en"}
                className={locale === "en" ? "active" : ""}
                onClick={() => setLocale("en")}
                title="English"
              >
                EN
              </button>
            </div>
            <button
              ref={mobileTriggerRef}
              type="button"
              className="mobile-menu-button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <nav
            className="mobile-nav"
            id="mobile-navigation"
            aria-label="Primary navigation"
          >
            {navItems[effectiveRole].map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}
