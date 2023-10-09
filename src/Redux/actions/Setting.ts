import { GET_SETTINGS, GET_ALL_FETCH_FAIL } from "../types";

export const settings_r = (settingsData: object) => async (dispatch: any) => {
  if (settingsData) {
    dispatch({
      type: GET_SETTINGS,
      payload: settingsData,
    });
  }
};
