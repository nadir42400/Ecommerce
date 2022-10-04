import React from "react";
import { Link } from "react-router-dom";

export default function Categories() {
    const categories = [
        {
            id: 1,
            title: "Carte mère",
            image: "https://static.fnac-static.com/multimedia/Images/FD/Comete/126354/CCP_IMG_ORIGINAL/1649331.jpg",
            cat: "Carte mère",
        },
        {
            id: 2,
            title: "Carte Graphique",
            image: "https://images.frandroid.com/wp-content/uploads/2020/10/nvidia-geforce-rtx-3070-test-1-scaled.jpg",
            cat: "Carte graphique",
        },
        {
            id: 3,
            title: "Processeur",
            image: "https://www.rue-montgallet.com/actualites/wp-content/uploads/2022/01/Sans-titre-1.jpg",
            cat: "Processeur",
        },
        {
            id: 4,
            title: "Boîtier",
            image: "https://tt-hardware.com/wp-content/uploads/2021/02/boitier-pc-ferme-ou-ouvert.jpg",
            cat: "Boîtier",
        },
    ];

    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 px-12 sm:px-0 mb-5">
            {categories.map((category) => (
                <div key={category.id} className="relative">
                    <Link to={`/products/${category.cat}`}>
                        <img
                            className="w-full sm:h-full object-cover"
                            src={category.image}
                            alt={category.title}
                        />
                        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
                            <h1 className="text-white bg-black bg-opacity-50 rounded-md p-2 mb-5 text-2xl">
                                {category.title}
                            </h1>
                            <button className=" border-none p-3 bg-blue-500 text-gray-50 cursor-pointer font-semibold">
                                Voir les produits
                            </button>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}
