import React from "react";
import TripsClient from "./PropertiesClient";
import PropertiesClient from "./PropertiesClient";
import { EmptyState, ClientOnly } from "../components";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import getListings from "../actions/getListings";

const PropertiesPage: React.FC = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login!" />
      </ClientOnly>
    );
  }

  const listings = await getListings({ userId: currentUser?.id });
  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No properties found"
          subtitle="Looks like you have no  properties."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <PropertiesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default PropertiesPage;
