import * as api from '../api/index';

import { API_BASE_URL, PROFILE_KEY, } from "../constants/index";
import { AUTH, LOGOUT } from '../constants/actionstype';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const signUp = loginInfo => async (dispatch) => {
    try {
        console.log()
        const { data } = await api.signUp(loginInfo);
        console.log(data)
    } catch (error) {
        console.error(error)
    }
}

export const signIn = loginInfo => async (dispatch) => {
    try {

        const { data } = await api.signIn(loginInfo)
        await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(data))
        console.log(JSON.stringify(data))
        dispatch({ type: AUTH, data })
    } catch (error) {
        console.error(error)
    }
}

export const signOut = () => ({ type: LOGOUT, data: null })