"use client";

import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Locale, translate } from "@/lib/i18n";

export type DemoRole = "public" | "buyer" | "supplier" | "admin";

type Toast = { id: number; message: string } | null;

type DemoContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (source: string) => string;
  role: DemoRole;
  setRole: (role: DemoRole) => void;
  identityRevealed: boolean;
  revealIdentity: () => void;
  shortlisted: string[];
  toggleShortlist: (supplierId: string) => void;
  toast: (message: string) => void;
};

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("id");
  const [localeReady, setLocaleReady] = useState(false);
  const [role, setRoleState] = useState<DemoRole>("public");
  const [identityRevealed, setIdentityRevealed] = useState(false);
  const [shortlisted, setShortlisted] = useState<string[]>(["pearl-river"]);
  const [activeToast, setActiveToast] = useState<Toast>(null);
  const originalText = useRef(new WeakMap<Text, string>());
  const originalAttributes = useRef(
    new WeakMap<Element, Map<string, string>>(),
  );
  const originalValues = useRef(
    new WeakMap<HTMLInputElement | HTMLTextAreaElement, string>(),
  );
  const initialLocalizationDone = useRef(false);

  useLayoutEffect(() => {
    let mounted = true;
    const saved = window.localStorage.getItem("corneer-demo-locale");
    queueMicrotask(() => {
      if (!mounted) return;
      if (saved === "en" || saved === "id") setLocaleState(saved);
      setLocaleReady(true);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const setLocale = (nextLocale: Locale) => {
    window.localStorage.setItem("corneer-demo-locale", nextLocale);
    setLocaleState(nextLocale);
  };

  useEffect(() => {
    if (!localeReady) return;
    document.documentElement.lang = locale;
    const root = document.getElementById("corneer-app");
    if (!root) return;

    const localizeNode = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const textNode = node as Text;
        const current = textNode.nodeValue ?? "";
        let source = originalText.current.get(textNode);
        if (
          source === undefined ||
          (current !== source && current !== translate("id", source))
        ) {
          source = current;
          originalText.current.set(textNode, source);
        }
        const next = translate(locale, source);
        if (current !== next) textNode.nodeValue = next;
        return;
      }
      if (node.nodeType !== Node.ELEMENT_NODE) return;
      const element = node as Element;
      if (
        element instanceof HTMLTextAreaElement ||
        (element instanceof HTMLInputElement &&
          ["text", "search"].includes(element.type))
      ) {
        const source =
          originalValues.current.get(element) ?? element.defaultValue;
        originalValues.current.set(element, source);
        if (
          element.value === source ||
          element.value === translate("id", source)
        ) {
          const next = translate(locale, source);
          if (element.value !== next) element.value = next;
          if (element.defaultValue !== next) element.defaultValue = next;
        }
      }
      if (element.tagName === "OPTION" && !element.hasAttribute("value")) {
        element.setAttribute("value", element.textContent?.trim() ?? "");
      }
      for (const name of ["placeholder", "aria-label", "title", "alt"]) {
        const current = element.getAttribute(name);
        if (current === null) continue;
        let attributes = originalAttributes.current.get(element);
        if (!attributes) {
          attributes = new Map();
          originalAttributes.current.set(element, attributes);
        }
        let source = attributes.get(name);
        if (
          source === undefined ||
          (current !== source && current !== translate("id", source))
        ) {
          source = current;
          attributes.set(name, source);
        }
        const next = translate(locale, source);
        if (current !== next) element.setAttribute(name, next);
      }
      element.childNodes.forEach(localizeNode);
    };

    let observer: MutationObserver | undefined;
    let timer: number | undefined;
    const startLocalization = () => {
      localizeNode(root);
      observer = new MutationObserver((records) => {
        for (const record of records) {
          if (record.type === "characterData" || record.type === "attributes") {
            localizeNode(record.target);
          } else {
            record.addedNodes.forEach(localizeNode);
          }
        }
      });
      observer.observe(root, {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true,
        attributeFilter: ["placeholder", "aria-label", "title", "alt"],
      });
      initialLocalizationDone.current = true;
    };
    if (initialLocalizationDone.current) {
      startLocalization();
    } else {
      // ponytail: Demo-only delay keeps DOM edits behind hydration; use explicit localized rendering for real content.
      timer = window.setTimeout(startLocalization, 500);
    }
    return () => {
      if (timer) window.clearTimeout(timer);
      observer?.disconnect();
    };
  }, [locale, localeReady]);

  const setRole = (nextRole: DemoRole) => {
    setRoleState(nextRole);
    window.localStorage.setItem("corneer-demo-role", nextRole);
  };

  const toast = (message: string) => {
    const id = Date.now();
    setActiveToast({ id, message });
    window.setTimeout(
      () => setActiveToast((current) => (current?.id === id ? null : current)),
      2800,
    );
  };

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: (source: string) => translate(locale, source),
      role,
      setRole,
      identityRevealed,
      revealIdentity: () => {
        setIdentityRevealed(true);
        toast("Buyer identity shared with Pearl River Performance Wear");
      },
      shortlisted,
      toggleShortlist: (supplierId: string) => {
        setShortlisted((current) =>
          current.includes(supplierId)
            ? current.filter((id) => id !== supplierId)
            : [...current, supplierId],
        );
      },
      toast,
    }),
    [locale, role, identityRevealed, shortlisted],
  );

  return (
    <DemoContext.Provider value={value}>
      <div id="corneer-app">
        {children}
        {activeToast && (
          <div className="toast">
            <span>✓</span>
            {activeToast.message}
          </div>
        )}
      </div>
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) throw new Error("useDemo must be used inside DemoProvider");
  return context;
}
