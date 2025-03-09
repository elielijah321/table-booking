import { SystemUser} from '../src/types/SystemUser'

const initialState = {
  user: null as SystemUser | null
};

const SET_USER_INFO = 'SET_USER_INFO';
const CLEAR_USER_INFO = 'CLEAR_USER_INFO';

export const setUserInfo = (user: SystemUser) => ({
  type: SET_USER_INFO,
  payload: user,
});

export const clearUserInfo = () => ({
  type: CLEAR_USER_INFO,
});

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        user: action.payload,
      };
    case CLEAR_USER_INFO:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default userReducer;
