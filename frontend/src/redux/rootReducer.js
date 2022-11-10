const initialState = {
    loading: false,
    cartItems: []
}

export const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case "UPDATE_CART":
        return {
            ...state,
            cartItems: [...state.cartItems, action.payload]
        };
        default: return state;
    }
}

// 1:56:53