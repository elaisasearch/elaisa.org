/**
 * Checks if the user is logged in from last session.
 * Checks the local storage state from the browser window.
 * @param {Store} store `The Redux Store`
 */
export default function getUserLoginState(store) {
    // Get user loggedIn state from localStorage
    try {
        const userLocalStorage = JSON.parse(localStorage.getItem('user'));
        const { loggedIn, email, firstname, lastname } = userLocalStorage;
        if (loggedIn) {
            store.dispatch({ type: 'SIGN_IN', email: email, firstname: firstname, lastname: lastname });
        }
    } catch (error) {
        // store the default state to localStorage if 'user' is undefined in localStorage
        localStorage.setItem('user', JSON.stringify({
            loggedIn: false,
            email: "frodo.beutlin@hobbits.com",
            firstname: "Frodo",
            lastname: "Beutlin",
        }));
    }
}