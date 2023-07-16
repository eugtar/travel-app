"use client";
import React from "react";
import Image from "next/image";
import { TbPhotoPlus } from "react-icons/tb";
import { CldUploadWidget } from "next-cloudinary";

declare global {
  var cloudinary: any;
}

const ImageUpload: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  const handleUpload = React.useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="i0hmhy1q"
      options={{ maxFiles: 1 }}
    >
      {({ open }) => (
        <div
          onClick={() => open?.()}
          className="
          relative
          flex
          cursor-pointer
          flex-col
          items-center
          justify-center
          gap-4
          rounded-lg
          border-2
          border-dashed
          border-neutral-300
          p-20
          text-neutral-600
          transition
          hover:opacity-70
        "
        >
          <TbPhotoPlus size={50} />
          <div className="text-lg font-semibold">Click to upload</div>
          {value ? (
            <div className="absolute inset-0 h-full w-full">
              <Image
                alt="upload"
                fill
                style={{ objectFit: "cover" }}
                src={value}
              />
            </div>
          ) : null}
        </div>
      )}
    </CldUploadWidget>
  );
};

export default ImageUpload;
