"use client";
import React from "react";
import Image from "next/image";
import Button from "../Button";
import { format } from "date-fns";
import HeartButton from "../HeartButton";
import { useRouter } from "next/navigation";
import formatPrice from "../../libs/formatPrice";
import useCountries from "@/app/hooks/useCountries";
import { TSafeListing, TSafeUser, TSafeReservation } from "@/app/types";

interface IListingCardProps {
  actionId: string;
  disabled?: boolean;
  data: TSafeListing;
  actionLabel?: string;
  reservation?: TSafeReservation;
  currentUser: TSafeUser | null | undefined;
  onAction?: (id: string) => void;
}

const ListingCard: React.FC<IListingCardProps> = (props) => {
  const {
    data,
    disabled,
    actionId,
    reservation,
    actionLabel,
    currentUser,
    onAction,
  } = props;

  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(data.locationValue);

  const handleCancel = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) return;
      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const price = React.useMemo(() => {
    if (reservation) {
      return formatPrice(reservation.totalPrice);
    }
    return formatPrice(data.price);
  }, [reservation, data.price]);

  const reservationDate = React.useMemo(() => {
    if (!reservation) return null;
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")}-${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="
        group
        col-span-1
        cursor-pointer
      "
    >
      <div
        className="
          flex
          w-full
          flex-col
          gap-2
        "
      >
        <div
          className="
              relative
              aspect-square
              w-full
              overflow-hidden
              rounded-xl
            "
        >
          <Image
            fill
            className="
                h-full
                w-full
                object-cover
                transition
                group-hover:scale-110
              "
            src={data.imageSrc}
            alt="listing"
          />
          <div
            className="
              absolute
              right-3
              top-3
            "
          >
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div
          className="
            text-lg
            font-semibold
          "
        >
          {location?.region}, {location?.label}
        </div>
        <div
          className="
            font-light
          text-neutral-500
          "
        >
          {reservationDate || data.category}
        </div>
        <div
          className="
            flex
            flex-row
            items-center
            gap-1
          "
        >
          <div className="font-semibold">{price}</div>
          {!reservation ? <div className="font-light">night</div> : null}
        </div>
        {onAction && actionLabel ? (
          <Button
            small
            disabled={disabled}
            label={actionLabel}
            onClick={handleCancel}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ListingCard;
