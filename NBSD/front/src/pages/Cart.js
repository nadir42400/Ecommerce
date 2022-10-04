import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
/* Components */
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
/* Icons */
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { VscTrash } from "react-icons/vsc";
/* Redux */
import { useDispatch, useSelector } from "react-redux";
import {
    addToCart,
    clearCart,
    decreaseCart,
    getTotals,
    removeFromCart,
} from "../redux/cartRedux";
/* Stripe Checkout */
import PayButton from "../components/PayButton";

export default function Cart() {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const { cartItems, cartTotalAmount } = useSelector((state) => state.cart);
    const navigate = useNavigate();

    const [modalOn, setModalOn] = useState(false);

    const clicked = () => {
        setModalOn(true);
    };

    const handleRemoveFromCart = (cartItem) => {
        dispatch(removeFromCart(cartItem));
    };

    const handleDecreaseCart = (cartItem) => {
        dispatch(decreaseCart(cartItem));
    };

    const handleIncreaseCart = (cartItem) => {
        dispatch(addToCart(cartItem));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    useEffect(() => {
        dispatch(getTotals());
    }, [cart, dispatch]);

    return (
        <div className="bg-slate-100">
            <Navbar />
            {cartItems.length ? (
                <div className="lg:container mx-auto">
                    <div className="Wrapper min-h-[calc(100vh_-_64px_-_305px)] p-3 md:p-5">
                        <h1 className="Title text-3xl font-light text-center mb-10">
                            Mon panier
                        </h1>
                        <div className="Bottom flex justify-between flex-col md:flex-row space-x-5">
                            <div className="Info grow-[3]">
                                <button onClick={clicked}>
                                    <VscTrash
                                        size={"1.5em"}
                                        className="hover:text-red-500"
                                    />
                                </button>
                                {modalOn && (
                                    <Modal
                                        setModalOn={setModalOn}
                                        clearCart={handleClearCart}
                                    />
                                )}
                                {cartItems?.map((cartItem, index) => (
                                    <div
                                        key={index}
                                        className="Product flex justify-between flex-col md:flex-row mb-3 mt-3 relative"
                                    >
                                        <button
                                            onClick={() =>
                                                handleRemoveFromCart(cartItem)
                                            }
                                            className="absolute top-0 right-0"
                                        >
                                            <ClearIcon className="hover:text-red-500" />
                                        </button>
                                        <div className="ProducDetail grow-[2] flex">
                                            <Link
                                                to={`/product/${cartItem._id}`}
                                                className=""
                                            >
                                                <img
                                                    className="w-52"
                                                    src={cartItem.image}
                                                    alt="Panier"
                                                />
                                            </Link>
                                            <div className="Details p-5 flex flex-col justify-around">
                                                <Link
                                                    to={`/product/${cartItem._id}`}
                                                >
                                                    <h2 className="ProductName text-xl">
                                                        {cartItem.full_name}
                                                    </h2>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="PriceDetail grow flex md:flex-col items-center justify-between mt-5 md:m-0 md:justify-center">
                                            <div className="ProductAmountContainer flex items-center mb-5">
                                                <RemoveOutlinedIcon
                                                    className="cursor-pointer"
                                                    onClick={() =>
                                                        handleDecreaseCart(
                                                            cartItem
                                                        )
                                                    }
                                                />
                                                <span className="ProductAmount text-xl my-1 mx-4 md:m-1">
                                                    {cartItem.cartQuantity}
                                                </span>
                                                <AddIcon
                                                    className="cursor-pointer"
                                                    onClick={() =>
                                                        handleIncreaseCart(
                                                            cartItem
                                                        )
                                                    }
                                                />
                                            </div>
                                            <span className="text-2xl font-extralight mb-5 md:m-0">
                                                {cartItem.price *
                                                    cartItem.cartQuantity}{" "}
                                                €
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                <hr className="bg-gray-200 border-none h-[1px]" />
                            </div>
                            <div className="Summary grow border-[0.5px] border-gray-200 rounded-lg p-5 h-[25vh]">
                                <h1 className="text-3xl font-extralight">
                                    Montant du panier
                                </h1>
                                <div className="SumarryItem mt-4 mb-2 mx-0 flex justify-between text-xl">
                                    <span>Sous-Total</span>
                                    <span>{cartTotalAmount} €</span>
                                </div>
                                <div className="SumarryItem mb-4 mx-0 max-w-xs flex text-sm text-zinc-500">
                                    <span>
                                        Taxes et frais de livraison calculé à la
                                        prochaine étape de paiement.
                                    </span>
                                </div>
                                <PayButton cartItems={cartItems} />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="container mx-auto min-h-[calc(100vh_-_64px_-_305px)] flex justify-center items-center">
                    <div className="flex flex-col items-center justify-center space-y-8">
                        <h1 className="text-2xl">Votre panier est vide !</h1>
                        <Link
                            to="/"
                            className="p-4 bg-blue-500 font-semibold text-white"
                        >
                            Découvrez nos produits
                        </Link>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
