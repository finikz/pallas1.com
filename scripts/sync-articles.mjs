import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const source = process.env.PALLAS_ARTICLES_DIR || "/Users/finikz/Library/Mobile Documents/iCloud~md~obsidian/Documents/Finikz Vault/raw/10 Projects/13 智神AI";
const output = path.resolve("src/articles.json");

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  const data = {};
  if (!match) return { data, body: raw };
  for (const line of match[1].split("\n")) {
    const pair = line.match(/^(title|source|published|created):\s*["']?(.*?)["']?\s*$/);
    if (pair) data[pair[1]] = pair[2];
  }
  return { data, body: raw.slice(match[0].length) };
}

function dateFrom(file, data) {
  if (data.published?.match(/^\d{4}-\d{2}-\d{2}$/)) return data.published;
  if (data.created?.match(/^\d{4}-\d{2}-\d{2}$/)) return data.created;
  const match = path.basename(file).match(/(20\d{6})/);
  return match ? `${match[1].slice(0, 4)}-${match[1].slice(4, 6)}-${match[1].slice(6)}` : "2000-01-01";
}

const files = (await readdir(source)).filter((file) => file.endsWith(".md"));
const articles = [];
for (const file of files) {
  const raw = await readFile(path.join(source, file), "utf8");
  const { data, body } = parseFrontmatter(raw);
  const title = data.title || body.match(/^#\s+(.+)$/m)?.[1] || path.basename(file, ".md");
  articles.push({
    slug: file.replace(/\.md$/, "").replace(/[^\w\u4e00-\u9fff]+/g, "-").replace(/^-|-$/g, "").toLowerCase(),
    title,
    collection: "智神AI",
    date: dateFrom(file, data),
    sourceUrl: data.source || null,
    body: body.trim(),
  });
}
articles.sort((a, b) => b.date.localeCompare(a.date));
await writeFile(output, `${JSON.stringify(articles, null, 2)}\n`);
console.log(`Synced ${articles.length} Pallas articles.`);
