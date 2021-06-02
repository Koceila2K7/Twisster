import { FETCH_CONVERSATIONS } from '../constants/actionstype';
const reducer = (conversations = [], action) => {
    switch (action.type) {
        case FETCH_CONVERSATIONS:
            return action.payload;
        default:
            return conversations;
    }
}
export default reducer;