"use client";
import React from "react";
import { Container, Heading } from "../components";
import { TSafeReservation, TSafeUser } from "../types";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

const ReservationsClient: React.FC<{
  reservations: TSafeReservation[];
  currentUser: TSafeUser;
}> = ({ reservations, currentUser }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = React.useState<string>("");

  const onCancel = React.useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled!");
          router.refresh();
        })
        .catch((error) => toast.error(error.message))
        .finally(() => setDeletingId(""));
    },
    [router]
  );

  return (
    <Container>
      <Heading
        center
        title="Reservations"
        subtitle="Bookings on your properties"
      />
      <div
        className="
        mt-10
        grid
        grid-cols-1
        gap-8
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
      "
      >
        {reservations.map((reservation) => {
          return (
            <ListingCard
              key={reservation.id}
              data={reservation.listing}
              reservation={reservation}
              actionId={reservation.id}
              onAction={onCancel}
              disabled={deletingId === reservation.id}
              actionLabel="Cancel guest reservation"
              currentUser={currentUser}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default ReservationsClient;
