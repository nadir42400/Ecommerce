import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function Success() {
    const location = useLocation();

    console.log(location);

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            Successfull. Your order is being prepared...
            <Link to="/">
                <button className="bg-black text-white p-3">Go to Home</button>
            </Link>
        </div>
    );
}