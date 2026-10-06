import "server-only";

import { openSync, readSync, closeSync } from "node:fs";

/** WebP fayl sarlavhasidan enini o'qiydi (VP8, VP8L, VP8X). Aniqlanmasa — null. */
export function webpWidth(path: string): number | null {
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
  if (chunk === "VP8 ") return buf.readUInt16LE(26) & 0x3fff;
  if (chunk === "VP8L") return 1 + (((buf[22] & 0x3f) << 8) | buf[21]);
  if (chunk === "VP8X") return 1 + buf.readUIntLE(24, 3);
  return null;
}
