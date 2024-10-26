import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createTask, updateTask } from "../../CRUD/Tasks";
import { TaskSchema } from "../../types";

export interface CreateTaskState {
  isMutatingTask: boolean, 
  createError: null | string
}

const initialState: CreateTaskState = {
  isMutatingTask: false,
  createError: null
};

export const MutateTask = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTaskThunk.pending, (state) => {
        state.isMutatingTask = true;
      })
      .addCase(createTaskThunk.rejected, (state) => {
        state.createError = "Some Thing went wrong while creating the Task !";
      })
      .addCase(createTaskThunk.fulfilled, (state) => {
        state.isMutatingTask = false;
      })
      .addCase(editTaskThunk.pending, (state) => {
        state.isMutatingTask = true;
      })
      .addCase(editTaskThunk.rejected, (state) => {
        state.createError = "Some Thing went wrong while updating the Task !";
      })
      .addCase(editTaskThunk.fulfilled, (state) => {
        state.isMutatingTask = false;
      });
  },
});

export const createTaskThunk = createAsyncThunk("tasks/createTask", async (data: TaskSchema) => {
  return await createTask(data);
});

export const editTaskThunk = createAsyncThunk("tasks/updateTask", async (data: {id: string, updatedData: TaskSchema}) => {
  return await updateTask(data.id, data.updatedData);
});

// Action creators are generated for each case reducer function
export default MutateTask.reducer;
