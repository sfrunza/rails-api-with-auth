import { TFullRequest } from "@/types/request";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RequestState {
  selectedDate: string
  selectedRequest: Partial<TFullRequest> | null
  open: boolean;
  parklotRequests: TFullRequest[] | null
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
    setSelectedRequest: (state, action: PayloadAction<Partial<TFullRequest> | null>) => {
      state.selectedRequest = action.payload
    },
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload
    },
    setParklotRequests: (state, action: PayloadAction<TFullRequest[] | null>) => {
      state.parklotRequests = action.payload
    },
    updateParklotRequest: (state, action: PayloadAction<Partial<TFullRequest>>) => {
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


