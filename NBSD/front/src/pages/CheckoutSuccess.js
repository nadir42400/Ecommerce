import React from "react";
import { Link } from "react-router-dom";

export default function CheckoutSuccess() {
    return (
        <div className="min-h-[80vh] max-w-[800px] w-full m-auto flex flex-col items-center justify-center">
            <h2 className="mb-2 text-2xl">Paiement effectué</h2>
            <p>Votre commande est en cours.</p>
            <p>
                Pour toute question contacter nous à l'adresse :{" "}
                <strong>nbds@gmail.com</strong>
            </p>
            <Link to="/">
                <button className="bg-black text-white p-3 mt-2">
                    Retourner à l'accueil
                </button>
            </Link>
        </div>
    );
}
