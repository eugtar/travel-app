import React from "react";
import ListingClient from "./ListingClient";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { ClientOnly, EmptyState } from "@/app/components";
import getListingById from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservations";

const ListingPage: React.FC<{ params: { listingId?: string } }> = async ({
  params,
}) => {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ListingPage;
