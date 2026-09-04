/**
 * Build 9-slice stone frames + decorative sprites from ChatGPT refs.
 * Also remaps Dark Dwellers purple frames toward stone/cyan.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const REFS = path.join(ROOT, "public/refs");
const OUT = path.join(ROOT, "public/game-ui/sprites");
const DD = path.join(ROOT, "public/game-ui/dark-dwellers");

fs.mkdirSync(OUT, { recursive: true });

async function crop(src, region, dest) {
  await sharp(src).extract(region).png().toFile(dest);
  console.log("cropped", path.basename(dest), region);
}

/** Assemble a 96x96 9-slice from four corners + edge strips of a ref outer frame */
async function buildNineSliceFromCorners(src, outPath, corner = 40) {
  const meta = await sharp(src).metadata();
  const w = meta.width;
  const h = meta.height;
  const c = corner;
  const size = 96;
  const mid = size - c * 2;

  const tl = await sharp(src).extract({ left: 12, top: 12, width: c, height: c }).png().toBuffer();
  const tr = await sharp(src)
    .extract({ left: w - 12 - c, top: 12, width: c, height: c })
    .png()
    .toBuffer();
  const bl = await sharp(src)
    .extract({ left: 12, top: h - 12 - c, width: c, height: c })
    .png()
    .toBuffer();
  const br = await sharp(src)
    .extract({ left: w - 12 - c, top: h - 12 - c, width: c, height: c })
    .png()
    .toBuffer();

  // edge samples (thin strips from mid-sides)
  const topEdge = await sharp(src)
    .extract({ left: Math.floor(w / 2) - 8, top: 12, width: 16, height: c })
    .resize(mid, c, { kernel: sharp.kernel.nearest })
    .png()
    .toBuffer();
  const botEdge = await sharp(src)
    .extract({ left: Math.floor(w / 2) - 8, top: h - 12 - c, width: 16, height: c })
    .resize(mid, c, { kernel: sharp.kernel.nearest })
    .png()
    .toBuffer();
  const leftEdge = await sharp(src)
    .extract({ left: 12, top: Math.floor(h / 2) - 8, width: c, height: 16 })
    .resize(c, mid, { kernel: sharp.kernel.nearest })
    .png()
    .toBuffer();
  const rightEdge = await sharp(src)
    .extract({ left: w - 12 - c, top: Math.floor(h / 2) - 8, width: c, height: 16 })
    .resize(c, mid, { kernel: sharp.kernel.nearest })
    .png()
    .toBuffer();

  // dark stone fill center
  const center = await sharp({
    create: {
      width: mid,
      height: mid,
      channels: 4,
      background: { r: 26, g: 28, b: 30, alpha: 1 },
    },
  })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 10, g: 11, b: 12, alpha: 1 },
    },
  })
    .composite([
      { input: tl, left: 0, top: 0 },
      { input: topEdge, left: c, top: 0 },
      { input: tr, left: c + mid, top: 0 },
      { input: leftEdge, left: 0, top: c },
      { input: center, left: c, top: c },
      { input: rightEdge, left: c + mid, top: c },
      { input: bl, left: 0, top: c + mid },
      { input: botEdge, left: c, top: c + mid },
      { input: br, left: c + mid, top: c + mid },
    ])
    .png()
    .toFile(outPath);

  console.log("9-slice", path.basename(outPath), `${size}x${size} corner=${c}`);
}

/** Remap purple/magenta Dark Dwellers pixels toward stone + cyan accents */
async function remapToStoneCyan(src, dest) {
  const { data, info } = await sharp(src)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    if (a < 8) continue;

    // light lavender ornaments -> cyan
    if (b > r + 20 && b > g && (b + g) / 2 > 120) {
      data[i] = 82;
      data[i + 1] = 217;
      data[i + 2] = 236;
      continue;
    }
    // gold/orange ornaments -> gold
    if (r > 180 && g > 100 && b < 120) {
      data[i] = 232;
      data[i + 1] = 196;
      data[i + 2] = 90;
      continue;
    }
    // magenta / plum fill -> dark stone
    if (r > 80 && b > 60 && r > g + 20) {
      data[i] = 26;
      data[i + 1] = 28;
      data[i + 2] = 30;
      continue;
    }
    // purple body -> mid stone
    if (b >= r && b > 40 && r < 100) {
      const v = Math.round((r + g + b) / 5);
      data[i] = 40 + v;
      data[i + 1] = 44 + v;
      data[i + 2] = 48 + v;
      continue;
    }
    // dark outline stay near black
    if (r + g + b < 80) {
      data[i] = 10;
      data[i + 1] = 11;
      data[i + 2] = 12;
    }
  }

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toFile(dest);
  console.log("remapped", path.basename(dest));
}

async function main() {
  const menu = path.join(REFS, "01-main-menu.png");
  const arcade = path.join(REFS, "07-arcade.png");
  const boot = path.join(REFS, "03-boot.png");

  // 9-slices from refs (outer ornate frame)
  await buildNineSliceFromCorners(menu, path.join(OUT, "frame-outer-9slice.png"), 36);
  await buildNineSliceFromCorners(menu, path.join(OUT, "frame-panel-9slice.png"), 28);

  // Remapped Dark Dwellers frames
  await remapToStoneCyan(
    path.join(DD, "20251029darkDwellers9SlicesC.png"),
    path.join(DD, "frame-panel-remapped.png"),
  );
  await remapToStoneCyan(
    path.join(DD, "20251029darkDwellers9SlicesE.png"),
    path.join(DD, "frame-outer-remapped.png"),
  );
  await remapToStoneCyan(
    path.join(DD, "20251029darkDwellers9SlicesA.png"),
    path.join(DD, "frame-thin-remapped.png"),
  );
  await remapToStoneCyan(
    path.join(DD, "20251029darkDwellers9SlicesD.png"),
    path.join(DD, "frame-ornate-remapped.png"),
  );

  // Decorative crops from main menu (approx regions for 1672x941)
  await crop(menu, { left: 70, top: 320, width: 220, height: 320 }, path.join(OUT, "lion-crest.png"));
  await crop(menu, { left: 1380, top: 300, width: 230, height: 340 }, path.join(OUT, "castle-crest.png"));
  await crop(menu, { left: 40, top: 20, width: 70, height: 160 }, path.join(OUT, "banner-left.png"));
  await crop(menu, { left: 1560, top: 20, width: 70, height: 160 }, path.join(OUT, "banner-right.png"));

  // Boot globe
  await crop(boot, { left: 980, top: 480, width: 420, height: 320 }, path.join(OUT, "boot-globe.png"));

  // Arcade cabinets (row of 4 across center)
  await crop(arcade, { left: 180, top: 220, width: 280, height: 320 }, path.join(OUT, "cabinet-1.png"));
  await crop(arcade, { left: 500, top: 220, width: 280, height: 320 }, path.join(OUT, "cabinet-2.png"));
  await crop(arcade, { left: 820, top: 220, width: 280, height: 320 }, path.join(OUT, "cabinet-3.png"));
  await crop(arcade, { left: 1140, top: 220, width: 280, height: 320 }, path.join(OUT, "cabinet-4.png"));

  // Stone brick tile from menu background
  await crop(menu, { left: 400, top: 80, width: 128, height: 128 }, path.join(OUT, "stone-tile.png"));

  console.log("done");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
