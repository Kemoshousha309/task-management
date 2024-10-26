import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserModel {
    displayName: string | null,
    email: string | null,
    uid: string
}

export interface AuthState {
    loading: boolean,
    user: UserModel | null;
}

const initialState: AuthState = {
    loading: true,
    user: null
};

export const Auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateAuth: (state, action: PayloadAction<UserModel | null>) => {
        state.loading = false;
        state.user = action.payload;
    }
  },
});


// Action creators are generated for each case reducer function
export const { updateAuth } = Auth.actions;
export default Auth.reducer;
