export function LoginUser(payload = {}) {
    return {
        type: 'LOGIN_USER',
        payload
    }
}