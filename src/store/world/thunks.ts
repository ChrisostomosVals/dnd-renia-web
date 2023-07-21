import { createAsyncThunk } from "@reduxjs/toolkit";
import CharacterApi from "../../dist/api/CharacterApi";
import RaceApi from "../../dist/api/RaceApi";
import ClassApi from "../../dist/api/ClassApi";
import CharacterModel from "../../dist/models/CharacterModel";
import StatModel from "../../dist/models/StatModel";
import UpdateCharacterDefinitionRequestModel from "../../dist/models/UpdateCharacterDefinitionRequestModel";
import CreateCharacterRequestModel from "../../dist/models/CreateCharacterRequestModel";
import UpdateCharacterRequestModel from "../../dist/models/UpdateCharacterRequestModel";
import SkillModel from "../../dist/models/SkillModel";

export const fetchCharacters = createAsyncThunk<CharacterModel[], { token: string; url: string; }, { rejectValue: { error: string } }>(
    'characters',
    async ({ token, url }, thunkAPI) => {
        try {
            const response = await CharacterApi.GetAsync(token, url, null);
            if (!response.isError) {
                return thunkAPI.fulfillWithValue(response.data!);
            }
            else {
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
export const createCharacter = createAsyncThunk<CharacterModel[], {token: string; url: string; request: CreateCharacterRequestModel;}, { rejectValue: { error: string } }>(
    'createCharacter',
    async({token, url, request}, thunkAPI) => {
        try{
            const response = await CharacterApi.CreateAsync(token, url, request);
            if(response.isError){
                return thunkAPI.rejectWithValue({error: 'failed to create character'});
            }
            const characters = await CharacterApi.GetAsync(token, url, null);
            if(characters.isError){
                return thunkAPI.rejectWithValue({error: 'character created but failed to fetch characters'});
            }
            return thunkAPI.fulfillWithValue(characters.data!);
        }
        catch(error: any){
            console.log(error);
            return thunkAPI.rejectWithValue({ error: 'Something went wrong' });
        }
    }
)
export const updateCharacter = createAsyncThunk<CharacterModel, {token: string; url: string; request: UpdateCharacterRequestModel;}, { rejectValue: { error: string } }>(
    'updateCharacter',
    async({token, url, request}, thunkAPI) => {
        try{
            const response = await CharacterApi.UpdateAsync(token, url, request);
            if(response.isError){
                return thunkAPI.rejectWithValue({error: 'failed to update character'});
            }
            const character = await CharacterApi.GetByIdAsync(token, url, request.id);
            if(character.isError){
                return thunkAPI.rejectWithValue({error: 'character update but failed to update store'});
            }
            return thunkAPI.fulfillWithValue(character.data!);
        }
        catch(error: any){
            console.log(error);
            return thunkAPI.rejectWithValue({ error: 'Something went wrong' });
        }
    }
)
export const updateCharacterStats = createAsyncThunk<{id: string; stats:StatModel[]}, { token: string; url: string; id: string; stats:StatModel[] }, { rejectValue: { error: string } }>(
    'stats',
    async({token, url, stats, id}, thunkAPI) => {
        try{
            const request: UpdateCharacterDefinitionRequestModel<StatModel> = {
                id: id,
                updateDefinition: stats
            }
            const response = await CharacterApi.UpdateStatsAsync(token, url, request);
            if(response.isError){
                return thunkAPI.rejectWithValue({error: 'failed to update'});
            }
            return thunkAPI.fulfillWithValue({id: id, stats: stats});
        }
        catch(error: any){
            console.log(error);
            return thunkAPI.rejectWithValue({ error: 'Something went wrong' });
        }
    }
)

export const updateCharacterSkills = createAsyncThunk<{id: string; skills:SkillModel[]}, { token: string; url: string; id: string; skills:SkillModel[] }, { rejectValue: { error: string } }>(
    'skills',
    async({token, url, skills, id}, thunkAPI) => {
        try{
            const request: UpdateCharacterDefinitionRequestModel<SkillModel> = {
                id: id,
                updateDefinition: skills
            }
            const response = await CharacterApi.UpdateSkillsAsync(token, url, request);
            if(response.isError){
                return thunkAPI.rejectWithValue({error: 'failed to update skills'});
            }
            return thunkAPI.fulfillWithValue({id: id, skills: skills});
        }
        catch(error: any){
            console.log(error);
            return thunkAPI.rejectWithValue({ error: 'Something went wrong' });
        }
    }
)