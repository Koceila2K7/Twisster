import { combineReducers } from "redux";
import posts from "./posts";
import curent_Id from "./curentId";
import auth from './auth'
import conversations from './conversations';
import selected_user from './selected_user';
import maped_message from './messsages_map';
import socket_ref from './socket_ref';
import users from './user';
export default combineReducers({
    posts,
    curent_Id,
    auth,
    conversations,
    selected_user,
    maped_message,
    socket_ref,
    users
});