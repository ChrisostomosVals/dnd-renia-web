import { createAsyncThunk } from "@reduxjs/toolkit";
import CharacterApi from "../../dist/api/CharacterApi";
import RaceApi from "../../dist/api/RaceApi";
import ClassApi from "../../dist/api/ClassApi";
import CharacterModel from "../../dist/models/CharacterModel";

export const fetchCharacters = createAsyncThunk<CharacterModel[], { token: string; url: string; }, { rejectValue: { error: string } }>(
    'characters',
    async ({ token, url }, thunkAPI) => {
        try {
            const response = await CharacterApi.GetAsync(token, url, null);
            if (!response.isError) {
                return thunkAPI.fulfillWithValue(response.data!);
            }
            else {
                console.log(response.error);
                if (response.error?.message === 'Unauthorized access') {
                    return thunkAPI.rejectWithValue({ error: 'Unauthorized' });
                }
                return thunkAPI.rejectWithValue({ error: 'failed to fetch' });
            }
        } catch (error: any) {
            console.log(error);
            return thunkAPI.rejectWithValue({ error: 'Something went wrong' });
        }
    }
)


export const fetchRacesAndClasses = createAsyncThunk(
    'racesAndClasses',
    async ({ token, url }: { token: string; url: string; }, thunkAPI) => {
        try {
            const races = await RaceApi.GetAsync(token, url);
            const classes = await ClassApi.GetAsync(token, url);
            if (!races.isError && !classes.isError) {
                return thunkAPI.fulfillWithValue({ races: races.data!, classes: classes.data! });
            }
            else {
                console.log(races.error, classes.error);
                if (races.error?.message === 'Unauthorized access' || classes.error?.message === 'Unauthorized access') {
                    return thunkAPI.rejectWithValue({ error: 'Unauthorized' });
                }
                return thunkAPI.rejectWithValue({ error: 'failed to fetch' });
            }
        } catch (error: any) {
            console.log(error);
            return thunkAPI.rejectWithValue({ error: 'Something went wrong' });
        }
    }
)