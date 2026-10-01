import "swiper/css/bundle";
import "../styles/index.scss";

export const metadata = {
  title: "Vixan - Digital Creative Agency Next js Template",
  icons: {
    icon: "/assets/img/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
