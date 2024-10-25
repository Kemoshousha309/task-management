import { HTMLAttributes } from "react";
import { Controller, useFormContext } from "react-hook-form";

const TextField = ({
  error,
  label,
  ...rest
}: {
  label: string;
  error?: string;
} & HTMLAttributes<HTMLInputElement>) => {
  const { control } = useFormContext();

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Controller
        name={rest.}
        control={control}
        defaultValue=""
        render={({ field }) => <input  {...field} id={rest.name} type="text" />}
      />
      {error && <p>{error}</p>}
    </div>
  );
};

export default TextField;
