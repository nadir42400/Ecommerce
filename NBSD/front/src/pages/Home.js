import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import Products from "../components/Products";

export default function Home() {
    return (
        <section className="w-full bg-slate-100 text-black">
            <Navbar />
            <Slider />
            <div className="container w-full h-full flex flex-col justify-center items-center mx-auto p-4">
                <Categories />
                <div className="pb-8">
                    <p className="text-3xl font-bold border-b-4 border-gray-500 p-2 inline">
                        Liste des produits
                    </p>
                    <p className="py-6">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Autem voluptatem necessitatibus eius quaerat,
                        perferendis, eaque totam repudiandae facere sint porro
                        doloremque excepturi tempora itaque laudantium
                        accusantium fugit nisi error assumenda inventore labore
                        ea asperiores cupiditate consectetur. Ad nihil, quas,
                        aliquam provident voluptas laboriosam deserunt
                        exercitationem maiores dicta explicabo quis aspernatur?
                    </p>
                </div>
                <Products />
            </div>
            <Footer />
        </section>
    );
}
