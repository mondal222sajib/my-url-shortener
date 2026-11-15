
export const metadata = {
  title: "My URL Shortener",
  description: "Shorten your long links"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
