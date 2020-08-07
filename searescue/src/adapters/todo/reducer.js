let defaultStore = {
    data: []
}
export default (state = defaultStore, action) => {
    switch (action.type) {
        case 'ADD_TODO': {
            console.log('action',action, state.data)
            let data = [... state.data]
            data.push(action.payload)
            return { ... state, data}
        }
        default: return {...state}
    }
}