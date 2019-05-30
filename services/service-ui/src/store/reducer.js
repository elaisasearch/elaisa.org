const initialState = {
    loggedIn: false,
    email: "frodo.beutlin@hobbits.com",
    firstname: "Frodo",
    lastname: "Beutlin"
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return {
                ...state,
                loggedIn: true,
                email: action.email
            }
        default:
            return state
    }
}

export default reducer;