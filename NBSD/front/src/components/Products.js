import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiShoppingCartLine } from "react-icons/ri";
import { publicRequest } from "../requestMethods";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getTotals } from "../redux/cartRedux";

export default function Products({ cat, sort }) {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

    const handleClick = (product) => {
        dispatch(addToCart(product));
    };

    useEffect(() => {
        dispatch(getTotals());
    }, [cart, dispatch]);

    useEffect(() => {
        const getProducts = async () => {
            const res = await publicRequest.get(
                cat ? `/products?category=${cat}` : "/products"
            );
            setProducts(res.data);
            console.log(res.data);
        };
        getProducts();
    }, [cat]);

    useEffect(() => {
        if (sort === "newest") {
            setProducts((prev) =>
                [...prev].sort((a, b) => a.createdAt - b.createdAt)
            );
        } else if (sort === "asc") {
            setProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
        } else {
            setProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
        }
        // console.log(sort);
    }, [sort]);

    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 px-12 sm:px-0 mb-5">
            {products.map((product) => (
                <div
                    key={product._id}
                    className="shadow-md bg-white shadow-gray-800 rounded-lg"
                >
                    <Link to={`/product/${product._id}`}>
                        <img
                            src={product.image}
                            alt="shop-item"
                            className="rounded-md p-4 hover:scale-105 duration-200"
                        />
                    </Link>
                    <div className="px-5 pb-5 space-y-4">
                        <Link to={`/product/${product._id}`}>
                            <h5 className="text-xl font-medium tracking-tight">
                                {product.full_name}
                            </h5>
                        </Link>
                        <div className="flex justify-between items-center">
                            <span className="pr-2 text-3xl font-semibold flex-wrap grow">
                                {product.price} €
                            </span>
                            <button
                                onClick={() => handleClick(product)}
                                className="font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-800 text-sm p-2 text-center duration-200 hover:scale-105"
                            >
                                <RiShoppingCartLine size={25} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
