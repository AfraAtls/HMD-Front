import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import { postDrug } from './drugMiddleware';

export interface drugState {
  date: string;
  name: string;
  quantity: string;
  infos: string;
}

export interface dataDrugApi {
  id: number;
  drugName: string;
  quantity: number;
  date: string;
}

const initialState: drugState = {
  date: 'Wed, 15 Jul 1998 22:00:00 GMT',
  name: '',
  quantity: '',
  infos: '',
};

export const drugSlice = createSlice({
  name: 'drug',
  initialState,
  reducers: {
    setDate: (state, action: PayloadAction<string>) => {
      return { ...state, date: action.payload };
    },
    setName: (state, action: PayloadAction<string>) => {
      return { ...state, name: action.payload };
    },
    setQuantity: (state, action: PayloadAction<string>) => {
      return { ...state, quantity: action.payload };
    },
    setInfos: (state, action: PayloadAction<string>) => {
      return { ...state, infos: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postDrug.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(postDrug.rejected, () => {
        console.error('nonsfghsrthsrthsrthsrths');
        // en cas d'erreur
      });
  },
});

export const { setDate, setName, setQuantity, setInfos } = drugSlice.actions;

export const selectDate = (state: RootState) => state.drug.date;
export const selectName = (state: RootState) => state.drug.name;
export const selectQuantity = (state: RootState) => state.drug.quantity;
export const selectInfos = (state: RootState) => state.drug.infos;

export default drugSlice.reducer;