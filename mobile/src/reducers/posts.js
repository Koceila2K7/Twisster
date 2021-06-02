import { LIMIT_POSTS_REQUEST } from "../constants/index";
import { CREATE, FETCH_ALL, TOOGLEFREINDONLY } from "../constants/actionstype"
const reducer = (posts = { limit: LIMIT_POSTS_REQUEST, offset: 0, freindOnly: false, posts: [] }, action) => {
    switch (action.type) {
        case FETCH_ALL:
            let newState = {
                limit: LIMIT_POSTS_REQUEST,
                offset: posts.offset + LIMIT_POSTS_REQUEST,
                freindOnly: posts.freindOnly,
                posts: [...posts.posts, ...action.payload]
            }
            return newState;
        case CREATE: {

            return {
                limit: LIMIT_POSTS_REQUEST,
                offset: posts.offset,
                freindOnly: posts.freindOnly,
                posts: [action.payload, ...posts.posts]
            };
        }
        case TOOGLEFREINDONLY: {

            return {
                limit: LIMIT_POSTS_REQUEST,
                offset: LIMIT_POSTS_REQUEST,
                freindOnly: !posts.freindOnly,
                posts: [...action.payload]

            }
        }
        case 'UPDATE_POST':
            return posts.map(p => (p._id === action.payload._id) ? action.payload : p);
        case 'DELETE_POST':
            return {
                ...posts,
                posts: posts.posts.filter(p => p._id != action.payload)
            }
            return posts.filter(p => !(p._id === action.payload));
        case 'LIKE_POST':
            return posts.map(p => (p._id === action.payload._id) ? action.payload : p);
        case 'COMMENT_POST':
            return posts.map(p => (p._id === action.payload._id) ? action.payload : p);
        default:
            return posts;
    }
}
export default reducer;