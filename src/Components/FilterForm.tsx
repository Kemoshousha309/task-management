import React from "react";
import { useForm, Controller } from "react-hook-form";
import { PriorityEnum, StateEnum } from "../types";

export interface Filters {
  name: string;
  priority: string;
  state: string;
}

interface FilterFormProps {
  onFilter: (filters: Filters) => void; // Modify this type based on your filter structure
}

const FilterForm: React.FC<FilterFormProps> = ({ onFilter }) => {
  const defaultValues = {
    name: "",
    priority: "",
    state: "",
  };
  const { control, getValues, reset } = useForm({
    defaultValues,
  });

  // Handler for filtering on change
  const handleChange = (field: keyof Filters) => (value: string) => {
    onFilter({ ...getValues(), [field]: value });
  };

  return (
    <form className="space-y-4 flex gap-2 p-2 items-center max-sm:flex-wrap">
      {/* Filter by Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Filter by Name:
        </label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <input
              type="text"
              {...field}
              placeholder="Enter task name"
              onChange={(e) => {
                field.onChange(e);
                handleChange("name")(e.target.value); // Call handleChange on input change
              }}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          )}
        />
      </div>

      {/* Filter by Priority */}
      <fieldset style={{ margin: 0 }}>
        <legend className="block text-sm font-medium text-gray-700">
          Filter by Priority:
        </legend>
        <div className="mt-2">
          {[PriorityEnum.low, PriorityEnum.medium, PriorityEnum.high].map(
            (priority) => (
              <label key={priority} className="inline-flex items-center mr-4">
                <Controller
                  name="priority"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="radio"
                      value={priority}
                      checked={field.value === priority}
                      onChange={() => {
                        field.onChange(priority);
                        handleChange("priority")(priority); // Call handleChange on radio selection
                      }}
                      className="text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  )}
                />
                <span className="ml-2 text-gray-700">
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </span>
              </label>
            )
          )}
        </div>
      </fieldset>

      {/* Filter by State */}
      <fieldset style={{ margin: 0 }}>
        <legend className="block text-sm font-medium text-gray-700">
          Filter by State:
        </legend>
        <div className="mt-2">
          {[StateEnum.doing, StateEnum.done, StateEnum.todo].map((state) => (
            <label
              key={state}
              className="inline-flex items-center mr-4  whitespace-nowrap"
            >
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <input
                    type="radio"
                    value={state}
                    checked={field.value === state}
                    onChange={() => {
                      field.onChange(state);
                      handleChange("state")(state); // Call handleChange on radio selection
                    }}
                    className="text-blue-600 focus:ring-blue-500 border-gray-300 rounded "
                  />
                )}
              />
              <span className="ml-2 text-gray-700">
                {state.charAt(0).toUpperCase() + state.slice(1)}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <button
        type="button"
        onClick={() => {
          reset(defaultValues);
          handleChange("name")("");
        }}
      >
        Clear filters
      </button>
    </form>
  );
};

export default FilterForm;
