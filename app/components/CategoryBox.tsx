"use client";
import React from "react";
import { ICategory } from "../data/categories";
import { useRouter, useSearchParams } from "next/navigation";

const CategoryBox: React.FC<ICategory & { selected: boolean }> = ({
  label,
  selected,
  icon: Icon,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = React.useCallback(() => {
    let currentQuery = {};
    if (params) currentQuery = Object.fromEntries(params);
    const updatedQuery: any = { ...currentQuery, category: label };
    if (params?.get("category") === label) delete updatedQuery.category;
    const url = `?${new URLSearchParams(updatedQuery).toString()}`;

    router.push(url);
  }, [label, router, params]);

  return (
    <div
      role="button"
      title={label}
      onClick={handleClick}
      className={`
          flex
          cursor-pointer
          flex-col
          items-center
          justify-center
          gap-2
          border-b-2
          p-3
          text-rose-500
          transition
          hover:text-rose-300
          ${selected ? "border-b-rose-500" : "border-transparent"}
          ${selected ? "text-rose-600" : "text-rose-500"}  
        `}
    >
      <Icon size={26} />
      <div className="text-sm font-medium">{label}</div>
    </div>
  );
};

export default CategoryBox;
