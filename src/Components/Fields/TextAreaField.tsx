import { Controller, useFormContext } from "react-hook-form";

const TextAreaField = ({ error, label }: { label: string; error?: string }) => {
  const { control } = useFormContext();

  return (
    <div>
      <label htmlFor="description">{label}</label>
      <Controller
        name="description"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <textarea
            {...field}
            id="description"
            placeholder="Enter task description"
          />
        )}
      />
      {error && <p>{error}</p>}
    </div>
  );
};

export default TextAreaField;
