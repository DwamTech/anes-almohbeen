import { readFile } from "node:fs/promises";

const html = await readFile("youtube-channel.html", "utf8");

function configValue(key) {
  const match = html.match(new RegExp(`"${key}":"([^"\\\\]*(?:\\\\.[^"\\\\]*)*)"`));
  if (!match) throw new Error(`Missing ${key}`);
  return JSON.parse(`"${match[1]}"`);
}

const initialMatch = html.match(/var ytInitialData = (\{.*?\});<\/script>/s);
if (!initialMatch) throw new Error("Could not find ytInitialData");

const apiKey = configValue("INNERTUBE_API_KEY");
const clientVersion = configValue("INNERTUBE_CLIENT_VERSION");
const visitorData = configValue("VISITOR_DATA");
const videos = new Map();

function extract(data) {
  let continuation = null;
  function walk(node) {
    if (!node || typeof node !== "object") return;
    if (node.lockupViewModel?.contentType === "LOCKUP_CONTENT_TYPE_VIDEO") {
      const video = node.lockupViewModel;
      const title = video.metadata?.lockupMetadataViewModel?.title?.content;
      if (title && video.contentId) videos.set(video.contentId, title);
    }
    const token = node.continuationCommand?.token;
    if (token) continuation = token;
    for (const value of Object.values(node)) walk(value);
  }
  walk(data);
  return continuation;
}

let continuation = extract(JSON.parse(initialMatch[1]));
let page = 1;

while (continuation && page < 10) {
  const response = await fetch(`https://www.youtube.com/youtubei/v1/browse?key=${apiKey}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-youtube-client-name": "1",
      "x-youtube-client-version": clientVersion,
    },
    body: JSON.stringify({
      context: { client: { clientName: "WEB", clientVersion, visitorData, hl: "ar", gl: "EG" } },
      continuation,
    }),
  });
  if (!response.ok) throw new Error(`YouTube page ${page + 1}: ${response.status}`);
  continuation = extract(await response.json());
  page += 1;
}

console.log(`VIDEOS\t${videos.size}\tPAGES\t${page}`);
for (const [id, title] of videos) console.log(`${id}\t${title}`);
