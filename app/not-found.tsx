"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    document.title = "Page not found | Corneer";
  }, []);
  return (
    <main className="not-found">
      <span>404</span>
      <h1>This corner is still empty.</h1>
      <p>The page you requested is not part of the Corneer demo.</p>
      <Link className="button button-dark" href="/">
        Return home
      </Link>
    </main>
  );
}
