"use client";
import Modal from ".";
import React from "react";
import axios from "axios";
import Heading from "../Heading";
import dynamic from "next/dynamic";
import Input from "../inputs/Input";
import Counter from "../inputs/Counter";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import categories from "@/app/data/categories";
import ImageUpload from "../inputs/ImageUpload";
import CategoryInput from "../inputs/CategoryInput";
import useRentModal from "@/app/hooks/useRentModal";
import CountrySelect from "../inputs/CountrySelect";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal: React.FC = () => {
  const router = useRouter();
  const rentModal = useRentModal();
  const [step, setStep] = React.useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const Map = React.useMemo(() => {
    return dynamic(() => import("../Map"), { ssr: false });
  }, [location]);

  const setCustomValue = React.useCallback(
    (id: string, value: any) => {
      setValue(id, value, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    },
    [setValue]
  );

  const onBack = () => {
    setStep((prev) => prev - 1);
  };

  const onNext = () => {
    setStep((prev) => prev + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }
    setIsLoading(true);

    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listing Created!");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch((error) => toast.error(error.message))
      .finally(() => setIsLoading(false));
  };

  const actionLabel = React.useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = React.useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <div
      className="
        flex
        flex-col
        gap-8
      "
    >
      <Heading
        center
        subtitle="Pick a category"
        title="Which of these best describes your place?"
      />
      <div
        className="
          grid
          max-h-[50vh]
          grid-cols-1
          gap-3
          overflow-y-auto
          md:grid-cols-2
        "
      >
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.label}
              icon={item.icon}
              label={item.label}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          center
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          center
          subtitle="What amenities do you have?"
          title="Share some basics about your place"
        />
        <Counter
          value={guestCount}
          title="Guests"
          subtitle="How many guests do you allow?"
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <hr />
        <Counter
          value={roomCount}
          title="Rooms"
          subtitle="How many rooms do you have?"
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <hr />
        <Counter
          value={bathroomCount}
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          center
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like!"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          center
          title="How would you describe your place?"
          subtitle="Short and sweet works best!"
        />
        <Input
          required
          id="title"
          label="Title"
          maxLength={240}
          errors={errors}
          register={register}
          disabled={isLoading}
        />
        <hr />
        <Input
          required
          errors={errors}
          id="description"
          label="Description"
          register={register}
          disabled={isLoading}
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
        />
        <Input
          required
          id="price"
          formatPrice
          label="Price"
          type="number"
          errors={errors}
          register={register}
          disabled={isLoading}
        />
      </div>
    );
  }

  return (
    <Modal
      body={bodyContent}
      title="Airbnb your home!"
      actionLabel={actionLabel}
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
    />
  );
};

export default RentModal;
