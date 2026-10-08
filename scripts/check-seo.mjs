import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { readFile } from "node:fs/promises";
import { createServer } from "node:net";
import nextEnv from "@next/env";

nextEnv.loadEnvConfig(process.cwd(), false);

// Exercise built HTTP responses, including the metadata delivered to sharing bots.
const reservation = createServer();
reservation.listen(0, "127.0.0.1");
await once(reservation, "listening");
const port = reservation.address().port;
await new Promise((resolve) => reservation.close(resolve));
const server = spawn(
  process.execPath,
  [
    "node_modules/next/dist/bin/next",
    "start",
    "-p",
    String(port),
    "-H",
    "127.0.0.1",
  ],
  { windowsHide: true, stdio: ["ignore", "pipe", "pipe"] },
);
let output = "";
server.stderr.on("data", (chunk) => {
  output += chunk;
});
const origin = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "https://corneer.vercel.app",
).origin;
const base = `http://127.0.0.1:${port}`;
const decode = (value) =>
  value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'");
const meta = (html, key) => {
  const tag = [...html.matchAll(/<meta\s[^>]*>/g)]
    .map(([value]) => value)
    .filter(
      (value) =>
        value.includes(`name="${key}"`) || value.includes(`property="${key}"`),
    );
  assert.equal(tag.length, 1, `Expected exactly one ${key} tag`);
  return decode(tag[0].match(/content="([^"]*)"/)[1]);
};
const request = async (path, bot = "Twitterbot/1.0") => {
  const response = await fetch(`${base}${path}`, {
    headers: { "user-agent": bot },
    signal: AbortSignal.timeout(15000),
  });
  return { response, html: await response.text() };
};

try {
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(
      () => reject(new Error(`SEO test server did not start: ${output}`)),
      45000,
    );
    server.stdout.on("data", (chunk) => {
      output += chunk;
      if (output.includes("Ready in")) {
        clearTimeout(timeout);
        resolve();
      }
    });
    server.on("error", (error) => {
      clearTimeout(timeout);
      reject(error);
    });
    server.on("exit", (code) => {
      clearTimeout(timeout);
      reject(new Error(`SEO server exited ${code}: ${output}`));
    });
  });
  const manifest = JSON.parse(
    await readFile(".next/prerender-manifest.json", "utf8"),
  );
  const routes = [
    ...Object.keys(manifest.routes).filter(
      (route) => !route.includes(".") && !route.startsWith("/_"),
    ),
    "/suppliers",
    "/buyer/rfqs/new",
    "/messages",
  ];
  const titles = new Set();
  const publicPaths = [];
  for (const path of routes) {
    const { response, html } = await request(path);
    assert.equal(response.status, 200, path);
    const titleTags = [...html.matchAll(/<title>(.*?)<\/title>/g)];
    assert.equal(titleTags.length, 1, `${path}: one title`);
    const title = decode(titleTags[0][1]);
    assert.ok(title.endsWith(" | Corneer"), `${path}: branded title`);
    assert.ok(!titles.has(title), `${path}: duplicate title ${title}`);
    titles.add(title);
    assert.ok(
      meta(html, "description").length > 40,
      `${path}: useful description`,
    );
    assert.equal(meta(html, "og:title"), title, `${path}: sharing title`);
    assert.equal(meta(html, "twitter:title"), title);
    assert.equal(meta(html, "og:image"), `${origin}/share-card.png`);
    assert.equal(meta(html, "og:image:width"), "1200");
    assert.equal(meta(html, "og:image:height"), "630");
    assert.ok(meta(html, "og:image:alt").includes("Corneer"));
    assert.equal(meta(html, "twitter:card"), "summary_large_image");
    assert.equal(meta(html, "twitter:image"), `${origin}/share-card.png`);
    const publicPage =
      path === "/" || path === "/products" || path.startsWith("/suppliers");
    const canonicalTags = [
      ...html.matchAll(/<link\s[^>]*rel="canonical"[^>]*>/g),
    ];
    assert.equal(
      canonicalTags.length,
      publicPage ? 1 : 0,
      `${path}: canonical scope`,
    );
    assert.equal(
      meta(html, "robots").includes("noindex"),
      !publicPage || process.env.VERCEL_ENV === "preview",
      `${path}: indexing scope`,
    );
    if (publicPage) {
      publicPaths.push(path);
      const href = canonicalTags[0][0].match(/href="([^"]+)"/)[1];
      assert.equal(
        new URL(href).href,
        new URL(path, origin).href,
        `${path}: canonical URL`,
      );
    }
    assert.match(html, /rel="icon"[^>]*href="\/favicon\.ico/);
    assert.match(html, /rel="icon"[^>]*href="\/icon\.svg/);
    if (path === "/") {
      assert.match(html, /src="\/icon\.svg"/);
      const schema = html.match(
        /<script type="application\/ld\+json">(.*?)<\/script>/s,
      );
      assert.equal(JSON.parse(schema[1])["@type"], "WebSite");
    }
    if (path.startsWith("/suppliers/")) {
      const schema = html.match(
        /<script type="application\/ld\+json">(.*?)<\/script>/s,
      );
      assert.equal(JSON.parse(schema[1])["@type"], "BreadcrumbList");
    }
  }
  const filtered = await request("/suppliers?q=running");
  assert.match(
    filtered.html,
    new RegExp(`rel="canonical" href="${origin}/suppliers"`),
  );
  const facebook = await request("/", "facebookexternalhit/1.1");
  assert.equal(meta(facebook.html, "og:image"), `${origin}/share-card.png`);
  const sitemap = await request("/sitemap.xml");
  const listed = [...sitemap.html.matchAll(/<loc>(.*?)<\/loc>/g)]
    .map(([, url]) => new URL(url).pathname)
    .sort();
  assert.deepEqual(
    listed,
    publicPaths.sort(),
    "Sitemap must contain public pages only",
  );
  const robots = await request("/robots.txt");
  assert.ok(robots.html.includes(`Sitemap: ${origin}/sitemap.xml`));
  assert.ok(
    !robots.html.includes("Disallow: /_next"),
    "Crawlers need rendering assets",
  );
  for (const [path, width, height] of [
    ["/share-card.png", 1200, 630],
    ["/apple-icon.png", 180, 180],
    ["/logo.png", 512, 512],
  ]) {
    const response = await fetch(`${base}${path}`);
    assert.equal(response.status, 200, path);
    assert.ok(response.headers.get("content-type").includes("image/png"), path);
    const bytes = Buffer.from(await response.arrayBuffer());
    assert.equal(bytes.readUInt32BE(16), width, path);
    assert.equal(bytes.readUInt32BE(20), height, path);
  }
  const missing = await request("/suppliers/not-a-company");
  assert.ok(
    missing.response.status === 404 ||
      /<meta\s[^>]*name="robots"[^>]*content="[^"]*\bnoindex\b/.test(
        missing.html,
      ),
  );
  console.log(
    `SEO checks passed: ${routes.length} distinct titles, metadata, canonicals, noindex workspaces, structured data, sitemap, matching icons, and sharing-bot previews.`,
  );
} finally {
  server.kill();
}
