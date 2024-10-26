// AddTask.tsx
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createTaskThunk, editTaskThunk } from "../store/slices/MutateTask";
import { AppDispatch, RootState } from "../store/store";
import {
  PriorityEnum,
  StateEnum,
  TaskResponse,
  TaskSchema,
  taskSchema,
} from "../types";
import ImageUploader from "./ImageUploader";
import { useNavigate } from "react-router-dom";

const TaskForm = ({
  defaultValues,
  type,
}: {
  defaultValues?: TaskResponse;
  type: "add" | "edit";
}) => {
  // Initialize useForm hook with validation resolver
  const formMethods = useForm<TaskSchema>({
    resolver: yupResolver(taskSchema),
    defaultValues: {
      description: defaultValues?.description,
      priority: defaultValues?.priority,
      state: defaultValues?.state,
      title: defaultValues?.title,
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = formMethods;

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { createError, isMutatingTask } = useSelector(
    (s: RootState) => s.MutateTask
  );

  // Handle form submission
  const onSubmit = async (data: TaskSchema) => {
    if (type == "add") {
      await dispatch(createTaskThunk(data)).unwrap();
    } else {
      if (defaultValues) {
        await dispatch(
          editTaskThunk({ id: defaultValues.id, updatedData: data })
        ).unwrap();
      }
    }
    navigate("/");
  };

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[500px] mx-auto my-4 max-sm:w-full flex flex-col gap-2"
      >
        {createError && <p className="text">{createError}</p>}
        <div>
          <label htmlFor="title">Title</label>
          <Controller
            name="title"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                id="title"
                type="text"
                placeholder="Enter task title"
              />
            )}
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>

        <div>
          <label htmlFor="description">Description</label>
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
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}
        </div>

        <div>
          <label htmlFor="priority">Priority</label>
          <Controller
            name="priority"
            control={control}
            defaultValue={PriorityEnum.low}
            render={({ field }) => (
              <select {...field} id="priority" value={field.value as string}>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            )}
          />
          {errors.priority && <p className="text-red-500">{errors.priority.message}</p>}
        </div>

        <div>
          <label htmlFor="state">State</label>
          <Controller
            name="state"
            control={control}
            defaultValue={StateEnum.todo}
            render={({ field }) => (
              <select {...field} id="state" value={field.value as string}>
                <option value="TO DO">To Do</option>
                <option value="DOING">Doing</option>
                <option value="DONE">Done</option>
              </select>
            )}
          />
          {errors.state && <p className="text-red-500">{errors.state.message}</p>}
        </div>
        <ImageUploader
          preview={defaultValues?.image ?? null}
          label="Upload Image"
          error={errors.image ? errors.image.message : undefined}
        />

        <button type="submit">
          {isMutatingTask
            ? "loading"
            : type === "add"
            ? "Add Task"
            : "Edit Task"}
        </button>
      </form>
    </FormProvider>
  );
};

export default TaskForm;
