"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, CalendarDays, Send, ShieldCheck } from "lucide-react";
import { getSupplier } from "@/lib/data";
import { threadKey } from "@/lib/sourcing";
import { useDemo } from "@/components/demo-provider";

export function MessageCenter({ initialKey }: { initialKey?: string }) {
  const {
    requests,
    responses,
    reveals,
    messages,
    sendMessage,
    meetings,
    requestMeeting,
    role,
    t,
  } = useDemo();
  const [selectedKey, setSelectedKey] = useState(initialKey ?? "");
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [showInbox, setShowInbox] = useState(false);
  const [meetingOpen, setMeetingOpen] = useState(false);
  const threads = requests.flatMap((request) =>
    (reveals[request.id] ?? []).flatMap((id) => {
      const supplier = getSupplier(id);
      return supplier && (role !== "supplier" || id === "pearl-river")
        ? [{ key: threadKey(request.id, id), request, supplier }]
        : [];
    }),
  );
  const active = threads.find((item) => item.key === selectedKey) ?? threads[0];
  const supplierView = role === "supplier";
  const title = active
    ? `${supplierView ? "Northline Athletics ApS" : active.supplier.name} — ${active.request.title} | Corneer`
    : "Conversations & meeting proposals | Corneer";
  if (!active)
    return (
      <div className="container empty-state">
        <title>{title}</title>
        <ShieldCheck size={32} />
        <h1>
          {supplierView
            ? "No buyer has shared identity yet"
            : "Choose a company before starting a conversation"}
        </h1>
        <p>
          {supplierView
            ? "A conversation appears after a buyer chooses your company and shares their identity."
            : "Review companies, save one to your shortlist, then deliberately share your identity with that company."}
        </p>
        <Link
          href={
            supplierView
              ? "/supplier/opportunities"
              : "/buyer/rfqs/rfq-recycled-running"
          }
          className="button button-dark"
        >
          {supplierView ? "Review buyer requests" : "Walk through an example"}
        </Link>
        {!supplierView && (
          <Link href="/buyer/rfqs" className="text-link">
            My requests
          </Link>
        )}
      </div>
    );
  const draft = drafts[active.key] ?? "";
  const setDraft = (text: string) =>
    setDrafts((current) => ({ ...current, [active.key]: text }));
  const suggestion = supplierView
    ? "Thank you for sharing your order. Could we review the specifications, style quantities, and target delivery before confirming a quotation?"
    : (responses.find(
        (item) =>
          item.rfqId === active.request.id &&
          item.supplierId === active.supplier.id,
      )?.question ??
      "Could you confirm the minimum per style and color, material documentation, sampling time, and availability for our delivery date?");
  const send = () => {
    if (!draft.trim()) return;
    sendMessage(active.key, draft);
    setDraft("");
  };
  return (
    <div className={`message-app${showInbox ? " show-inbox" : ""}`}>
      <title>{title}</title>
      <aside className="conversation-panel">
        <div className="conversation-heading">
          <div>
            <span className="workspace-label">Your conversations</span>
            <h1>Messages</h1>
          </div>
        </div>
        <p className="inbox-note">
          {supplierView
            ? "Buyers appear here only after sharing their identity with your company."
            : "Only companies you shared your identity with appear here."}
        </p>
        <div className="conversation-list">
          {threads.map((thread) => (
            <button
              key={thread.key}
              className={thread.key === active.key ? "active" : ""}
              onClick={() => {
                setSelectedKey(thread.key);
                setShowInbox(false);
                setMeetingOpen(false);
              }}
            >
              <span
                className="conversation-avatar"
                style={{ background: thread.supplier.logoColor }}
              >
                {supplierView ? "NA" : thread.supplier.shortName}
              </span>
              <span className="conversation-copy">
                <strong>
                  {supplierView
                    ? "Northline Athletics ApS"
                    : thread.supplier.name}
                </strong>
                <small>{thread.request.title}</small>
                <p>
                  {messages[thread.key]?.at(-1)?.text ??
                    t("Ready to discuss your order")}
                </p>
              </span>
            </button>
          ))}
        </div>
        <Link
          className="inbox-note text-link"
          href={supplierView ? "/supplier/opportunities" : "/buyer/rfqs"}
        >
          {supplierView ? "Opportunities" : "My requests"}
        </Link>
      </aside>
      <section className="chat-panel">
        <header className="chat-header">
          <button
            className="message-back"
            aria-label="Back to conversations"
            onClick={() => setShowInbox(true)}
          >
            <ArrowLeft />
          </button>
          <div className="chat-company">
            <span style={{ background: active.supplier.logoColor }}>
              {supplierView ? "NA" : active.supplier.shortName}
            </span>
            <div>
              <strong>
                {supplierView
                  ? "Northline Athletics ApS"
                  : active.supplier.name}
              </strong>
              <small>{supplierView ? "Buyer" : active.supplier.type}</small>
            </div>
          </div>
          <button
            className="button button-secondary"
            aria-expanded={meetingOpen}
            onClick={() => setMeetingOpen(!meetingOpen)}
          >
            <CalendarDays size={16} />
            Propose a meeting
          </button>
        </header>
        <div className="opportunity-context">
          <ShieldCheck />
          <strong>{active.request.title}</strong>
          {supplierView ? (
            <details>
              <summary>View order</summary>
              <p>{active.request.quantity}</p>
              <p>{active.request.material}</p>
              <p>{active.request.description}</p>
            </details>
          ) : (
            <Link href={`/buyer/rfqs/${active.request.id}`}>View order</Link>
          )}
        </div>
        <div className="chat-scroll">
          <div className="system-message">
            <ShieldCheck />
            <p>
              <strong>Company identity shared for this conversation</strong>
              Northline Athletics ApS · Copenhagen · northline.run
            </p>
          </div>
          <p className="request-notice">
            Demo conversation. Messages and meeting proposals stay in this
            session; nothing is sent externally.
          </p>
          {meetings[active.key] && (
            <div className="meeting-proposal" role="status">
              <CalendarDays />
              <div>
                <strong>Meeting proposed</strong>
                <p>{meetings[active.key]}</p>
                <small>
                  Awaiting confirmation. No calendar invitation sent.
                </small>
              </div>
            </div>
          )}
          {meetingOpen && (
            <form
              className="meeting-form"
              onSubmit={(event) => {
                event.preventDefault();
                const values = new FormData(event.currentTarget);
                requestMeeting(
                  active.key,
                  `${String(values.get("date")).replace("T", " · ")} · ${values.get("zone")}`,
                );
                setMeetingOpen(false);
              }}
            >
              <h3>Suggest a time to discuss the order</h3>
              <label className="field">
                <span>Date and time</span>
                <input type="datetime-local" name="date" required />
              </label>
              <label className="field">
                <span>Time zone</span>
                <select name="zone" defaultValue="Asia/Bangkok">
                  <option>Asia/Bangkok</option>
                  <option>Europe/Copenhagen</option>
                  <option>UTC</option>
                </select>
              </label>
              <div className="response-actions">
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={() => setMeetingOpen(false)}
                >
                  Cancel
                </button>
                <button className="button button-dark" type="submit">
                  Save meeting proposal
                </button>
              </div>
            </form>
          )}
          {(messages[active.key] ?? []).map((message) => (
            <div
              className={`chat-message ${supplierView ? (message.side === "me" ? "them" : "me") : message.side}`}
              key={message.id}
            >
              <div>
                <p>{message.text}</p>
                <span>
                  {message.side === "me" ? t("Buyer") : t("Supplier")} ·{" "}
                  {t("Demo message")}
                </span>
              </div>
            </div>
          ))}
          {!messages[active.key]?.length && (
            <div className="conversation-starter">
              <span className="eyebrow">A useful first question</span>
              <p>{t(suggestion)}</p>
              <button
                className="button button-secondary button-small"
                onClick={() => setDraft(t(suggestion))}
              >
                Use this question
              </button>
            </div>
          )}
        </div>
        <form
          className="message-composer"
          onSubmit={(event) => {
            event.preventDefault();
            send();
          }}
        >
          <textarea
            aria-label="Your message"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (
                event.key === "Enter" &&
                !event.shiftKey &&
                !event.nativeEvent.isComposing
              ) {
                event.preventDefault();
                send();
              }
            }}
            rows={2}
            placeholder="Write a message…"
          />
          <button
            type="submit"
            className="send-button"
            disabled={!draft.trim()}
            aria-label="Send message"
          >
            <Send />
          </button>
          <small>
            Press Enter to send · Demo messages stay in this session
          </small>
        </form>
      </section>
      <aside className="chat-context-panel">
        <div className="context-company">
          <span style={{ background: active.supplier.logoColor }}>
            {active.supplier.shortName}
          </span>
          <h3>
            {supplierView ? "Northline Athletics ApS" : active.supplier.name}
          </h3>
          <p>
            {supplierView ? "Copenhagen, Denmark" : active.supplier.location}
          </p>
          <div>
            <ShieldCheck />
            Business checked
          </div>
        </div>
        <div className="context-section">
          <strong>Your next step</strong>
          <p>
            Confirm the order split, material evidence, samples, and timing
            before proceeding.
          </p>
          <dl>
            <div>
              <dt>Identity</dt>
              <dd>Shared with this company</dd>
            </div>
            <div>
              <dt>Meeting</dt>
              <dd>{meetings[active.key] ? "Proposed" : "Not proposed"}</dd>
            </div>
          </dl>
        </div>
        <div className="context-actions">
          {!supplierView && (
            <Link href={`/suppliers/${active.supplier.id}#verification`}>
              View evidence
            </Link>
          )}
          <Link
            href={
              supplierView
                ? "/supplier/opportunities"
                : `/suppliers/${active.supplier.id}`
            }
          >
            {supplierView ? "Opportunities" : "View company profile"}
          </Link>
        </div>
        <p className="inbox-note">
          Company checks do not guarantee quality, delivery, or transaction
          outcomes.
        </p>
      </aside>
    </div>
  );
}
