import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskResponse } from "../../types";
import { Filters } from "../../Components/FilterForm";

export type ViewType =  "list" | "kanban";
export interface ViewTaskState {
  tasks?: TaskResponse[];
  filteredTasks?: TaskResponse[];
  currentView: ViewType
}

const initialState: ViewTaskState = {
  currentView: "list"
};

export const ViewTasks = createSlice({
  name: "viewTasks",
  initialState,
  reducers: {
    updateTasks: (state, action: PayloadAction<TaskResponse[]>) => {
      state.tasks = action.payload;
      state.filteredTasks = action.payload;
    },
    filterTasks: (state, action: PayloadAction<Filters>) => {
      const filtered = state.tasks?.filter((task) => {
        const { name, priority, state } = action.payload;

        const matchesName = task.title
          .toLowerCase()
          .includes(name.toLowerCase());
        const matchesPriority = priority ? task.priority === priority : true;
        const matchesState = state ? task.state === state : true;

        return matchesName && matchesPriority && matchesState;
      });
      state.filteredTasks = filtered;
    },
    switchView: (state, action: PayloadAction<ViewType>) => {
      state.currentView = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { updateTasks, filterTasks, switchView } = ViewTasks.actions;
export default ViewTasks.reducer;
