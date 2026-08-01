import sharp from "sharp";

const input = "public/images/earth-chroma.png";
const output = "public/images/earth-transparent.png";
const { data, info } = await sharp(input).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const outputPixels = Buffer.alloc(info.width * info.height * 4);

for (let sourceIndex = 0, outputIndex = 0; sourceIndex < data.length; sourceIndex += 3, outputIndex += 4) {
  const red = data[sourceIndex];
  const green = data[sourceIndex + 1];
  const blue = data[sourceIndex + 2];
  const distance = Math.sqrt((255 - red) ** 2 + green ** 2 + (255 - blue) ** 2);
  const alpha = Math.max(0, Math.min(255, ((distance - 18) / 105) * 255));
  const spill = alpha < 245 ? (245 - alpha) / 245 : 0;
  const neutral = Math.min(red, blue, green + 24);

  outputPixels[outputIndex] = Math.round(red * (1 - spill) + neutral * spill);
  outputPixels[outputIndex + 1] = green;
  outputPixels[outputIndex + 2] = Math.round(blue * (1 - spill) + neutral * spill);
  outputPixels[outputIndex + 3] = Math.round(alpha * (alpha / 255));
}

await sharp(outputPixels, { raw: { width: info.width, height: info.height, channels: 4 } })
  .png({ compressionLevel: 9 })
  .toFile(output);
console.log(`Created ${output} (${info.width}x${info.height}, source channels: ${info.channels}, RGBA)`);
