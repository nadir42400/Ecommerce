import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
        cartTotalQuantity: 0,
        cartTotalAmount: 0,
    },
    reducers: {
        addProductToCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex(
                (cartItem) => cartItem._id === action.payload._id
            );

            const quantity = action.payload.quantity
                ? action.payload.quantity
                : 1;

            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += quantity;
                toast.info(
                    `(+${quantity}) ${state.cartItems[itemIndex].full_name} ajouté à nouveau au panier`,
                    {
                        position: "bottom-left",
                    }
                );
            } else {
                const tempProduct = {
                    ...action.payload,
                    cartQuantity: quantity,
                };
                state.cartItems.push(tempProduct);
                toast.success(`${action.payload.full_name} ajouté au panier`, {
                    position: "bottom-left",
                });
            }
        },
        addToCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex(
                (cartItem) => cartItem._id === action.payload._id
            );

            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1;
                toast.info(
                    `(+1) ${state.cartItems[itemIndex].full_name} ajouté à nouveau au panier`,
                    {
                        position: "bottom-left",
                    }
                );
            } else {
                const tempProduct = { ...action.payload, cartQuantity: 1 };
                state.cartItems.push(tempProduct);
                toast.success(`${action.payload.full_name} ajouté au panier`, {
                    position: "bottom-left",
                });
            }
        },
        removeFromCart: (state, action) => {
            const nextCartItems = state.cartItems.filter(
                (cartItem) => cartItem._id !== action.payload._id
            );
            state.cartItems = nextCartItems;
            toast.error(`${action.payload.full_name} supprimé du panier`, {
                position: "bottom-left",
            });
        },
        decreaseCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex(
                (cartItem) => cartItem._id === action.payload._id
            );

            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1;
                toast.info(
                    `(-1) ${action.payload.full_name} retiré du panier`,
                    {
                        position: "bottom-left",
                    }
                );
            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
                const nextCartItems = state.cartItems.filter(
                    (cartItem) => cartItem._id !== action.payload._id
                );
                state.cartItems = nextCartItems;
                toast.error(`${action.payload.full_name} supprimé du panier`, {
                    position: "bottom-left",
                });
            }
        },
        getTotals: (state, action) => {
            let { total, quantity } = state.cartItems.reduce(
                (cartTotal, cartItem) => {
                    const { price, cartQuantity } = cartItem;
                    const itemTotal = price * cartQuantity;

                    cartTotal.total += itemTotal;
                    cartTotal.quantity += cartQuantity;

                    return cartTotal;
                },
                {
                    total: 0,
                    quantity: 0,
                }
            );

            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
        },
        clearCart: (state) => {
            state.cartItems = [];
            toast.error("Panier vidé", {
                position: "bottom-left",
            });
        },
    },
});

export const {
    addProductToCart,
    addToCart,
    removeFromCart,
    decreaseCart,
    getTotals,
    clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
