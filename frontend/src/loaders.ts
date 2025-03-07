import { redirect } from "react-router";
import Cookies from "js-cookie";
import { store } from "@/store";
import { authApi } from "@/services/auth-api";
import { settingsApi } from "./services/settings-api";
import { servicesApi } from "@/services/services-api";
import { ratesApi } from "@/services/rates-api";
import { calendarRatesApi } from "@/services/calendar-rates-api";
import { trucksApi } from "@/services/trucks-api";
import { packingsApi } from "@/services/packings-api";
import { extraServicesApi } from "@/services/extra-services-api";


export const settingsLoader = async () => {
  store.dispatch(
    settingsApi.util.prefetch("getSettings", undefined, { force: true })
  )
  const { user } = store.getState().auth;
  const sessionId = Cookies.get("session_id");

  if (sessionId || user) {
    return redirect("/");
  }
  return null;
}


export const verifyAuthLoader = async () => {

  store.dispatch(
    settingsApi.util.prefetch("getSettings", undefined, { force: true })
  )

  const sessionId = Cookies.get("session_id");

  if (!sessionId) {
    return redirect("/auth/login");
  }

  const result = await store.dispatch(
    authApi.endpoints.verify.initiate()
  )

  if (result.error) {
    Cookies.remove("session_id")
    return redirect('/auth/login');
  }

  if (result.data) {
    fetchAdditionalData();
  }

  return null;
};

async function fetchAdditionalData() {

  await new Promise((resolve) => setTimeout(resolve, 2000));

  store.dispatch(
    servicesApi.endpoints.getServices.initiate()
  ).unwrap();
  store.dispatch(
    ratesApi.endpoints.getRates.initiate()
  ).unwrap();
  store.dispatch(
    calendarRatesApi.endpoints.getCalendarRates.initiate()
  ).unwrap();
  store.dispatch(
    trucksApi.endpoints.getTrucks.initiate()
  ).unwrap();
  store.dispatch(
    packingsApi.endpoints.getPackings.initiate()
  ).unwrap();
  store.dispatch(
    extraServicesApi.endpoints.getExtraServices.initiate()
  )
}

