import * as api from '../api/index';

import { API_BASE_URL, PROFILE_KEY, } from "../constants/index";
import { AUTH, LOGOUT } from '../constants/actionstype';

export const signUp = loginInfo => async (dispatch) => {
    try {
        console.log()
        const { data } = await api.signUp(loginInfo);
        console.log(data)
    } catch (error) {
        console.error(error)
    }
}

export const signIn = (loginInfo, callBackConnexion) => async (dispatch) => {
    try {

        const { data } = await api.signIn(loginInfo)
        localStorage.setItem(PROFILE_KEY, JSON.stringify(data))
        console.log(JSON.stringify(data), "----------")
        if (callBackConnexion) {
            callBackConnexion(false, "")
        }
        dispatch({ type: AUTH, data })
    } catch (error) {
        let erreur = true;
        let message = "";
        if (error.response) {

            switch (error.response.status) {
                case 404:
                    message = "ce compte n'existe pas"
                    break;
                case 422:
                    message = "Paramètre manquant";
                    break;
                default:
                    message = "erreur d'inscription";
                    break;
            }
        }

        if (callBackConnexion) {
            callBackConnexion(erreur, message)
        }



    }
}

export const signOut = () => ({ type: LOGOUT, data: null })