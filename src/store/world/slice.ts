import { ActionReducerMapBuilder, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { WorldState } from "./types";
import CharacterModel from "../../dist/models/CharacterModel";
import { fetchCharacters, fetchRacesAndClasses } from "./thunks";

const initialState: WorldState = {
    characters: [],
    locations: [],
    worldObjects: [],
    races: [],
    classes: [],
}

export const worldSlice = createSlice({
    name: 'world',
    initialState,
    reducers:{
        updateCharacter:(state, { payload } :PayloadAction<CharacterModel>) =>{
            const characterIndex = state.characters.findIndex(
                (character) => character.id === payload.id
              );
              if (characterIndex !== -1) {
                state.characters[characterIndex] = {
                  ...state.characters[characterIndex],
                  ...payload,
                };
              }
        }
    },
    extraReducers: (builder: ActionReducerMapBuilder<WorldState>) => {
        builder
            .addCase(fetchCharacters.fulfilled, (state, action) => {
                state.characters = action.payload;
            })
            .addCase(fetchCharacters.rejected, (state, action) => {
                if(action.payload?.error === 'Unauthorised'){
                    console.log(action.payload?.error)
                }
            })
            .addCase(fetchRacesAndClasses.fulfilled, (state, action) => {
                state.races = action.payload.races;
                state.classes = action.payload.classes;
            })
            .addCase(fetchRacesAndClasses.rejected, (state, action) => {
                console.log(action)
            })
    }
})