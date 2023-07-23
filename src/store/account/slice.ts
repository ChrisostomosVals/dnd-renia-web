import { ActionReducerMapBuilder, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AccountState } from "./types";
import TokenModel from "../../dist/models/TokenModel";
import { login } from "./thunks";
import UserModel from "../../dist/models/UserModel";

const initialState: AccountState = {
    authenticated: false
}

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers:{
        setToken: (state, { payload }: PayloadAction<TokenModel>) => {
            state.token = payload;
            state.authenticated = true;
        },
        destroyProfile: (state) => {
            state.user = undefined;
            state.token = undefined;
            state.authenticated = false;
        },
        toggleAuthentication: (state,  { payload }: PayloadAction<boolean>) =>{
            state.authenticated = payload;
        },
        setProfile: (state) => {
            const token = localStorage.getItem('token');
            const profile = localStorage.getItem('profile');
            if(profile){
                state.user = JSON.parse(profile) as UserModel;
            }
            else{
                state.user = undefined;
            }
            if(token){
                state.token = JSON.parse(token) as TokenModel;
            }
            else{
                state.token = undefined;
            }
        }
    },
    extraReducers: (builder: ActionReducerMapBuilder<AccountState>) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.profile;
                state.token = action.payload.token;
                state.authenticated = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.user = undefined;
                state.token = undefined;
                state.authenticated = false;
            })
    }
});