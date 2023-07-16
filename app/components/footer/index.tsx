"use client";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer>
      <p className="flex items-center justify-center text-sm text-neutral-500">
        {new Date().getFullYear()} All rights reserverd <sup>&#169;</sup>
      </p>
    </footer>
  );
};

export default Footer;
