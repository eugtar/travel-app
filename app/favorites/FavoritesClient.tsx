import React from "react";
import Heading from "../components/Heading";
import Container from "../components/Container";
import { TSafeListing, TSafeUser } from "../types";
import ListingCard from "../components/listings/ListingCard";

const FavoritesClient: React.FC<{
  listings: TSafeListing[];
  currentUser?: TSafeUser | null;
}> = ({ listings, currentUser }) => {
  return (
    <Container>
      <Heading
        center
        title="Favorites"
        subtitle="List of places you have favorited!"
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
        {listings.map((listing) => {
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
  );
};

export default FavoritesClient;
