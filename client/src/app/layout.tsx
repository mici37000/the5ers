import "./styles/globals.scss";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>The5ers</title>
      </head>
      <body>
       {children}
      </body>
    </html>
  );
}
