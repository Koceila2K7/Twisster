import { ADD_USER, REMOVE_USER, SET_USERS } from "../constants/actionstype";

function replacer(key, value) {
    if (value instanceof Map) {
        return {
            dataType: 'Map',
            value: Array.from(value.entries()), // or with spread: value: [...value]
        };
    } else {
        return value;
    }
}

function reviver(key, value) {
    if (typeof value === 'object' && value !== null) {
        if (value.dataType === 'Map') {
            return new Map(value.value);
        }
    }
    return value;
}


const reducer = (users = new Map(), action) => {
    switch (action.type) {
        case SET_USERS:
            let newusers = JSON.parse(action.payload, reviver);
            return newusers;
        case ADD_USER:
            let oldu = JSON.parse(JSON.stringify(users, replacer), reviver);
            let { username, userID } = action.payload;
            if (oldu.get(username)) {
                oldu.get(username).push(userID);
            } else {
                oldu.set(username, [userID]);
            }
            return oldu;
        case REMOVE_USER:
            {
                let { id, username } = action.payload;
                let oldu = JSON.parse(JSON.stringify(users, replacer), reviver);
                if (oldu.get(username)) {
                    let newIds = oldu.get(username).filter(u => u !== id);
                    oldu.set(username, newIds);
                }
                return oldu;
            }
        default:
            return users;
    }
}
export default reducer