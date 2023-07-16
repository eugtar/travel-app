"use client";
import React from "react";
import Select from "react-select";
import { TCountrySelectValue } from "@/app/types";
import useCountries from "@/app/hooks/useCountries";

interface ICountrySelectProps {
  value?: TCountrySelectValue;
  onChange: (value: TCountrySelectValue) => void;
}

const CountrySelect: React.FC<ICountrySelectProps> = ({ value, onChange }) => {
  const { getAll, getByValue } = useCountries();

  return (
    <div className="">
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as TCountrySelectValue)}
        formatOptionLabel={(option: any) => {
          return (
            <div className="flex flex-row items-center gap-3">
              <div className="">{option.flag}</div>
              <div className="">
                {option.label},
                <span className="ml-1 text-neutral-500">{option.region}</span>
              </div>
            </div>
          );
        }}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => {
          return {
            ...theme,
            borderRadius: 6,
            colors: {
              ...theme.colors,
              primary: "black",
              primary25: "#FFE4E6",
            },
          };
        }}
      />
    </div>
  );
};

export default CountrySelect;
