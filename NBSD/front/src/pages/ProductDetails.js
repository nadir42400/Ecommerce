import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { publicRequest } from "../requestMethods";
/* BreadCrumbs & MUI */
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
/* React Icons */
// import { FaComment, FaFacebookF, FaHeart, FaTwitter } from "react-icons/fa";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddIcon from "@mui/icons-material/Add";
/* Components */
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
/* Redux */
import { addProductToCart, getTotals } from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";

export default function ProductDetails() {
    const { id } = useParams();

    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);

    const [product, setProduct] = useState([]);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        dispatch(getTotals());
    }, [cart, dispatch]);

    useEffect(() => {
        const getProduct = async () => {
            const res = await publicRequest.get(`/products/find/${id}`);
            setProduct(res.data);
            console.log(res.data);
        };
        getProduct();
    }, [id]);

    const stock = product.stock;

    const handleQuantity = (type) => {
        if (type === "dec") {
            quantity > 1 && setQuantity(quantity - 1);
        } else {
            setQuantity(quantity + 1);
        }
    };

    const handleClick = (product, quantity) => {
        dispatch(addProductToCart({ ...product, quantity }));
    };

    return (
        <div>
            <Navbar />
            <div className="Wrapper p-3 lg:p-12 flex flex-col lg:flex-row lg:items-center">
                <div className="ImgContainer grow">
                    <Breadcrumbs
                        aria-label="breadcrumb"
                        className="p-5 flex flex-col"
                    >
                        <Link underline="hover" color="inherit" href="/">
                            <HomeIcon />
                        </Link>
                        {product.categories?.map((cat) => (
                            <Link
                                underline="hover"
                                color="inherit"
                                href={`/products/${cat}`}
                                key={cat}
                            >
                                {cat}
                            </Link>
                        ))}
                        <Typography variant="h7" color="textPrimary">
                            {product.full_name}
                        </Typography>
                    </Breadcrumbs>
                    <img
                        className="w-full h-[40vh] sm:h-[90vh] object-cover"
                        src={product.image}
                        alt="product"
                    />
                </div>
                <div className="InfoContainer grow h-max p-3 sm:px-12">
                    <h1 className="text-3xl font-extralight">
                        {product.full_name}
                    </h1>
                    <p className="my-5 mx-0">{product.details}</p>
                    <div className="flex items-center justify-between space-x-8 my-8">
                        <span className="text-2xl font-thin whitespace-nowrap">
                            {product.price} €
                        </span>
                        {stock > 0 ? (
                            <span className="text-xl text-green-500">
                                En Stock : {stock}
                            </span>
                        ) : (
                            <span className="text-xl text-red-500">
                                En rupture de stock
                            </span>
                        )}
                    </div>

                    <div className="AddContainer flex items-center justify-between space-x-8">
                        <div className="AmountContainer flex items-center font-bold">
                            <RemoveOutlinedIcon
                                className="cursor-pointer"
                                onClick={() => handleQuantity("dec")}
                            />
                            <span className="Amount w-8 h-8 rounded-xl border border-blue-600 flex items-center justify-center my-0 mx-1">
                                {quantity}
                            </span>
                            <AddIcon
                                className="cursor-pointer"
                                onClick={() => handleQuantity("inc")}
                            />
                        </div>
                        <button
                            className="p-4 border-2 border-solid border-blue-600 cursor-pointer font-medium hover:border-blue-800 hover:bg-gray-50"
                            type="button"
                            disabled={stock === 0}
                            onClick={() => handleClick(product, quantity)}
                        >
                            Ajouter au panier
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
