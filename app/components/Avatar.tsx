"use client";
import React from "react";
import Image from "next/image";

const Avatar: React.FC<{ src?: string | null }> = ({ src }) => {
  return (
    <Image
      className="rounded-full"
      height={30}
      width={30}
      alt="avatar"
      src={src ? src : "/assets/placeholder.jpg"}
    />
  );
};

export default Avatar;
