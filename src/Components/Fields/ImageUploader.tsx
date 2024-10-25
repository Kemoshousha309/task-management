import { ChangeEvent, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

const ImageUploader = ({ error, label }: { label: string; error?: string }) => {
  const { control } = useFormContext();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files?.length < 0) return;

    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Create a preview URL
    }
  };
  return (
    <div className="flex gap-2 items-center my-2 justify-between max-sm:flex-wrap">
      <div className="">
        <label htmlFor="image">{label} </label>
        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => {
                field.onChange(e.target.files); // Set the value in react-hook-form
                handleImageChange(e); // Handle the image change for preview
              }}
            />
          )}
        />
        {error && <p className="text-red-500">{error}</p>}
      </div>
      {imagePreview && (
        <div className="mx-auto">
          <img
            width="180px"
            height="180px"
            src={imagePreview}
            alt="Preview"
            className="object-contain"
            style={{ maxWidth: "180px", maxHeight: "180px" }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
