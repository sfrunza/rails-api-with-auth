import { configureStore } from "@reduxjs/toolkit";
import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";

import authReducer from "@/slices/auth-slice";
import contractReducer from "@/slices/contract-slice";
import parklotReducer from "@/slices/parklot-slice";
import requestReducer from "@/slices/request-slice";
import requestsReducer from "@/slices/requests-slice";
import modalReducer from "@/slices/modal-slice";
import { requestsApi } from "@/services/requests-api";
import { authApi } from "@/services/auth-api";
import { servicesApi } from "@/services/services-api";
import { calendarRatesApi } from "@/services/calendar-rates-api";
import { ratesApi } from "@/services/rates-api";
import { trucksApi } from "@/services/trucks-api";
import { packingsApi } from "@/services/packings-api";
import { extraServicesApi } from "@/services/extra-services-api";
import { rtkQueryErrorLogger } from "@/services/base-service";
import { employeesApi } from "@/services/employees-api";
import { settingsApi } from "@/services/settings-api";
import { moveSizesApi } from "@/services/move-sizes-api";
import { entranceTypesApi } from "@/services/entrance-types-api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    contract: contractReducer,
    parklot: parklotReducer,
    request: requestReducer,
    requests: requestsReducer,
    modal: modalReducer,
    [authApi.reducerPath]: authApi.reducer,
    [requestsApi.reducerPath]: requestsApi.reducer,
    [servicesApi.reducerPath]: servicesApi.reducer,
    [calendarRatesApi.reducerPath]: calendarRatesApi.reducer,
    [ratesApi.reducerPath]: ratesApi.reducer,
    [trucksApi.reducerPath]: trucksApi.reducer,
    [packingsApi.reducerPath]: packingsApi.reducer,
    [extraServicesApi.reducerPath]: extraServicesApi.reducer,
    [employeesApi.reducerPath]: employeesApi.reducer,
    [settingsApi.reducerPath]: settingsApi.reducer,
    [moveSizesApi.reducerPath]: moveSizesApi.reducer,
    [entranceTypesApi.reducerPath]: entranceTypesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      rtkQueryErrorLogger,
      authApi.middleware,
      requestsApi.middleware,
      servicesApi.middleware,
      calendarRatesApi.middleware,
      ratesApi.middleware,
      trucksApi.middleware,
      packingsApi.middleware,
      extraServicesApi.middleware,
      employeesApi.middleware,
      settingsApi.middleware,
      moveSizesApi.middleware,
      entranceTypesApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppSelector = typeof store.getState;

export const useAppSelector = useReduxSelector.withTypes<RootState>();

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useReduxDispatch.withTypes<AppDispatch>();
