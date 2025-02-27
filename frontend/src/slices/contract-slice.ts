import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TContract } from "@/types/contract";

interface RequestState {
  contract: TContract | null;
  changes: Partial<TContract>;
  isCompleted: { [key: number]: boolean };
  isEnabled: { [key: number]: boolean };
  activeStep: number;
}

const initialState: RequestState = {
  contract: null,
  changes: {},
  isCompleted: {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  },
  isEnabled: {
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
  },
  activeStep: 1,
};

const contractSlice = createSlice({
  name: "contract",
  initialState,
  reducers: {
    setContract(state, action: PayloadAction<TContract>) {
      state.contract = {
        ...state.contract,
        ...action.payload
      }
      state.isCompleted = {
        1: !!state.contract?.terms_signature,
        2: !!state.contract?.declaration_value_signature,
        3: !!state.contract?.start_time_signature && !!state.contract?.end_time_signature,
        4: !!state.contract?.payment_signature,
        5: !!state.contract?.final_signature && !!state.contract?.foreman_signature,
      }
      state.activeStep = Object.keys(state.isCompleted).findIndex((key) => !state.isCompleted[parseInt(key)]) + 1;

      const requiredSignatures: { [key: number]: Array<keyof TContract> } = {
        1: ["terms_signature"],
        2: ["declaration_value_signature"],
        3: ["start_time_signature", "end_time_signature"],
        4: ["payment_signature"],
        5: ["final_signature", "foreman_signature"],
      };

      const signatures = state.contract;

      const isStepEnabled = (step: number): boolean => {
        const prevStep = step - 1;
        if (prevStep === 0) return true; // First step is always enabled
        const prevRequiredSignatures = requiredSignatures[prevStep];
        return prevRequiredSignatures.every((sig) => !!signatures[sig]);
      };
      state.isEnabled = Object.keys(requiredSignatures).reduce((acc, step) => {
        acc[parseInt(step)] = isStepEnabled(parseInt(step));
        return acc;
      }, {} as Record<number, boolean>);
    },
    updateContractField: (state, action: PayloadAction<Partial<TContract>>) => {
      state.changes = {
        ...state.changes,
        ...action.payload
      }
    },
    resetChanges(state) {
      state.changes = {};
    },
    setActiveStep(state, action: PayloadAction<number>) {
      state.activeStep = action.payload;
    }
  },
});

export default contractSlice.reducer;
export const { setContract, setActiveStep, updateContractField, resetChanges } = contractSlice.actions;


