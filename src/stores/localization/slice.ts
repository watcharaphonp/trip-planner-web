import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import i18n from "../../app/i18n";

interface localizationProps {
  language: string;
}

interface actionProps {
  payload: localizationProps;
}

const initialState: localizationProps = {
  language: "en",
};

export const localizationSlice = createSlice({
  name: "localization",
  initialState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
      i18n.changeLanguage(action.payload);
    },
  },
});

export const { changeLanguage } = localizationSlice.actions;
export default localizationSlice.reducer;
