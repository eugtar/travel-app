"use client";
import React from "react";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Container from "../Container";
import Categories from "./Categories";
import { TSafeUser } from "@/app/types";
import useUserMenu from "@/app/hooks/useUserMenu";

const Navbar: React.FC<{ currentUser?: TSafeUser | null }> = ({
  currentUser,
}) => {
  const userMenu = useUserMenu();
  const userMenuRef = React.useRef<HTMLDivElement>(null);

  return (
    <nav
      onClick={(e: React.MouseEvent<HTMLElement>) => {
        if (e.target !== userMenuRef.current && userMenu.isOpen) {
          e.stopPropagation();
          userMenu.onClose();
        }
      }}
      aria-label="
        primary_navigation
      "
      className="
        fixed
        z-10
        w-full
        bg-primary_light
        shadow-sm
      "
    >
      <div
        className="
          border-b-[1px]
          py-4
        "
      >
        <Container>
          <div
            className="
                flex
                flex-row
                items-center
                justify-between
                gap-3
                md:gap-0
              "
          >
            <Logo />
            <Search />
            <UserMenu ref={userMenuRef} currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </nav>
  );
};

export default Navbar;
