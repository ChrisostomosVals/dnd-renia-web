import { configureStore } from '@reduxjs/toolkit';
import { accountSlice } from './account/slice';
import { settingsSlice } from './settings/slice';
import { worldSlice } from './world/slice';

export const store = configureStore({
  reducer: {
    account: accountSlice.reducer,
    settings: settingsSlice.reducer,
    world: worldSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;