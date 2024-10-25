import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createTask } from "../../CRUD/Tasks";
import { Task } from "../../types";

export interface CreateTaskState {
  isCreatingNewTask: boolean, 
  createError: null | string
}

const initialState: CreateTaskState = {
  isCreatingNewTask: false,
  createError: null
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTaskThunk.pending, (state) => {
        state.isCreatingNewTask = true;
      })
      .addCase(createTaskThunk.rejected, (state) => {
        state.createError = "Some Thing went wrong while creating the Task !";
      })
      .addCase(createTaskThunk.fulfilled, (state) => {
        state.isCreatingNewTask = false;
      });
  },
});

export const createTaskThunk = createAsyncThunk("tasks/createTask", async (data: Task) => {
  return await createTask(data);
});

// Action creators are generated for each case reducer function
// export const { } = counterSlice.actions
export default counterSlice.reducer;
