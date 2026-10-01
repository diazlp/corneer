"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  ChevronDown,
  Menu,
  MessageSquare,
  Search,
  X,
} from "lucide-react";
import { useState } from "react";
import { DemoRole, useDemo } from "@/components/demo-provider";

const roleHomes: Record<DemoRole, string> = {
  public: "/",
  buyer: "/buyer/rfqs",
  supplier: "/supplier/opportunities",
  admin: "/admin/verification",
};

const navItems: Record<DemoRole, { label: string; href: string }[]> = {
  public: [
    { label: "Find suppliers", href: "/suppliers" },
    { label: "Browse products", href: "/products" },
    { label: "How it works", href: "/#how-it-works" },
  ],
  buyer: [
    { label: "My RFQs", href: "/buyer/rfqs" },
    { label: "Find suppliers", href: "/suppliers" },
    { label: "Products", href: "/products" },
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
  const effectiveRole: DemoRole = pathname.startsWith("/buyer/")
    ? "buyer"
    : pathname.startsWith("/supplier/opportunities")
      ? "supplier"
      : pathname.startsWith("/admin/")
        ? "admin"
        : pathname.startsWith("/messages")
          ? role === "supplier"
            ? "supplier"
            : "buyer"
          : role;

  const changeRole = (nextRole: DemoRole) => {
    setRole(nextRole);
    setRoleOpen(false);
    setMobileOpen(false);
    router.push(roleHomes[nextRole]);
  };

  return (
    <>
      <div className="demo-bar">
        <span className="demo-pulse" />
        Interactive concept · All companies and opportunities are fictional
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <Link
            href={roleHomes[effectiveRole]}
            className="brand"
            aria-label="Corneer home"
          >
            <span className="brand-mark">
              <i />
              <i />
            </span>
            <span>CORNEER</span>
          </Link>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems[effectiveRole].map((item) => (
              <Link
                key={item.href + item.label}
                className={pathname === item.href ? "active" : ""}
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
            {effectiveRole !== "public" && (
              <>
                <Link
                  className="icon-button desktop-only"
                  href="/messages"
                  aria-label="Messages"
                >
                  <MessageSquare size={18} />
                </Link>
                <button
                  className="icon-button desktop-only"
                  aria-label="Notifications"
                >
                  <Bell size={18} />
                  <span className="notification-dot" />
                </button>
              </>
            )}
            <div className="role-menu">
              <button
                className="role-trigger"
                onClick={() => setRoleOpen(!roleOpen)}
              >
                <span className={`role-avatar role-${effectiveRole}`}>
                  {effectiveRole === "public"
                    ? "D"
                    : effectiveRole.charAt(0).toUpperCase()}
                </span>
                <span>
                  <small>View demo as</small>
                  {effectiveRole === "public" ? "Visitor" : effectiveRole}
                </span>
                <ChevronDown size={15} />
              </button>
              {roleOpen && (
                <div className="role-dropdown">
                  {(["public", "buyer", "supplier", "admin"] as DemoRole[]).map(
                    (item) => (
                      <button
                        key={item}
                        onClick={() => changeRole(item)}
                        className={effectiveRole === item ? "selected" : ""}
                      >
                        <span className={`role-avatar role-${item}`}>
                          {item === "public"
                            ? "D"
                            : item.charAt(0).toUpperCase()}
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
            <button
              className="mobile-menu-button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Open navigation"
            >
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <nav className="mobile-nav">
            {navItems[effectiveRole].map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/suppliers" onClick={() => setMobileOpen(false)}>
              <Search size={16} /> Search marketplace
            </Link>
          </nav>
        )}
      </header>
    </>
  );
}
