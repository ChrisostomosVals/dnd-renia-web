import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SettingsState } from "./types";
import { ColorVariantType } from "../../theme/color";

const initialState: SettingsState = {
    preferences: {
        themeMode: 'dark'
    },
    url: 'http://localhost:4001/gateway'
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers:{
       changeTheme: (state, { payload }: PayloadAction<ColorVariantType>)=>{
            state.preferences.themeMode = payload;
            localStorage.setItem('themeMode', payload);
       }
    }
})