const initialState = {
    loggedIn: false,
    email: "frodo.beutlin@hobbits.com",
    firstname: "Frodo",
    lastname: "Beutlin",
    splashDialogWasOpen: false,
    uiLanguage: "en-US"
}

/**
 * Redux store actions.
 * @param {object} state current redux state (initialState).
 * @param {object} action the action state for use
 * @returns {object} redux state changes.
*/
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return {
                ...state,
                loggedIn: true,
                email: action.email,
                firstname: action.firstname,
                lastname: action.lastname
            }
        case 'SIGN_OUT': 
            return {
                ...state,
                loggedIn: false
            }
        case 'OPENED_SPLASH':
            return {
                ...state,
                splashDialogWasOpen: action.opened
            }
        case 'SET_UI_LANGUAGE':
            return {
                ...state,
                uiLanguage: action.language
            }
        default:
            return state
    }
}

export default reducer;