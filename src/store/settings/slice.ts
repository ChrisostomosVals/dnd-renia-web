import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SettingsState } from "./types";
import { ColorVariantType } from "../../theme/color";
const hostname = window.location.hostname;
const url = `http://${hostname}:4001/gateway`;
const initialState: SettingsState = {
    preferences: {
        themeMode: 'dark'
    },
    url: url
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