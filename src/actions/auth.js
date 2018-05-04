import { authConstants } from "./actions.constants";

const saveUserData = (idToken, userId) => ({ type: authConstants.SAVE_USER_DATA, idToken, userId });
const clearUserData = () => ({ type: authConstants.CLEAR_USER_DATA, idToken: null, userId: null });

export const authActions = {
  saveUserData,
  clearUserData
};