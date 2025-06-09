import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import bootstrapClient from './bootstrapClient';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
