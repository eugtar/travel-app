import React from "react";
import { TSafeListing } from "./types";
import getCurrentUser from "./actions/getCurrentUser";
import ListingCard from "./components/listings/ListingCard";
import { ClientOnly, Container, EmptyState } from "./components";
import getListings, { IListingsParams } from "./actions/getListings";

const Home: React.FC<{ searchParams: IListingsParams }> = async ({
  searchParams,
}) => {
  const currentUser = await getCurrentUser();
  const listings = await getListings(searchParams);

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div
          className="
            grid
            grid-cols-1
            gap-8
            pt-24
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
          "
        >
          {listings.map((listing: TSafeListing) => {
            return (
              <ListingCard
                data={listing}
                key={listing.id}
                actionId={listing.id}
                currentUser={currentUser}
              />
            );
          })}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default Home;
