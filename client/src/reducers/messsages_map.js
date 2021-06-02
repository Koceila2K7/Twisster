import { UPDATE_MAPED_MESSAGE } from "../constants/actionstype";
const reducer = (maped = new Map(), action) => {
    switch (action.type) {
        case UPDATE_MAPED_MESSAGE:
            let newc = action.payload.messsages.map(item => ({
                ...item, user: item.users.filter(i => i != action.payload.username)[0]
            }))
            let newMessages = new Map();
            for (let item of newc) {
                newMessages.set(item.user, item);
            }

            return newMessages;
        default:
            return maped;
    }
}

export default reducer
