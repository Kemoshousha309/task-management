// AddTask.tsx
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Task, taskSchema } from "../types";
import ImageUploader from "./Fields/ImageUploader";
import { useDispatch, useSelector } from "react-redux";
import { createTaskThunk } from "../store/slices/CreateTask";
import { AppDispatch, RootState } from "../store/store";

const TaskForm: React.FC = () => {
  // Initialize useForm hook with validation resolver
  const formMethods = useForm<Task>({
    resolver: yupResolver(taskSchema),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = formMethods;

  const dispatch = useDispatch<AppDispatch>();
  const { createError, isCreatingNewTask } = useSelector(
    (s: RootState) => s.CreateTaskState
  );

  // Handle form submission
  const onSubmit = async (data: Task) => {
    await dispatch(createTaskThunk(data)).unwrap();
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
          {errors.title && <p>{errors.title.message}</p>}
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
          {errors.description && <p>{errors.description.message}</p>}
        </div>

        <div>
          <label htmlFor="priority">Priority</label>
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
          {errors.priority && <p>{errors.priority.message}</p>}
        </div>

        <div>
          <label htmlFor="state">State</label>
          <Controller
            name="state"
            control={control}
            defaultValue="todo"
            render={({ field }) => (
              <select {...field} id="state" value={field.value as string}>
                <option value="todo">To Do</option>
                <option value="doing">Doing</option>
                <option value="done">Done</option>
              </select>
            )}
          />
          {errors.state && <p>{errors.state.message}</p>}
        </div>
        <ImageUploader
          label="Upload Image"
          error={errors.image ? errors.image.message : undefined}
        />
        {isCreatingNewTask ? (
          "loading"
        ) : (
          <button type="submit">Add Task</button>
        )}
      </form>
    </FormProvider>
  );
};

export default TaskForm;
