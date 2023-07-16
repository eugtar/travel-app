"use client";
import React from "react";
import { IconType } from "react-icons";

interface IButtonProps {
  type?: "button" | "submit" | "reset";
  label: string;
  icon?: IconType;
  small?: boolean;
  outline?: boolean;
  disabled?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<IButtonProps> = (props) => {
  const {
    label,
    onClick,
    disabled,
    icon: Icon,
    outline,
    small,
    type = "button",
  } = props;

  return (
    <button
      type={type}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className={`
    relative w-full rounded-lg transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-70 ${
      outline ? "bg-primary_light" : "bg-rose-500"
    }
      ${outline ? "border-primary_dark" : "border-rose-500"}
      ${outline ? "text-text_dark" : "text-text_light"}
      ${small ? "py-1" : "py-3"}
      ${small ? "text-sm" : "text-base"}
      ${small ? "font-light" : "font-semibold"}
      ${small ? "border-[1px]" : "border-2"}
      `}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {label}
    </button>
  );
};

export default Button;
