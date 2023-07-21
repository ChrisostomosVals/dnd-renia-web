import { createAsyncThunk } from "@reduxjs/toolkit";
import UserApi from "../../dist/api/UserApi";
import TokenModel from "../../dist/models/TokenModel";
import UserModel from "../../dist/models/UserModel";
import ConnectApi from "../../dist/api/ConnectApi";
import ChangePasswordRequestModel from "../../dist/models/ChangePasswordModel";


export const login = createAsyncThunk<{token: TokenModel, profile: UserModel}, { email: string; password: string; url: string; }, { rejectValue: { error: string }}>(
    'login',
    async({ email, password, url}, thunkAPI) => {
        try {
            const response = await ConnectApi.LoginAsync(email, password, url);
            if (response.isError) {
                return thunkAPI.rejectWithValue({error: 'Invalid Email or Password'});
            }
            localStorage.setItem('token', JSON.stringify(response.data));
            const profile = await UserApi.GetProfileAsync(response.data?.access_token!, url);
            if (profile.isError) {
                return thunkAPI.rejectWithValue({error: 'Unauthorized'});
            }
            localStorage.setItem('profile', JSON.stringify(profile.data));
            return thunkAPI.fulfillWithValue({token: response.data!, profile: profile.data!});
        } catch (error: any) {
            console.log(error);
            return thunkAPI.rejectWithValue({error:'Something went wrong'});
        }
    }
)

export const changePassword = createAsyncThunk<boolean, { token: string; url: string; id: string; request: ChangePasswordRequestModel; }, { rejectValue: { error: string }}>(
    'password',
    async({ token, url, id, request}, thunkAPI) => {
        try {
            const response = await UserApi.ChangePasswordAsync(token, url, id, request);
            if (response.isError) {
                return thunkAPI.rejectWithValue({error: 'Could not update password'});
            }
            return thunkAPI.fulfillWithValue(true);
        } catch (error: any) {
            console.log(error);
            return thunkAPI.rejectWithValue({error:'Something went wrong'});
        }
    }
)