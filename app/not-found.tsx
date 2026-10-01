import Link from "next/link";

export default function NotFound() {
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
