import { authConstants } from "../actions/actions.constants";

export function auth(state = {}, action) {
  switch (action.type) {
    case authConstants.SAVE_USER_DATA:
      return {
        idToken: action.idToken,
        userId: action.userId
      }
    case authConstants.CLEAR_USER_DATA:
      return {
        idToken: action.idToken,
        userId: action.userId
      }
    default:
      return state;
  }
}