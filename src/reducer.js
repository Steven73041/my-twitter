export const initialState = {
    user: null,
};

export const actionTypes = {
    SET_USER_TERM: "SET_USER_TERM"
};

const reducer = (state, action) => {

    console.log(action);

    switch (action.type) {
        case actionTypes.SET_USER_TERM:
            return {
                ...state,
                user: action.user
            };

        default:
            return state;
    }
};
export default reducer;