"use client";

import { useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  CheckCheck,
  ChevronDown,
  MoreHorizontal,
  Paperclip,
  Search,
  Send,
  ShieldCheck,
  Video,
} from "lucide-react";
import { conversations, getSupplier } from "@/lib/data";
import { useDemo } from "@/components/demo-provider";

const initialMessages = [
  {
    id: 1,
    side: "them",
    text: "Hello Nadia, thank you for shortlisting our response. We reviewed the additional construction notes.",
    time: "09:46",
  },
  {
    id: 2,
    side: "them",
    text: "We can support the flatlock and bonded hem requirements. For the recycled fabric, we can prepare options from two GRS-certified mill partners.",
    time: "09:48",
  },
  {
    id: 3,
    side: "me",
    text: "Thanks, Lina. Could you prepare swatches in both the lightweight and midweight qualities? We would also like to understand your sampling timeline.",
    time: "10:14",
  },
  {
    id: 4,
    side: "them",
    text: "Yes. We can prepare the recycled fabric swatches this week. First proto samples would take approximately 14–18 days after receiving the complete tech packs.",
    time: "10:42",
  },
];

export function MessageCenter() {
  const { toast } = useDemo();
  const [activeId, setActiveId] = useState(conversations[0].id);
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");
  const [showInbox, setShowInbox] = useState(false);
  const active = conversations.find(
    (conversation) => conversation.id === activeId,
  )!;
  const supplier = getSupplier(active.supplierId)!;

  const send = () => {
    if (!draft.trim()) return;
    setMessages((current) => [
      ...current,
      { id: Date.now(), side: "me", text: draft.trim(), time: "Now" },
    ]);
    setDraft("");
  };

  return (
    <div className={`message-app${showInbox ? " show-inbox" : ""}`}>
      <aside className="conversation-panel">
        <div className="conversation-heading">
          <div>
            <span className="workspace-label">Inbox</span>
            <h1>Messages</h1>
          </div>
          <button>
            <MoreHorizontal />
          </button>
        </div>
        <label className="conversation-search">
          <Search />
          <input placeholder="Search conversations" />
        </label>
        <div className="conversation-tabs">
          <button className="active">All</button>
          <button>
            Unread <span>2</span>
          </button>
          <button>Archived</button>
        </div>
        <div className="conversation-list">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              className={conversation.id === activeId ? "active" : ""}
              onClick={() => {
                setActiveId(conversation.id);
                setShowInbox(false);
              }}
            >
              <span
                className="conversation-avatar"
                style={{
                  background: getSupplier(conversation.supplierId)?.logoColor,
                }}
              >
                {conversation.initials}
              </span>
              <span className="conversation-copy">
                <strong>{conversation.counterpart}</strong>
                <small>{conversation.rfq}</small>
                <p>{conversation.preview}</p>
              </span>
              <span className="conversation-meta">
                <small>{conversation.time}</small>
                {conversation.unread > 0 && <i>{conversation.unread}</i>}
              </span>
            </button>
          ))}
        </div>
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
            <span style={{ background: supplier.logoColor }}>
              {supplier.shortName}
            </span>
            <div>
              <strong>{active.counterpart}</strong>
              <small>
                <i />
                Usually replies {supplier.responseTime}
              </small>
            </div>
          </div>
          <div>
            <button onClick={() => toast("Meeting request prepared")}>
              <CalendarDays />
              Request meeting
            </button>
            <button>
              <Video />
            </button>
            <button>
              <MoreHorizontal />
            </button>
          </div>
        </header>
        <div className="opportunity-context">
          <ShieldCheck />
          <span>Conversation opened after mutual interest</span>
          <strong>{active.rfq}</strong>
          <button>
            View opportunity <ChevronDown />
          </button>
        </div>
        <div className="chat-scroll">
          <div className="chat-date">
            <span>Today</span>
          </div>
          <div className="system-message">
            <ShieldCheck />
            <p>
              <strong>Northline Athletics revealed its identity</strong>Both
              companies can now view business profiles and choose to exchange
              contact details.
            </p>
          </div>
          {messages.map((message) => (
            <div className={`chat-message ${message.side}`} key={message.id}>
              {message.side === "them" && (
                <span
                  className="message-avatar"
                  style={{ background: supplier.logoColor }}
                >
                  {supplier.shortName}
                </span>
              )}
              <div>
                <p>{message.text}</p>
                <span>
                  {message.time}
                  {message.side === "me" && <CheckCheck />}
                </span>
              </div>
            </div>
          ))}
        </div>
        <footer className="message-composer">
          <button aria-label="Attach file">
            <Paperclip />
          </button>
          <textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                send();
              }
            }}
            rows={1}
            placeholder="Write a message…"
          />
          <button
            className="send-button"
            onClick={send}
            aria-label="Send message"
          >
            <Send />
          </button>
          <small>
            Press Enter to send · Demo messages stay in this session
          </small>
        </footer>
      </section>

      <aside className="chat-context-panel">
        <div className="context-company">
          <span style={{ background: supplier.logoColor }}>
            {supplier.shortName}
          </span>
          <h3>{supplier.name}</h3>
          <p>{supplier.location}</p>
          <div>
            <ShieldCheck />
            Business checked
          </div>
        </div>
        <div className="context-section">
          <strong>Opportunity</strong>
          <p>{active.rfq}</p>
          <dl>
            <div>
              <dt>Status</dt>
              <dd>Shortlisted</dd>
            </div>
            <div>
              <dt>Identity</dt>
              <dd>Revealed</dd>
            </div>
            <div>
              <dt>Next step</dt>
              <dd>Samples</dd>
            </div>
          </dl>
        </div>
        <div className="context-section">
          <strong>Shared files</strong>
          <button className="shared-file">
            <span>PDF</span>
            <div>
              <b>Capability_deck.pdf</b>
              <small>2.4 MB · Today</small>
            </div>
          </button>
        </div>
        <div className="context-actions">
          <button onClick={() => toast("Meeting request prepared")}>
            <CalendarDays />
            Schedule meeting
          </button>
          <button>View company profile</button>
        </div>
      </aside>
    </div>
  );
}
