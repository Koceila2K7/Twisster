import { ME, SET_PROFILE_TO_SHOW } from "../constants/actionstype";
const reducer = (profile_to_show = ME, action) => {
    switch (action.type) {
        case SET_PROFILE_TO_SHOW:
            return action.payload;
        default:
            return profile_to_show;
    }
}
export default reducer