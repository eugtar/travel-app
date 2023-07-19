"use client";
import React from "react";
import { BiSearch } from "react-icons/bi";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import useCountries from "@/app/hooks/useCountries";
import useSearchModal from "@/app/hooks/useSearchModal";

const Search: React.FC = () => {
  const params = useSearchParams();
  const searchModal = useSearchModal();
  const { getByValue } = useCountries();

  const endDate = params?.get("endDate");
  const startDate = params?.get("startDate");
  const guestCount = params?.get("guestCount");
  const locationValue = params?.get("locationValue");

  const locationLabel = React.useMemo(() => {
    if (locationValue) return getByValue(locationValue as string)?.label;
    return "Anywhere";
  }, [getByValue, locationValue]);

  const durationLabel = React.useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diff = differenceInDays(end, start);
      return `${diff === 0 ? 1 : diff} Days`;
    }
    return "Any Week";
  }, [startDate, endDate]);

  const guestLabel = React.useMemo(() => {
    if (guestCount) return `${guestCount} Guests`;
    return "Add Guests";
  }, [guestCount]);

  return (
    <div
      role="button"
      title="Search"
      onClick={searchModal.onOpen}
      className="
        w-full
        cursor-pointer
        rounded-full
        border-[1px]
        py-2
        shadow-sm
        transition
        hover:shadow-md
        md:w-auto
      "
    >
      <div
        className="
          flex
          flex-row
          items-center
          justify-between
        "
      >
        <div
          className="
            px-6
            text-sm
            font-semibold
          "
        >
          {locationLabel}
        </div>
        <div
          className="
            hidden
            flex-1
            border-x-[1px]
            px-6
            text-center
            text-sm
            font-semibold
            sm:block
          "
        >
          {durationLabel}
        </div>
        <div
          className="
            flex
            flex-row
            items-center
            gap-3
            pl-6
            pr-2
            text-sm
            text-gray-600
          "
        >
          <div className="hidden sm:block">{guestLabel}</div>
          <div
            className="
              rounded-full
              bg-rose-500
              p-2
              text-text_light
            "
          >
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
