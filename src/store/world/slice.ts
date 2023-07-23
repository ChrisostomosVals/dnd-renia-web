import { ActionReducerMapBuilder, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { WorldState } from "./types";
import CharacterModel from "../../dist/models/CharacterModel";
import { createCharacter, fetchCharacters, fetchRacesAndClasses, updateCharacter, updateCharacterFeats, updateCharacterGear, updateCharacterSkills, updateCharacterSpecialAbilities, updateCharacterStats } from "./thunks";
import LocationModel from "../../dist/models/LocationModel";
import WorldObjectModel from "../../dist/models/WorldObjectModel";
import RaceModel from "../../dist/models/RaceModel";
import ClassModel from "../../dist/models/ClassModel";
import { getParsedLocalStorageItem } from "../../utls/methods";

const initialState: WorldState = {
    characters: getParsedLocalStorageItem<CharacterModel[]>('characters') || [],
  locations: getParsedLocalStorageItem<LocationModel[]>('locations') || [],
  worldObjects: getParsedLocalStorageItem<WorldObjectModel[]>('worldObjects') || [],
  races: getParsedLocalStorageItem<RaceModel[]>('races') || [],
  classes: getParsedLocalStorageItem<ClassModel[]>('classes') || [],
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
                localStorage.setItem('characters', JSON.stringify(action.payload));
            })
            .addCase(fetchCharacters.rejected, (state, action) => {
                if(action.payload?.error === 'Unauthorised'){
                    console.log(action.payload?.error)
                }
            })
            .addCase(fetchRacesAndClasses.fulfilled, (state, action) => {
                state.races = action.payload.races;
                state.classes = action.payload.classes;
                localStorage.setItem('races', JSON.stringify(action.payload.races));
                localStorage.setItem('classes', JSON.stringify(action.payload.classes));
            })
            .addCase(fetchRacesAndClasses.rejected, (state, action) => {
                console.log(action)
            })
            .addCase(updateCharacterStats.fulfilled, (state, action) => {
                const characterIndex = state.characters.findIndex(
                    (character) => character.id === action.payload.id
                  );
                  if (characterIndex !== -1) {
                    const updatedCharacter = {
                      ...state.characters[characterIndex],
                      stats: action.payload.stats,
                    };
                    state.characters[characterIndex] = updatedCharacter;
                  }
                localStorage.setItem('characters', JSON.stringify(state.characters));
            })
            .addCase(createCharacter.fulfilled, (state, action) => {
              state.characters = action.payload;
              localStorage.setItem('characters', JSON.stringify(state.characters));
            })
            .addCase(updateCharacter.fulfilled, (state, action) => {
              const characterIndex = state.characters.findIndex(
                (character) => character.id === action.payload.id
              );
              if (characterIndex !== -1) {
                state.characters[characterIndex] = action.payload;
              }
            })
            .addCase(updateCharacterSkills.fulfilled, (state, action) => {
              const characterIndex = state.characters.findIndex(
                (character) => character.id === action.payload.id
              );
              if (characterIndex !== -1) {
                const updatedCharacter = {
                  ...state.characters[characterIndex],
                  skills: action.payload.skills,
                };
                state.characters[characterIndex] = updatedCharacter;
              }
            localStorage.setItem('characters', JSON.stringify(state.characters));
            })
            .addCase(updateCharacterGear.fulfilled,(state, action) => {
              const characterIndex = state.characters.findIndex(
                (character) => character.id === action.payload.id
              );
              if (characterIndex !== -1) {
                const updatedCharacter = {
                  ...state.characters[characterIndex],
                  gear: action.payload.gear,
                };
                state.characters[characterIndex] = updatedCharacter;
              }
            localStorage.setItem('characters', JSON.stringify(state.characters));
            })
            .addCase(updateCharacterFeats.fulfilled,(state, action) => {
              const characterIndex = state.characters.findIndex(
                (character) => character.id === action.payload.id
              );
              if (characterIndex !== -1) {
                const updatedCharacter = {
                  ...state.characters[characterIndex],
                  feats: action.payload.feats,
                };
                state.characters[characterIndex] = updatedCharacter;
              }
            localStorage.setItem('characters', JSON.stringify(state.characters));
            })
            .addCase(updateCharacterSpecialAbilities.fulfilled,(state, action) => {
              const characterIndex = state.characters.findIndex(
                (character) => character.id === action.payload.id
              );
              if (characterIndex !== -1) {
                const updatedCharacter = {
                  ...state.characters[characterIndex],
                  specialAbilities: action.payload.specialAbilities,
                };
                state.characters[characterIndex] = updatedCharacter;
              }
            localStorage.setItem('characters', JSON.stringify(state.characters));
            })
    }
})