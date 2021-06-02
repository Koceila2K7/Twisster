import axios from "axios";
import { API_BASE_URL, PROFILE_KEY } from "../constants/index";
import AsyncStorage from '@react-native-async-storage/async-storage';
const API = axios.create({ baseURL: API_BASE_URL });

API.interceptors.request.use(async (req) => {
    let profile = await AsyncStorage.getItem(PROFILE_KEY);
    if (profile) {
        req.headers.authorization = `BEARER ${JSON.parse(profile).token}`
    }
    return req;
})

export const fetchPosts = ({ limit, freindOnly, offset }) => API.get(`/posts/?limit=${limit}&freindOnly=${freindOnly}&offset=${offset}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const deltePost = id => API.delete(`/posts/${id}`);

export const signIn = logindata => axios.post(API_BASE_URL + "user/signIn", logindata);
export const signUp = signupdata => axios.post(API_BASE_URL + '/user/signup', signupdata);

export const fetchConversations = () => API.get('/messages/conversations/');
export const fetchAllUser = () => API.get('user/');
export const getProfil = (id = "") => API.get("user/profile/" + id);
export const removeFriend = (userToId) => { console.log(userToId); return API.delete("/user/friend/" + userToId) }

export const search = (q, freindOnly) => API.get(`search/?q=${q}&freindOnly=${freindOnly}`) 
