import { SET_SELECTED_USER } from "../constants/actionstype";
const reducer = (selected_user = false, action) => {
    switch (action.type) {
        case SET_SELECTED_USER:
            return action.payload;
        default:
            return selected_user;
    }
}
export default reducer