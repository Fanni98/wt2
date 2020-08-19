let defaultStore = {
    data: null
}
export default (state = defaultStore, action) => {
    switch (action.type) {
        case 'LOGIN_USER': {
            console.log('action',action)
            return { ... state, data: action.payload}
        }
        case 'SET_DEFAULT_USER_DATA': {
            return {... state, data: null}
        }
        default: return {...state}
    }
}