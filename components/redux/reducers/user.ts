const initialState: any = {
    currentUser: null
}

export default function user(state = initialState, action: any) {
    return {
        ...state,
        currentUser: action.currentUser
    }
}