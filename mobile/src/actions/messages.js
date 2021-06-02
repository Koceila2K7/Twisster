import * as api from '../api/index';
import { FETCH_CONVERSATIONS } from '../constants/actionstype';
export const fetch_conversations = () =>async (dispatch) => {
    try {
        const { data } = await api.fetchConversations();
        console.log('log1', data)
       
        dispatch({ type: FETCH_CONVERSATIONS, payload: data });
    } catch (error) {
        console.error(error);
    }
}