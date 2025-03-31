import { TRequest } from "@/types/request";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RequestState {
  selectedDate: string
  selectedRequest: Partial<TRequest> | null
  open: boolean;
  parklotRequests: TRequest[] | null
}

const today = new Date();
today.setHours(0, 0, 0, 0);

const initialState: RequestState = {
  selectedDate: new Date().toISOString(),
  selectedRequest: null,
  open: false,
  parklotRequests: null,
};

const parklotSlice = createSlice({
  name: "parklot",
  initialState,
  reducers: {
    setSelectedDate(state, action: PayloadAction<string>) {
      state.selectedDate = action.payload
    },
    setSelectedRequest: (state, action: PayloadAction<Partial<TRequest> | null>) => {
      state.selectedRequest = action.payload
    },
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload
    },
    setParklotRequests: (state, action: PayloadAction<TRequest[] | null>) => {
      state.parklotRequests = action.payload
    },
    updateParklotRequest: (state, action: PayloadAction<Partial<TRequest>>) => {
      state.parklotRequests = state.parklotRequests?.map(request =>
        request.id === action.payload.id ? {
          ...request,
          ...action.payload
        } : request
      ) ?? null;
    },
  },
});

export default parklotSlice.reducer;
export const { setSelectedDate, setSelectedRequest, setOpen, setParklotRequests, updateParklotRequest } = parklotSlice.actions;


