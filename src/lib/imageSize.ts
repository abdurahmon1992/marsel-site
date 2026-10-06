import "server-only";

import { openSync, readSync, closeSync } from "node:fs";

/** WebP fayl sarlavhasidan o'lchamlarni o'qiydi (VP8, VP8L, VP8X). Aniqlanmasa — null. */
export function webpSize(path: string): { width: number; height: number } | null {
  const buf = Buffer.alloc(30);
  let fd: number | undefined;
  try {
    fd = openSync(path, "r");
    readSync(fd, buf, 0, 30, 0);
  } catch {
    return null;
  } finally {
    if (fd !== undefined) closeSync(fd);
  }
  if (buf.toString("ascii", 0, 4) !== "RIFF" || buf.toString("ascii", 8, 12) !== "WEBP") return null;
  const chunk = buf.toString("ascii", 12, 16);
  if (chunk === "VP8 ") return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
  if (chunk === "VP8L")
    return {
      width: 1 + (((buf[22] & 0x3f) << 8) | buf[21]),
      height: 1 + (((buf[24] & 0x0f) << 10) | (buf[23] << 2) | ((buf[22] & 0xc0) >> 6)),
    };
  if (chunk === "VP8X") return { width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) };
  return null;
}
