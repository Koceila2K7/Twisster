import { combineReducers } from "redux";
import posts from "./posts";
import curent_Id from "./curentId";
import auth from './auth'
import conversations from './conversations';
import selected_user from './selected_user';
import maped_message from './messsages_map';
import socket_ref from './socket_ref';
import users from './user';
import profile_to_show from './profile_to_show';

export default combineReducers({
    posts,
    curent_Id,
    auth,
    conversations,
    selected_user,
    maped_message,
    socket_ref,
    users,
    profile_to_show
});