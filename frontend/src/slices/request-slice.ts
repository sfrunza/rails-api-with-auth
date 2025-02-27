import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TFullRequest } from "@/types/request";

interface RequestState {
  request: TFullRequest | null;
  changes: Partial<TFullRequest>,
  hasChanges: boolean,
  parklotRequests: TFullRequest[] | null
}

const initialState: RequestState = {
  request: null,
  changes: {},
  hasChanges: false,
  parklotRequests: null
};

const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    setRequest(state, action: PayloadAction<TFullRequest>) {
      state.request = {
        ...state.request,
        ...action.payload
      }
    },
    updateField: (state, action: PayloadAction<Partial<TFullRequest>>) => {
      state.changes = {
        ...state.changes,
        ...action.payload
      }
      state.hasChanges = !!Object.keys(state.changes).length
    },
    resetChanges(state) {
      state.changes = {};
      state.hasChanges = false;
    },
    setParklotRequests: (state, action: PayloadAction<TFullRequest[] | null>) => {
      state.parklotRequests = action.payload
    },
  },
});

export default requestSlice.reducer;
export const { setRequest, updateField, resetChanges } = requestSlice.actions;


