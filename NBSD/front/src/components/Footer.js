import React from "react";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import RoomIcon from "@mui/icons-material/Room";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

export default function Footer() {
    return (
        <footer className="bg-blue-500 text-white w-full flex flex-row justify-center">
            <div className="flex flex-col sm:flex-row container">
                <div className="grow flex flex-col p-5">
                    <h1 className="text-4xl font-bold">NBDS</h1>
                    <p className="my-5 max-w-sm mx-auto">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ipsam quia facere ad, rerum cupiditate molestiae
                        repudiandae aspernatur explicabo repellat officia quo
                        eum beatae perspiciatis.
                    </p>
                    <div className="flex">
                        <div className=" w-10 h-10 rounded-full text-white flex items-center justify-center mr-5 bg-blue-700">
                            <FaFacebookF />
                        </div>
                        <div className=" w-10 h-10 rounded-full text-white flex items-center justify-center mr-5 bg-cyan-500">
                            <FaTwitter />
                        </div>
                        <div className=" w-10 h-10 rounded-full text-white flex items-center justify-center mr-5 bg-red-500">
                            <FaInstagram />
                        </div>
                    </div>
                </div>
                <div className="p-5 hidden sm:block">
                    <h3 className=" mb-8">Liens utiles</h3>
                    <ul className="m-0 p-0 list-none flex flex-wrap">
                        <li className="w-1/2 mb-2">Accueil</li>
                        <li className="w-1/2 mb-2">Nos services</li>
                        <li className="w-1/2 mb-2">Suivi commande</li>
                        <li className="w-1/2 mb-2">Qui sommes nous ?</li>
                        <li className="w-1/2 mb-2">Livraison & retours</li>
                        <li className="w-1/2 mb-2">Rubrique d'aide</li>
                    </ul>
                </div>
                <div className="grow p-5">
                    <h3 className="mb-8">Contact</h3>
                    <div className="mb-5 flex items-center">
                        <RoomIcon color="black" className="mr-5" />
                        42 rue de la paix, 75001 Paris
                    </div>
                    <div className="mb-5 flex items-center">
                        <PhoneIcon color="black" className="mr-5" /> 06 42 42 42
                        42
                    </div>
                    <div className="mb-5 flex items-center">
                        <EmailOutlinedIcon color="black" className="mr-5" />
                        nbds@gmail.com
                    </div>
                    <img
                        className="w-1/2"
                        src="https://www.gameofbike.fr/wp-content/uploads/2020/10/moyen-de-paiement-paypal.png"
                        alt="moyens de paiements"
                    />
                </div>
            </div>
        </footer>
    );
}
