import * as API from '../api/index';
export const get_profile = (id = "") => async (dispatch) => {
    try {
        const { data } = API.getProfil(id);
    } catch (error) {
        console.log(error)
    }
}