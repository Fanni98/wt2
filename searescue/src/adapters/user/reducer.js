let defaultStore = {
    data: null
}
export default (state = defaultStore, action) => {
    switch (action.type) {
        case 'LOGIN_USER': {
            console.log('action',action)
            return { ... state, data: action.payload}
        }
        default: return {...state}
    }
}