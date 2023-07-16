"use client";
import React from "react";
import { BiDollar } from "react-icons/bi";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

interface IInputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  maxLength?: number;
  errors: FieldErrors;
  formatPrice?: boolean;
  register: UseFormRegister<FieldValues>;
}

const Input: React.FC<IInputProps> = (props) => {
  const {
    id,
    type,
    errors,
    label = "text",
    disabled,
    required,
    formatPrice,
    maxLength,
    register,
  } = props;

  return (
    <div className="relative w-full">
      {formatPrice ? (
        <BiDollar
          size={24}
          className="absolute left-2 top-5 text-neutral-700"
        />
      ) : null}
      <input
        id={id}
        type={type}
        placeholder=" "
        maxLength={maxLength}
        disabled={disabled}
        {...register(id, { required })}
        className={`
        ${formatPrice ? "pl-9" : "pl-4"}
        ${errors[id] ? "border-rose-500" : "border-neutral-300"} 
        ${errors[id] ? "focus:border-rose-500" : "focus:border-primary_dark"} 
        peer w-full rounded-md border-2 bg-primary_light p-4 pt-6 font-light outline-none transition disabled:cursor-not-allowed disabled:opacity-70
        `}
      />
      <label
        htmlFor={id}
        className={`absolute top-5 z-10 origin-[0] -translate-y-3 transform text-base duration-150 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 ${
          errors[id] ? "text-rose-500" : "text-zinc-400"
        } ${formatPrice ? "left-9" : "left-4"} `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
