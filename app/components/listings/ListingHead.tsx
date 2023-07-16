"use client";
import React from "react";
import Image from "next/image";
import Heading from "../Heading";
import { TSafeUser } from "@/app/types";
import HeartButton from "../HeartButton";
import useCountries from "@/app/hooks/useCountries";

interface IListingHead {
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
  currentUser?: TSafeUser | null;
}

const ListingHead: React.FC<IListingHead> = ({
  id,
  imageSrc,
  locationValue,
  title,
  currentUser,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div
        className="
          relative
          h-[60vh]
          w-full
          overflow-hidden
          rounded-xl
        "
      >
        <Image
          alt="image"
          src={imageSrc}
          fill
          className="w-full object-cover"
        />
        <div className="absolute right-5 top-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
