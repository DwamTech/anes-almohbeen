import type { Metadata } from "next";
import "@fontsource/cairo/400.css";
import "@fontsource/cairo/600.css";
import "@fontsource/cairo/700.css";
import "@fontsource/amiri/400.css";
import "@fontsource/amiri/700.css";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "الله أنيس المحبين | أسماء الله الحسنى", template: "%s | الله أنيس المحبين | أسماء الله الحسنى" },
  description: "رحلة تدبر في أسماء الله الحسنى ومعانيها وآثارها في القلب والحياة.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
