"use client";
import React from "react";

const Heading: React.FC<{
  title: string;
  subtitle?: string;
  center?: boolean;
}> = ({ title, center, subtitle }) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className="text-2xl font-bold">{title}</div>
      <div className="mt-4 font-light text-neutral-500">{subtitle}</div>
    </div>
  );
};

export default Heading;
