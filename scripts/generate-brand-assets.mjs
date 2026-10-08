import { mkdir, readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

// The SVG used in the header is also the source for every browser icon.
const svg = await readFile("app/icon.svg", "utf8");
const mark = svg.replace(/<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
await mkdir("public", { recursive: true });
await sharp(Buffer.from(svg)).resize(64, 64).png().toFile("app/icon1.png");
await sharp(Buffer.from(svg))
  .resize(180, 180)
  .png()
  .toFile("app/apple-icon.png");
await sharp(Buffer.from(svg)).resize(512, 512).png().toFile("public/logo.png");

const sizes = [16, 32, 48, 64, 256];
const icons = await Promise.all(
  sizes.map((size) =>
    sharp(Buffer.from(svg)).resize(size, size).png().toBuffer(),
  ),
);
const header = Buffer.alloc(6 + icons.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(icons.length, 4);
let offset = header.length;
icons.forEach((icon, index) => {
  const entry = 6 + index * 16;
  header[entry] = sizes[index] === 256 ? 0 : sizes[index];
  header[entry + 1] = header[entry];
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(icon.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += icon.length;
});
await writeFile("app/favicon.ico", Buffer.concat([header, ...icons]));

const card = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<defs>
  <linearGradient id="bg" x2="1" y2="1"><stop stop-color="#173f37"/><stop offset="1" stop-color="#0e2f29"/></linearGradient>
  <pattern id="grid" width="72" height="72" patternUnits="userSpaceOnUse"><path d="M72 0H0V72" fill="none" stroke="#d8ff62" stroke-opacity=".055"/></pattern>
  <filter id="shadow" x="-20%" y="-20%" width="150%" height="160%"><feDropShadow dx="0" dy="20" stdDeviation="20" flood-color="#061f19" flood-opacity=".4"/></filter>
</defs>
<rect width="1200" height="630" fill="url(#bg)"/>
<rect width="1200" height="630" fill="url(#grid)"/>
<circle cx="1150" cy="30" r="310" fill="none" stroke="#d8ff62" stroke-opacity=".08" stroke-width="80"/>
<g transform="translate(64 49)">${mark}</g>
<g font-family="Arial, sans-serif">
<text x="148" y="93" fill="#f7f8f4" font-size="29" font-weight="800" letter-spacing="5">CORNEER</text>
<text x="64" y="216" fill="#f7f8f4" font-size="68" font-weight="700" letter-spacing="-2">Find your next</text>
<text x="64" y="298" fill="#d8ff62" font-size="68" font-weight="700" letter-spacing="-2">apparel partner.</text>
<text x="67" y="365" fill="#d1e0d7" font-size="25">Describe your order. Review companies.</text>
<text x="67" y="403" fill="#d1e0d7" font-size="25">Choose who to contact.</text>
<rect x="64" y="460" width="230" height="49" rx="24.5" fill="#d8ff62"/>
<text x="88" y="492" fill="#173f37" font-size="19" font-weight="700">A clearer next step</text>
<text x="67" y="579" fill="#9fb9ac" font-size="18">APPAREL SOURCING · FRONTEND DEMO</text>

<g filter="url(#shadow)"><rect x="706" y="86" width="430" height="466" rx="22" fill="#f7f8f4"/></g>
<rect x="706" y="86" width="430" height="55" rx="22" fill="#fff"/>
<path d="M706 122H1136V141H706Z" fill="#fff"/>
<g transform="translate(728 99) scale(.45)">${mark}</g>
<text x="767" y="121" fill="#173f37" font-size="14" font-weight="800" letter-spacing="2">CORNEER</text>
<circle cx="1099" cy="114" r="4" fill="#d8ff62"/><circle cx="1113" cy="114" r="4" fill="#e0e7df"/>
<text x="728" y="180" fill="#597363" font-size="12" font-weight="700" letter-spacing="1.6">YOUR SOURCING JOURNEY</text>
<text x="728" y="216" fill="#173f37" font-size="26" font-weight="700">Compare your options.</text>
<text x="728" y="247" fill="#68736e" font-size="16">5,000 units · 4 styles · Fictional example</text>

<rect x="728" y="270" width="386" height="72" rx="12" fill="#fff" stroke="#dfe5e1"/>
<rect x="742" y="287" width="38" height="38" rx="10" fill="#dce7da"/>
<text x="750" y="312" fill="#173f37" font-size="15" font-weight="700">PR</text>
<text x="793" y="301" fill="#173f37" font-size="17" font-weight="700">Pearl River Performance Wear</text>
<text x="793" y="323" fill="#68736e" font-size="14">Manufacturer · Running tops</text>

<rect x="728" y="352" width="386" height="72" rx="12" fill="#fff" stroke="#dfe5e1"/>
<rect x="742" y="369" width="38" height="38" rx="10" fill="#e5e6d7"/>
<text x="750" y="394" fill="#173f37" font-size="15" font-weight="700">HS</text>
<text x="793" y="383" fill="#173f37" font-size="17" font-weight="700">Harbor Stitch Sourcing</text>
<text x="793" y="405" fill="#68736e" font-size="14">Trading company · Factory coordination</text>

<rect x="728" y="446" width="386" height="83" rx="12" fill="#173f37"/>
<text x="746" y="474" fill="#bed2c6" font-size="12" font-weight="700" letter-spacing="1">YOU CHOOSE WHO TO CONTACT</text>
<text x="746" y="506" fill="#d8ff62" font-size="20" font-weight="700">Your company stays private.</text>
</g></svg>`;
await sharp(Buffer.from(card)).png().toFile("public/share-card.png");
console.log(
  "Generated matching browser icons, logo, and 1200×630 sharing card.",
);
