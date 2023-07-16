"use client";
import React from "react";
import Avatar from "../Avatar";
import dynamic from "next/dynamic";
import { IconType } from "react-icons";
import { TSafeUser } from "@/app/types";
import ListingCategory from "./ListingCategory";
import useCountries from "@/app/hooks/useCountries";

const Map = dynamic(() => import("../Map"), {
  ssr: false,
});

interface IListingInfo {
  user: TSafeUser;
  roomCount: number;
  guestCount: number;
  description: string;
  locationValue: string;
  bathroomCount: number;
  category:
    | {
        label: string;
        icon: IconType;
        description: string;
      }
    | undefined;
}

const ListingInfo: React.FC<IListingInfo> = (props) => {
  const {
    user,
    category,
    roomCount,
    guestCount,
    description,
    bathroomCount,
    locationValue,
  } = props;
  const { getByValue } = useCountries();
  const location = getByValue(locationValue)?.latlng;

  return (
    <div
      className="
        col-span-4
        flex
        flex-col
        gap-8
      "
    >
      <div
        className="
          flex
          flex-col
          gap-2
        "
      >
        <div
          className="
            flex
            flex-row
            items-center
            gap-2
            text-xl
            font-semibold
          "
        >
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div
          className="
            flex
            flex-row
            items-center
            gap-4
            font-light
          text-neutral-500
        "
        >
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category ? (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      ) : null}
      <hr />
      <div
        className="
          text-lg
          font-light
        text-neutral-500
        "
      >
        {description}
      </div>
      <hr />
      <Map center={location as number[]} />
    </div>
  );
};

export default ListingInfo;
