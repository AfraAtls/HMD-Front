import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertMessage } from '../../../Interfaces/AlertMessage';
import { SleepResponse } from '../../../Interfaces/API_Interfaces';
import { RootState } from '../../../store/store';
import { deleteSleep, editSleep, postSleep } from './sleepMiddleware';

export interface SleepState {
  id: number | null;
  message: AlertMessage;
  date: string | null;
  quantity: number | '';
  quality: number | '';
}

const initialState: SleepState = {
  id: null,
  message: { severity: 'info', message: '' },
  date: null,
  quantity: '',
  quality: '',
};

export const sleepSlice = createSlice({
  name: 'sleep',
  initialState,
  reducers: {
    setDate: (state, action: PayloadAction<string>) => {
      return { ...state, date: action.payload };
    },
    setQuantity: (state, action: PayloadAction<number>) => {
      return { ...state, quantity: action.payload };
    },
    setQuality: (state, action: PayloadAction<number>) => {
      return { ...state, quality: action.payload };
    },
    setSelectedSleep: (state, action: PayloadAction<SleepResponse>) => {
      return { ...state, ...action.payload, quantity: action.payload.time };
    },
    resetSleepInputs: (state) => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postSleep.fulfilled, (state, action) => {
        const { severity, message } = action.payload as AlertMessage;
        return { ...state, message: { severity, message } };
      })
      .addCase(postSleep.rejected, (state, action) => {
        const { severity, message } = action.payload as AlertMessage;
        return { ...state, message: { severity, message } };
      })
      .addCase(editSleep.fulfilled, (state, action) => {
        const { severity, message } = action.payload as AlertMessage;
        return { ...state, message: { severity, message } };
      })
      .addCase(editSleep.rejected, (state, action) => {
        const { severity, message } = action.payload as AlertMessage;
        return { ...state, message: { severity, message } };
      })
      .addCase(deleteSleep.fulfilled, (state, action) => {
        const { severity, message } = action.payload as AlertMessage;
        return { ...state, message: { severity, message } };
      })
      .addCase(deleteSleep.rejected, (state, action) => {
        const { severity, message } = action.payload as AlertMessage;
        return { ...state, message: { severity, message } };
      });
  },
});

export const { setDate, setQuantity, setQuality, setSelectedSleep, resetSleepInputs } = sleepSlice.actions;

export const selectSleepDate = (state: RootState) => state.sleep.date;
export const selectSleepQuantity = (state: RootState) => state.sleep.quantity;
export const selectSleepQuality = (state: RootState) => state.sleep.quality;
export const selectSleepMessage = (state: RootState) => state.sleep.message;

export default sleepSlice.reducer;
