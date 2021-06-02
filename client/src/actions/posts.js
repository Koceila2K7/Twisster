import * as API from '../api/index'
import { CREATE, FETCH_ALL, TOOGLEFREINDONLY } from '../constants/actionstype'
export const fetch_post = (queryFilter) => async (dispatch) => {
    try {
        const { data } = await API.fetchPosts(queryFilter)

        dispatch({ type: FETCH_ALL, payload: data });

    } catch (error) {
        console.log(error)
    }
}


export const add_post = (post) => async (dispatch) => {
    try {
        const { data } = await API.createPost(post);
        console.log(data)

        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.error(error)
    }
}

export const toogle_freind_only = (queryFilter) => async (dispatch) => {
    try {
        console.log('toogle')
        const { data } = await API.fetchPosts({  freindOnly: !queryFilter.freindOnly, offset: 0 })
        console.table(data)
        dispatch({ type: TOOGLEFREINDONLY, payload: data });

    } catch (error) {
        console.log(error)
    }
}