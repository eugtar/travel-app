"use client";
import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface ICounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter: React.FC<ICounterProps> = (props) => {
  const { title, subtitle, value, onChange } = props;

  const onAdd = React.useCallback(() => {
    onChange(value + 1);
  }, [value, onChange]);

  const onReduce = React.useCallback(() => {
    if (value === 1) {
      return;
    }
    onChange(value - 1);
  }, [value, onChange]);

  return (
    <div
      className="
        flex
        flex-row
        items-center
        justify-between
      "
    >
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-600">{subtitle}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div
          role="button"
          title="Reduce"
          onClick={onReduce}
          className="
            flex
            h-10
            w-10
            cursor-pointer
            items-center
            justify-center
            rounded-full
            border-[1px]
            border-neutral-400
            text-neutral-600
            transition
            hover:opacity-80
          "
        >
          <AiOutlineMinus />
        </div>
        <div className="text-xl font-light text-neutral-600">{value}</div>
        <div
          role="button"
          title="Add"
          onClick={onAdd}
          className="
            flex
            h-10
            w-10
            cursor-pointer
            items-center
            justify-center
            rounded-full
            border-[1px]
            border-neutral-400
            text-neutral-600
            transition
            hover:opacity-80
          "
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};

export default Counter;
