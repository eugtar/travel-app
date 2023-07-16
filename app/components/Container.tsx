"use client";
import React from "react";
import useUserMenu from "../hooks/useUserMenu";

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const userMenu = useUserMenu();

  return (
    <div
      onClick={(e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        if (userMenu.isOpen) userMenu.onClose();
        return;
      }}
      className="
        max-w[2520px]
        mx-auto
        px-4
        sm:px-2
        md:px-10
        xl:px-20
      "
    >
      {children}
    </div>
  );
};

export default Container;
