import { ImageResponse } from "next/og";
import { BrandMarkSvg } from "@/lib/brandMark";
import { tokens } from "@/lib/tokens";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS ikonka: oq fonda belgi (iOS burchaklarni o'zi yumaloqlaydi)
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: tokens.white }}>
        <BrandMarkSvg size={128} />
      </div>
    ),
    size,
  );
}
