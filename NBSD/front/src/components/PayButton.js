import React from "react";
import { userRequest } from "../requestMethods";
import { useSelector } from "react-redux";

export default function PayButton({ cartItems }) {
    const { currentUser } = useSelector((state) => state.user);

    const handleCheckout = () => {
        userRequest
            .post("stripe/create-checkout-session", {
                cartItems,
                userId: currentUser._id,
            })
            .then((res) => {
                if (res.data.url) {
                    window.location.href = res.data.url;
                }
            })
            .catch((err) => console.log(err.message));
    };

    return (
        <>
            <button
                onClick={() => handleCheckout()}
                className="uppercase w-full p-3 bg-black text-white font-semibold hover:bg-opacity-80 duration-200"
            >
                paiement
            </button>
        </>
    );
}
