import { Controller, useFormContext } from "react-hook-form";

const SelectField = ({ error, label }: { label: string; error?: string }) => {
  const { control } = useFormContext();

  return (
    <div>
      <label htmlFor="priority">{label}</label>
      <Controller
        name="priority"
        control={control}
        defaultValue="medium"
        render={({ field }) => (
          <select {...field} id="priority" value={field.value as string}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        )}
      />
      {error && <p>{error}</p>}
    </div>
  );
};

export default SelectField;
