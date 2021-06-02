const reducer = (curent_Id = null, action) => {
    switch (action.type) {
        case 'SET_CURENT_ID':
            return action.payload;
        case 'CLEAR':
            return null;
        default:
            return curent_Id;
    }
}
export default reducer;