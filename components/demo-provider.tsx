"use client";

import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Locale, translate } from "@/lib/i18n";
import { RFQ, RFQResponse, rfqs, rfqResponses } from "@/lib/data";
import { canReveal } from "@/lib/sourcing";
import { usePathname } from "next/navigation";

export type DemoRole = "public" | "buyer" | "supplier" | "admin";

type Toast = { id: number; message: string } | null;
export type DemoMessage = { id: string; text: string; side: "me" | "them" };

type DemoContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (source: string) => string;
  role: DemoRole;
  setRole: (role: DemoRole) => void;
  requests: RFQ[];
  responses: RFQResponse[];
  createRequest: (request: RFQ) => void;
  addResponse: (response: RFQResponse) => void;
  shortlists: Record<string, string[]>;
  reveals: Record<string, string[]>;
  revealIdentity: (requestId: string, supplierId: string) => void;
  toggleShortlist: (requestId: string, supplierId: string) => void;
  messages: Record<string, DemoMessage[]>;
  sendMessage: (key: string, text: string) => void;
  meetings: Record<string, string>;
  requestMeeting: (key: string, date: string) => void;
  toast: (message: string) => void;
};

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("id");
  const [localeReady, setLocaleReady] = useState(false);
  const [selectedRole, setRoleState] = useState<DemoRole>("public");
  const pathname = usePathname();
  const routeRole: DemoRole | undefined = pathname.startsWith("/buyer/")
    ? "buyer"
    : pathname.startsWith("/supplier/")
      ? "supplier"
      : pathname.startsWith("/admin/")
        ? "admin"
        : undefined;
  const role =
    routeRole ??
    (pathname === "/messages" && selectedRole !== "supplier"
      ? "buyer"
      : selectedRole);
  const [requests, setRequests] = useState(rfqs);
  const [responses, setResponses] = useState(rfqResponses);
  const [shortlists, setShortlists] = useState<Record<string, string[]>>({});
  const [reveals, setReveals] = useState<Record<string, string[]>>({});
  const [messages, setMessages] = useState<Record<string, DemoMessage[]>>({});
  const [meetings, setMeetings] = useState<Record<string, string>>({});
  const [activeToast, setActiveToast] = useState<Toast>(null);
  const originalText = useRef(new WeakMap<Text, string>());
  const originalAttributes = useRef(
    new WeakMap<Element, Map<string, string>>(),
  );
  const originalValues = useRef(
    new WeakMap<HTMLInputElement | HTMLTextAreaElement, string>(),
  );
  const initialLocalizationDone = useRef(false);

  useEffect(() => {
    if (!routeRole) return;
    queueMicrotask(() => setRoleState(routeRole));
  }, [routeRole]);

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
  };

  const toast = (message: string) => {
    const id = Date.now();
    setActiveToast({ id, message });
    window.setTimeout(
      () => setActiveToast((current) => (current?.id === id ? null : current)),
      2800,
    );
  };

  const value: DemoContextValue = {
    locale,
    setLocale,
    t: (source: string) => translate(locale, source),
    role,
    setRole,
    requests,
    responses,
    createRequest: (request) => setRequests((current) => [request, ...current]),
    addResponse: (response) =>
      setResponses((current) => [
        ...current.filter(
          (item) =>
            !(
              item.rfqId === response.rfqId &&
              item.supplierId === response.supplierId
            ),
        ),
        response,
      ]),
    shortlists,
    reveals,
    revealIdentity: (requestId, supplierId) => {
      if (!canReveal(shortlists[requestId] ?? [], supplierId)) return;
      setReveals((current) => ({
        ...current,
        [requestId]: [...new Set([...(current[requestId] ?? []), supplierId])],
      }));
    },
    toggleShortlist: (requestId, supplierId) => {
      setShortlists((current) => {
        const selected = current[requestId] ?? [];
        return {
          ...current,
          [requestId]: selected.includes(supplierId)
            ? selected.filter((id) => id !== supplierId)
            : [...selected, supplierId],
        };
      });
    },
    messages,
    sendMessage: (key, text) => {
      if (!text.trim()) return;
      setMessages((current) => ({
        ...current,
        [key]: [
          ...(current[key] ?? []),
          {
            id: crypto.randomUUID(),
            side: role === "supplier" ? "them" : "me",
            text: text.trim(),
          },
        ],
      }));
    },
    meetings,
    requestMeeting: (key, date) =>
      setMeetings((current) => ({ ...current, [key]: date })),
    toast,
  };

  return (
    <DemoContext.Provider value={value}>
      <div id="corneer-app">
        {children}
        {activeToast && (
          <div className="toast" role="status">
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
