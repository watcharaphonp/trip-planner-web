import { createSlice } from '@reduxjs/toolkit';
import { userStore } from "./store"

interface userInfoProps {
    userId: string;
    loggedIn: boolean
}

interface actionProps {
    payload: userInfoProps
}

const initialState = {
    info: {
        userId: '',
        loggedIn: false
    }
  }

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: actionProps) => {
            state.info = action.payload;
        },
        logout: state => initialState,
    },
});

export const { login, logout } = userSlice.actions;

export const userInfoState = (state: ReturnType<typeof userStore.getState>) => state;

export default userSlice.reducer;