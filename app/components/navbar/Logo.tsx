"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo: React.FC = () => {
  const router = useRouter();

  return (
    <Image
      priority
      alt="Logo"
      height={100}
      width={100}
      title="Home"
      role="link"
      src={`/assets/logo.png`}
      onClick={() => router.push("/")}
      className="hidden cursor-pointer md:block"
    />
  );
};

export default Logo;
