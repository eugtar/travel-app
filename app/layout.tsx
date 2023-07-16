import "./globals.css";
import React from "react";
import { Nunito } from "next/font/google";
import RentModal from "./components/modals/RentModal";
import getCurrentUser from "./actions/getCurrentUser";
import LoginModal from "./components/modals/LoginModal";
import ToasterProvider from "./providers/ToasterProvider";
import SearchModal from "./components/modals/SearchModal";
import { ClientOnly, Footer, Navbar } from "./components";
import RegisterModal from "./components/modals/RegisterModal";

export const metadata = {
  title: "AirbnbClone",
  description: "Airbnb clone app",
};

const font = Nunito({
  subsets: ["latin"],
});

const RootLayout: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body
        className={`${font.className} cursor-default select-none bg-primary_light text-text_dark`}
      >
        <header>
          <ClientOnly>
            <ToasterProvider />
            <SearchModal />
            <RentModal />
            <LoginModal />
            <RegisterModal />
            <Navbar currentUser={currentUser} />
          </ClientOnly>
        </header>
        <main className="pb-20 pt-28">{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
