import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskResponse } from "../../types";

export interface ViewTaskState {
  tasks?: TaskResponse[];
}

const initialState: ViewTaskState = {};

export const ViewTasks = createSlice({
  name: "counter",
  initialState,
  reducers: {
    updateTasks: (state, action: PayloadAction<TaskResponse[]>) => {
      state.tasks = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateTasks } = ViewTasks.actions;
export default ViewTasks.reducer;
