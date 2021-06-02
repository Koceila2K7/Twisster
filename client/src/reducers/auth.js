import { AUTH, SIGNUP, LOGOUT } from "../constants/actionstype";
import { PROFILE_KEY, USER_NAME_KEY } from "../constants";
import jwtDecode from 'jwt-decode';

const reducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem(PROFILE_KEY, JSON.stringify({ ...action?.data }));
            let decodedToken = jwtDecode(action?.data?.token)

            localStorage.setItem(USER_NAME_KEY, decodedToken.id);

            console.log(JSON.stringify(decodedToken))
            return { ...state, authData: action?.data, decodedToken };
        case LOGOUT:
            localStorage.removeItem(PROFILE_KEY);
            localStorage.removeItem(USER_NAME_KEY);
            try {
                action.data.push("/auth");
            } catch (error) {

            }
            return { ...state, authData: null };
        default:
            return state;
    }
}

export default reducer
