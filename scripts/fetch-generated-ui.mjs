/**
 * Pixel Fidelity V2 — fetch Pollinations frames, pixel-snap with sharp,
 * write usable 9-slice assets to public/game-ui/generated/
 */
import fs from "node:fs";
import path from "node:path";
import { setTimeout as sleep } from "node:timers/promises";
import sharp from "sharp";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "public/game-ui/generated");
const RAW = path.join(ROOT, "tmp-assets/pollinations");

fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(RAW, { recursive: true });

const ASSETS = [
  {
    id: "frame-outer-9slice",
    size: 96,
    corner: 28,
    prompt:
      "pixel art RPG UI outer HUD frame only, square 9-slice template, dark carved stone border, cyan glowing gem corners, sparse gold rivets, empty flat dark charcoal center fill, no text no characters, game UI asset, crisp pixels, transparent outside frame",
  },
  {
    id: "frame-panel-9slice",
    size: 96,
    corner: 24,
    prompt:
      "pixel art RPG UI inner panel frame only, square 9-slice template, thin dark stone metal border, cyan mid-edge ticks, gold corner flourishes, empty flat dark center, no text, crisp 16-bit pixels, game inventory window border",
  },
  {
    id: "frame-menu-glow",
    size: 96,
    corner: 24,
    prompt:
      "pixel art RPG UI selection menu panel frame, square, dark stone border with bright cyan glow outline, gold corner accents, empty dark center, no text, crisp pixels, Wynncraft style HUD",
  },
  {
    id: "btn-primary-3slice",
    size: 64,
    corner: 12,
    prompt:
      "pixel art RPG UI button template horizontal, dark stone with cyan border, gold corners, flat dark fill center, no text, 3-slice friendly, crisp pixels",
  },
  {
    id: "btn-ghost-3slice",
    size: 64,
    corner: 12,
    prompt:
      "pixel art RPG UI ghost button frame, dark grey stone outline, muted cyan edge, empty dark center, no text, crisp pixels",
  },
  {
    id: "stone-brick-tile",
    size: 64,
    corner: 0,
    prompt:
      "seamless dark stone brick wall tile pixel art, charcoal and black bricks, subtle mortar lines, no text no ornaments, tileable texture, top-down flat",
  },
  {
    id: "icon-dossier",
    size: 32,
    corner: 0,
    prompt:
      "tiny 32px pixel art icon open book, cyan and grey on transparent background, RPG UI icon only, no text",
  },
  {
    id: "icon-loadout",
    size: 32,
    corner: 0,
    prompt:
      "tiny 32px pixel art icon sword, cyan and grey on transparent background, RPG UI icon only, no text",
  },
  {
    id: "icon-experience",
    size: 32,
    corner: 0,
    prompt:
      "tiny 32px pixel art icon knight helmet, cyan and grey on transparent background, RPG UI icon only, no text",
  },
  {
    id: "icon-missions",
    size: 32,
    corner: 0,
    prompt:
      "tiny 32px pixel art icon crossed swords, cyan and grey on transparent background, RPG UI icon only, no text",
  },
  {
    id: "icon-arcade",
    size: 32,
    corner: 0,
    prompt:
      "tiny 32px pixel art icon gamepad controller, cyan and grey on transparent background, RPG UI icon only, no text",
  },
  {
    id: "icon-uplink",
    size: 32,
    corner: 0,
    prompt:
      "tiny 32px pixel art icon radio tower antenna, cyan and grey on transparent background, RPG UI icon only, no text",
  },
];

async function fetchPollinations(prompt, dest) {
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=512&height=512&nologo=true&model=flux`;
  const res = await fetch(url, {
    headers: { "User-Agent": "PortfolioOS-PixelFidelity/1.0" },
  });
  if (!res.ok) throw new Error(`Pollinations ${res.status} for ${dest}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
  console.log("fetched", path.basename(dest), buf.length);
}

/** Downscale with nearest neighbor and optional 9-slice rebuild from borders */
async function processAsset(asset, rawPath) {
  const outPath = path.join(OUT, `${asset.id}.png`);
  const img = sharp(rawPath).ensureAlpha();
  const meta = await img.metadata();

  // pixel-snap to target size
  let pipeline = sharp(rawPath)
    .ensureAlpha()
    .resize(asset.size, asset.size, {
      kernel: sharp.kernel.nearest,
      fit: "fill",
    });

  if (asset.corner > 0 && asset.id.includes("frame")) {
    // Rebuild as clean 9-slice: keep corners/edges, fill center dark
    const tmp = await pipeline.png().toBuffer();
    const c = asset.corner;
    const s = asset.size;
    const mid = s - c * 2;
    if (mid > 4) {
      const tl = await sharp(tmp).extract({ left: 0, top: 0, width: c, height: c }).png().toBuffer();
      const tr = await sharp(tmp)
        .extract({ left: s - c, top: 0, width: c, height: c })
        .png()
        .toBuffer();
      const bl = await sharp(tmp)
        .extract({ left: 0, top: s - c, width: c, height: c })
        .png()
        .toBuffer();
      const br = await sharp(tmp)
        .extract({ left: s - c, top: s - c, width: c, height: c })
        .png()
        .toBuffer();
      const topE = await sharp(tmp)
        .extract({ left: c, top: 0, width: mid, height: c })
        .png()
        .toBuffer();
      const botE = await sharp(tmp)
        .extract({ left: c, top: s - c, width: mid, height: c })
        .png()
        .toBuffer();
      const leftE = await sharp(tmp)
        .extract({ left: 0, top: c, width: c, height: mid })
        .png()
        .toBuffer();
      const rightE = await sharp(tmp)
        .extract({ left: s - c, top: c, width: c, height: mid })
        .png()
        .toBuffer();
      const center = await sharp({
        create: {
          width: mid,
          height: mid,
          channels: 4,
          background: { r: 18, g: 20, b: 22, alpha: 1 },
        },
      })
        .png()
        .toBuffer();

      await sharp({
        create: {
          width: s,
          height: s,
          channels: 4,
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        },
      })
        .composite([
          { input: tl, left: 0, top: 0 },
          { input: topE, left: c, top: 0 },
          { input: tr, left: c + mid, top: 0 },
          { input: leftE, left: 0, top: c },
          { input: center, left: c, top: c },
          { input: rightE, left: c + mid, top: c },
          { input: bl, left: 0, top: c + mid },
          { input: botE, left: c, top: c + mid },
          { input: br, left: c + mid, top: c + mid },
        ])
        .png()
        .toFile(outPath);
      console.log("9-slice", asset.id, meta.width + "x" + meta.height, "->", s);
      return;
    }
  }

  await pipeline.png().toFile(outPath);
  console.log("wrote", asset.id, "->", sOr(asset.size));
}

function sOr(n) {
  return `${n}x${n}`;
}

async function main() {
  const only = process.argv[2]; // optional filter id
  const list = only ? ASSETS.filter((a) => a.id === only) : ASSETS;

  for (const asset of list) {
    const rawPath = path.join(RAW, `${asset.id}.png`);
    try {
      if (!fs.existsSync(rawPath) || fs.statSync(rawPath).size < 1000) {
        await fetchPollinations(asset.prompt, rawPath);
        await sleep(16000); // anonymous throttle
      } else {
        console.log("reuse raw", asset.id);
      }
      await processAsset(asset, rawPath);
    } catch (e) {
      console.error("FAIL", asset.id, e.message);
    }
  }
  console.log("done ->", OUT);
}

main();
