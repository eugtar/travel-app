"use client";
import React from "react";
import { IconType } from "react-icons";

interface ICategoryInputProps {
  label: string;
  icon: IconType;
  selected: boolean;
  onClick: (value: string) => void;
}

const CategoryInput: React.FC<ICategoryInputProps> = (props) => {
  const { icon: Icon, label, onClick, selected } = props;
  return (
    <div
      onClick={() => onClick(label)}
      className={`
        flex
        cursor-pointer
        flex-col
        gap-3
        rounded-xl
        border-2
        p-4
        transition
        hover:border-black
        ${selected ? "border-black" : "border-neutral-200"}
      `}
    >
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CategoryInput;
