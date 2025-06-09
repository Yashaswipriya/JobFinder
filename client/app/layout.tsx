
import { Roboto } from "next/font/google";
import "./globals.css";
import ContextProvider from "@/providers/ContextProvider";
import { Toaster } from "react-hot-toast";
import '@fortawesome/fontawesome-free/css/all.min.css';



const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
        />
      </head>
      <body
        className={`${roboto.className} antialiased`}>
      <Toaster position ='top-center'/>
       <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  );
}
