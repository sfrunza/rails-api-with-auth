import { redirect } from "react-router";
import Cookies from "js-cookie";
import { store } from "@/store";
// import { settingsApi } from "@/services/settings-api";
import { authApi } from "@/services/auth-api";
import { setUser } from "@/slices/auth-slice";
// import { servicesApi } from "@/services/services-api";
// import { ratesApi } from "@/services/rates-api";
// import { calendarRatesApi } from "@/services/calendar-rates-api";
// import { trucksApi } from "@/services/trucks-api";
// import { packingsApi } from "@/services/packings-api";
// import { extraServicesApi } from "@/services/extra-services-api";


export const settingsLoader = async () => {
  // store.dispatch(
  //   settingsApi.util.prefetch("getSettings", undefined, { force: true })
  // )
  const { user } = store.getState().auth;
  const sessionId = Cookies.get("session_id");

  if (sessionId || user) {
    return redirect("/");
  }
  return null;
}


export const verifyAuthLoader = async () => {

  // store.dispatch(
  //   settingsApi.util.prefetch("getSettings", undefined, { force: true })
  // )

  const sessionId = Cookies.get("session_id");

  if (!sessionId) {
    return redirect("/auth/login");
  }

  const result = await store.dispatch(
    authApi.endpoints.verify.initiate()
  ).unwrap();

  if (result.error) {
    store.dispatch(setUser(null));
    return redirect('/auth/login');
  }

  // if (result.user) {
  //   store.dispatch(setUser(result.user));
  //   fetchAdditionalData();
  // }

  return null;
};

// async function fetchAdditionalData() {
//   try {
//     await Promise.race([
//       store.dispatch(
//         servicesApi.endpoints.getServices.initiate({})
//       ).unwrap(),
//       store.dispatch(
//         ratesApi.endpoints.getRates.initiate({})
//       ).unwrap(),
//       store.dispatch(
//         calendarRatesApi.endpoints.getCalendarRates.initiate({})
//       ).unwrap(),
//       store.dispatch(
//         trucksApi.endpoints.getTrucks.initiate({})
//       ).unwrap(),
//       store.dispatch(
//         packingsApi.endpoints.getPackings.initiate({})
//       ).unwrap(),
//       store.dispatch(
//         extraServicesApi.endpoints.getExtraServices.initiate({})
//       )
//     ]);

//   } catch (error) {
//     console.error("Failed to fetch additional data", error);
//   }
// }

