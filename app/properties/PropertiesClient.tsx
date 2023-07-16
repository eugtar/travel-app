"use client";
import React from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Container, Heading } from "../components";
import { TSafeListing, TSafeUser } from "../types";
import ListingCard from "../components/listings/ListingCard";

const PropertiesClient: React.FC<{
  listings: TSafeListing[];
  currentUser?: TSafeUser | null;
}> = ({ listings, currentUser }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = React.useState<string>("");

  const onCancel = React.useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Listing deleted!");
          router.refresh();
        })
        .catch((error) => toast.error(error?.response?.data?.error))
        .finally(() => setDeletingId(""));
    },
    [router]
  );

  return (
    <Container>
      <Heading center title="Properties" subtitle="List of your properties" />
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
              key={listing.id}
              data={listing}
              actionId={listing.id}
              onAction={onCancel}
              disabled={deletingId === listing.id}
              actionLabel="Delete property"
              currentUser={currentUser}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default PropertiesClient;
