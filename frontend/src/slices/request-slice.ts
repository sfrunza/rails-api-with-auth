import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TRequest } from "@/types/request";

interface RequestState {
  request: TRequest | null;
  changes: Partial<TRequest>,
  hasChanges: boolean,
  parklotRequests: TRequest[] | null
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
    setRequest(state, action: PayloadAction<TRequest>) {
      state.request = {
        ...state.request,
        ...action.payload
      }
    },
    updateField: (state, action: PayloadAction<Partial<TRequest>>) => {
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
    setParklotRequests: (state, action: PayloadAction<TRequest[] | null>) => {
      state.parklotRequests = action.payload
    },
  },
});

export default requestSlice.reducer;
export const { setRequest, updateField, resetChanges } = requestSlice.actions;


