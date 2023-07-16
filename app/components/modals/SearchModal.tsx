"use client";
import Modal from ".";
import React from "react";
import Heading from "../Heading";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import { Range } from "react-date-range";
import Calendar from "../inputs/Calendar";
import { TCountrySelectValue } from "@/app/types";
import CountrySelect from "../inputs/CountrySelect";
import useSearchModal from "@/app/hooks/useSearchModal";
import { useRouter, useSearchParams } from "next/navigation";
import { formatISO } from "date-fns";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const initDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const SearchModal: React.FC = () => {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();
  const [step, setStep] = React.useState(STEPS.LOCATION);
  const [roomCount, setRoomCount] = React.useState<number>(1);
  const [guestCount, setGuestCount] = React.useState<number>(1);
  const [bathroomCount, setBathroomCount] = React.useState<number>(1);
  const [location, setLocation] = React.useState<TCountrySelectValue>();
  const [dateRange, setDateRange] = React.useState<Range>(initDateRange);

  const Map = React.useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const onBack = React.useCallback(() => {
    setStep((prev) => prev - 1);
  }, []);

  const onNext = React.useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const actionLabel = React.useMemo(() => {
    if (step === STEPS.INFO) return "Search";
    return "Next";
  }, [step]);

  const secondaryActionLabel = React.useMemo(() => {
    if (step === STEPS.LOCATION) return undefined;
    return "Back";
  }, [step]);

  const onSubmit = React.useCallback(async () => {
    if (step !== STEPS.INFO) return onNext();
    let currentQuery = {};
    if (params) currentQuery = Object.fromEntries(params);
    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };
    if (dateRange.startDate)
      updatedQuery.startDate = formatISO(dateRange.startDate);
    if (dateRange.endDate) updatedQuery.endDate = formatISO(dateRange.endDate);
    const url = `?${new URLSearchParams(updatedQuery).toString()}`;
    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, [
    step,
    params,
    router,
    location,
    dateRange,
    roomCount,
    guestCount,
    searchModal,
    bathroomCount,
    onNext,
  ]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        center
        title="Where do you wanna go?"
        subtitle="Find the perfect location!"
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as TCountrySelectValue)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          center
          title="When do you plan to go?"
          subtitle="Make sure everyone is free!"
        />
        <Calendar
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          center
          title="More information"
          subtitle="Find your perfect place!"
        />
        <Counter
          title="Guests"
          value={guestCount}
          subtitle="How many guests are coming?"
          onChange={(value) => setGuestCount(value)}
        />
        <hr />
        <Counter
          title="Rooms"
          value={roomCount}
          subtitle="How many rooms do you need?"
          onChange={(value) => setRoomCount(value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          value={bathroomCount}
          subtitle="How many bathrooms do you need?"
          onChange={(value) => setBathroomCount(value)}
        />
      </div>
    );
  }

  return (
    <Modal
      title="Filters"
      body={bodyContent}
      onSubmit={onSubmit}
      actionLabel={actionLabel}
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
    />
  );
};

export default SearchModal;
