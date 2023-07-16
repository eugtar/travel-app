"use client";
import React from "react";
import Button from "./Button";
import Heading from "./Heading";
import { useRouter } from "next/navigation";

const EmptyState: React.FC<{
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}> = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters",
  showReset,
}) => {
  const router = useRouter();

  return (
    <div
      className="
        flex
        h-[60vh]
        flex-col
        items-center
        justify-center
        gap-2
      "
    >
      <Heading center title={title} subtitle={subtitle} />
      <div className="mt-4 w-48">
        {showReset ? (
          <Button
            outline
            label="Remove all filters"
            onClick={() => router.push("/")}
          />
        ) : null}
      </div>
    </div>
  );
};

export default EmptyState;
