import React from "react";
import getCurrentUser from "../actions/getCurrentUser";
import { ClientOnly, EmptyState } from "../components";
import getFavoriteListings from "../actions/getFavoriteListings";
import FavoritesClient from "./FavoritesClient";

const ListingPage: React.FC = async () => {
  const favorites = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (favorites.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favorites found"
          subtitle="Looks like you have no favorite listings."
        />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <FavoritesClient listings={favorites} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default ListingPage;
