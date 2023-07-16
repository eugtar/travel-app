"use client";
import React from "react";
import Button from "../Button";
import { Range } from "react-date-range";
import Calendar from "../inputs/Calendar";
import formatPrice from "@/app/libs/formatPrice";

interface IListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  disabled?: boolean;
  disabledDates: Date[];
  onSubmit: () => void;
  onChangeDate: (value: Range) => void;
}

const ListingReservation: React.FC<IListingReservationProps> = (props) => {
  const {
    price,
    disabled,
    dateRange,
    totalPrice,
    disabledDates,
    onSubmit,
    onChangeDate,
  } = props;
  return (
    <div
      className="
        overflow-hidden
        rounded-xl
        border-[1px]
        bg-primary_light
      "
    >
      <div
        className="
          flex
          flex-row
          items-center
          gap-1
          p-4
        "
      >
        <div className="text-2xl font-semibold">{formatPrice(price)}</div>
        <div className="font-light text-neutral-600">night</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4">
        <Button label="Reserve" onClick={onSubmit} disabled={disabled} />
      </div>
      <div
        className="
          flex
          flex-row
          items-center
          justify-between
          p-4
          text-lg
          font-semibold
        "
      >
        <div>Total</div>
        <div>{formatPrice(totalPrice)}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
