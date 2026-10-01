"use client";

import Link from "next/link";
import { Bookmark, MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import { useDemo } from "@/components/demo-provider";

export function ProfileActions({ supplierName }: { supplierName: string }) {
  const { toast } = useDemo();
  const [saved, setSaved] = useState(false);

  return (
    <div className="profile-actions">
      <button
        className="button button-dark"
        onClick={() => toast(`Inquiry started with ${supplierName}`)}
      >
        <MessageSquare size={16} />
        Contact supplier
      </button>
      <Link className="button button-secondary" href="/buyer/rfqs/new">
        <Send size={16} />
        Invite to RFQ
      </Link>
      <button
        className={`icon-button save-button ${saved ? "saved" : ""}`}
        onClick={() => {
          setSaved(!saved);
          toast(saved ? "Removed from saved suppliers" : "Supplier saved");
        }}
        aria-label="Save supplier"
      >
        <Bookmark size={18} fill={saved ? "currentColor" : "none"} />
      </button>
    </div>
  );
}
