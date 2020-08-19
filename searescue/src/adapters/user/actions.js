export function LoginUser(payload = {}) {
    return {
        type: 'LOGIN_USER',
        payload
    }
}
export function SetDefaultUserData() {
    return {
        type: 'SET_DEFAULT_USER_DATA',
    }
}