import { SET_SOCKET_REF } from "../constants/actionstype";
const reducer = (selected_user = null, action) => {
    switch (action.type) {
        case SET_SOCKET_REF:
            return action.payload;
        default:
            return selected_user;
    }
}
export default reducer
