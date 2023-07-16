"use client";
import React from "react";
import { IconType } from "react-icons";

const MenuItem: React.FC<{
  label: string;
  icon?: IconType;
  onClick: () => void;
}> = (props) => {
  const { label, icon: Icon, onClick } = props;
  return (
    <div
      title={label}
      role="button"
      onClick={onClick}
      className={`
        px-4
        py-3
        font-semibold
        transition
        hover:bg-neutral-100
        ${Icon ? "flex items-center justify-between" : ""}
      `}
    >
      {label}
      {Icon && <Icon size={18} />}
    </div>
  );
};

export default MenuItem;
