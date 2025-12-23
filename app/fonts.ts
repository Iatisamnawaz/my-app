import { Geist, Geist_Mono, Inter, Roboto, Poppins, Space_Grotesk } from "next/font/google";
// Current Default Font (Space Grotesk)
export const primaryFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-primary",
  display: "swap",
});




// =========================================
// MONOSPACE FONT
// =========================================
export const monoFont = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono-primary",
  display: "swap",
});
