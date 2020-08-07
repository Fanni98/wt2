export function AddTodo(payload = {}) {
    return {
        type: 'ADD_TODO',
        payload
    }
}