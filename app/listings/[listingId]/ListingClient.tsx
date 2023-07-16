"use client";
import React from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";
import { Container } from "@/app/components";
import categories from "@/app/data/categories";
import useLoginModal from "@/app/hooks/useLoginModal";
import { differenceInDays, eachDayOfInterval } from "date-fns";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import { TSafeListing, TSafeReservation, TSafeUser } from "@/app/types";
import ListingReservation from "@/app/components/listings/ListingReservation";

const initDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const ListingClient: React.FC<{
  reservations?: TSafeReservation[];
  listing: TSafeListing & { user: TSafeUser };
  currentUser?: TSafeUser | null;
}> = ({ listing, currentUser, reservations = [] }) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [totalPrice, setTotalPrice] = React.useState(listing.price);
  const [dateRange, setDateRange] = React.useState<Range>(initDateRange);

  const disabledDates = React.useMemo(() => {
    let dates: Date[] = [];
    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });
      dates = [...dates, ...range];
    });
    return dates;
  }, [reservations]);

  const category = React.useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing]);

  const onCreateReservation = React.useCallback(() => {
    if (!currentUser) return loginModal.onOpen();
    setIsLoading(true);
    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success("Listing reserved!");
        setDateRange(initDateRange);
        router.push("/trips");
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [totalPrice, loginModal, currentUser, dateRange, listing?.id, router]);

  React.useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);
      if (dayCount && listing.price) setTotalPrice(dayCount * listing.price);
      else setTotalPrice(listing.price);
    }
    return;
  }, [dateRange, listing.price]);

  return (
    <Container>
      <div
        className="
          mx-auto
          max-w-screen-lg
        "
      >
        <div
          className="
            flex
            flex-col
            gap-6
          "
        >
          <ListingHead
            id={listing.id}
            title={listing.title}
            currentUser={currentUser}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
          />
          <div
            className="
              mt-6
              grid
              grid-cols-1
              md:grid-cols-7
              md:gap-10
            "
          >
            <ListingInfo
              category={category}
              user={listing.user}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              description={listing.description}
              locationValue={listing.locationValue}
              bathroomCount={listing.bathroomCount}
            />
            <div
              className="
                order-first
                mb-10
                md:order-last
                md:col-span-3
              "
            >
              <ListingReservation
                disabled={isLoading}
                price={listing.price}
                dateRange={dateRange}
                totalPrice={totalPrice}
                disabledDates={disabledDates}
                onSubmit={onCreateReservation}
                onChangeDate={(value) => setDateRange(value)}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
