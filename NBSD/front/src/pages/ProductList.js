import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
/* BreadCrumbs & MUI */
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";

export default function ProductList() {
    const { category } = useParams();
    const [sort, setSort] = useState("newest");

    return (
        <div className="bg-slate-100">
            <Navbar />
            <div className="container mx-auto px-5 pt-2 min-h-[calc(100vh_-_64px_-_305px)]">
                <div className="mt-8">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" href="/">
                            <HomeIcon />
                        </Link>
                        <Typography variant="h7" color="textPrimary">
                            {category}
                        </Typography>
                    </Breadcrumbs>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold py-8">
                    {category}
                </h1>
                <div className="flex justify-between">
                    <div className="pb-5">
                        <span className="text-xl font-semibold mr-5">
                            Trier les produits par :
                        </span>
                        <select
                            className="bg-white border border-black cursor-pointer p-3 sm:my-3 sm:mx-0 mr-5"
                            onChange={(e) => setSort(e.target.value)}
                        >
                            <option value="newest">Nouveauté</option>
                            <option value="asc">Prix croissant</option>
                            <option value="desc">Prix décroissant</option>
                        </select>
                    </div>
                </div>
                <Products cat={category} sort={sort} />
            </div>
            <Footer />
        </div>
    );
}
