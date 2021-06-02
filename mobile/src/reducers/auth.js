import { AUTH, SIGNUP, LOGOUT } from "../constants/actionstype";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PROFILE_KEY } from "../constants";

const reducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            console.log("AUTH REDUCER")
            return { ...state, authData: action?.data };
        case LOGOUT:
            console.log("logout")
            AsyncStorage.removeItem(PROFILE_KEY)
                .then(e => console.log(e))
                .catch(e => console.error(e));
            return { ...state, authData: null };
        default:
            return state;
    }
}

export default reducer
