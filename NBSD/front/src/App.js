import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
/* Admin */
import HomeAdmin from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductListAdmin from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/nowProduct/NewProduct";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:category" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/success" element={<Success />} />
            <Route
                path="/admin"
                element={
                    <ProtectedRoute isAdmin={true}>
                        <HomeAdmin />
                    </ProtectedRoute>
                }
            />
            <Route path="/admin/users" element={<UserList />} />
            <Route path="/admin/user/:id" element={<User />} />
            <Route path="/admin/newUser" element={<NewUser />} />
            <Route path="/admin/products" element={<ProductListAdmin />} />
            <Route path="/admin/product/:id" element={<Product />} />
            <Route path="/admin/newProduct" element={<NewProduct />} />
        </Routes>
    );
}
