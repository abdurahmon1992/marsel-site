import { ImageResponse } from "next/og";
import { BrandMarkSvg } from "@/lib/brandMark";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(<BrandMarkSvg size={64} />, size);
}
