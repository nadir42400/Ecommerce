import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { CgShoppingCart } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userRedux";
import Logo from "../asset/NBDS.png";
import Axios from "axios";

export default function Navbar() {
    const [datas, setDatas] = useState([]);
    const [searchTerm, setSearchTrem] = useState('');

    console.log(datas)
  useEffect(() => {
      Axios.get('http://localhost:4242/article').then((res) => 
      setDatas(res.data.response)
      ).catch((err)=>
        console.log(err))
  }, []);

  const handleSearchTerm = (e) => {
    var value = e.target.value;
    setSearchTrem(value);
  };
  
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentUser } = useSelector((state) => state.user);
    const { cartTotalQuantity } = useSelector((state) => state.cart);

    console.log(cartTotalQuantity);

    const [nav, setNav] = useState(false);

    const signoutHandler = () => {
        dispatch(logout());
        navigate("/");
    };

    
  

    return (
        <header className="bg-blue-500 w-full flex flex-row justify-center">
            <div className="flex justify-between items-center container h-16 px-4">
                <div>
                    <Link to="/">
                        <img src={Logo} className="rounded-lg h-14 w-16" alt="logo"/>
                    </Link>
                </div>
                    <div className="ml-6 relative w-full">
                        <input
                            type="search"
                            id="search-input"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none p-2.5"
                            placeholder="Rechercher un produit"
                            onChange={handleSearchTerm}
                        />
                        {datas.filter((val) => {
                       if(searchTerm === ""){
                        // return val;
                        console.log('')
                      }
                      else if( val.full_name.toLowerCase().includes(searchTerm.toLowerCase())){
                        return val;
                      }
                      }).map((val => {
                        return <div className="justify-center text-slate-600 bg-zinc-100 rounded-md shadow-xl border border-white hover:bg-zinc-200" 
                        key={val.id} >{val.full_name}</div>
                      }))}
                        
                    </div>

                <nav>
                    <ul className="hidden md:flex space-x-4 cursor-pointer capitalize font-medium text-lg items-center">
                        {currentUser ? (
                            <li className="text-black">
                                <button
                                    type="submit"
                                    onClick={signoutHandler}
                                    className="text-white"
                                >
                                    Déconnexion
                                </button>
                            </li>
                        ) : (
                            <>
                                <li className="text-black">
                                    <NavLink
                                        to="/register"
                                        className="text-white"
                                    >
                                        Inscription
                                    </NavLink>
                                </li>
                                <li className="text-black">
                                    <NavLink to="/login" className="text-white">
                                        Connexion
                                    </NavLink>
                                </li>
                            </>
                        )}
                        {currentUser?.admin ? (
                            <li className="text-black">
                                <NavLink
                                    to="/admin"
                                    className={(nav) =>
                                        nav.isActive
                                            ? "text-white"
                                            : "text-black"
                                    }
                                >
                                    Admin
                                </NavLink>
                            </li>
                        ) : null}

                        <li>
                            <NavLink
                                to="/cart"
                                className={(nav) =>
                                    nav.isActive
                                        ? "text-white flex items-center space-x-1"
                                        : "text-black flex items-center space-x-1"
                                }
                            >
                                <CgShoppingCart size={30} color="white"/>
                                <span className="text-white">
                                    {cartTotalQuantity}
                                </span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                <div
                    onClick={() => setNav(!nav)}
                    className="cursor-pointer pr-4 z-30 text-gray-500 md:hidden absolute right-0"
                >
                    {nav ? (
                        <FaTimes size={30} color="white" />
                    ) : (
                        <FaBars size={30} color="white" />
                    )}
                </div>
            </div>

            {nav && (
                <nav>
                    <ul className="flex flex-col justify-center items-center absolute top-0 right-0 w-4/5 min-h-screen h-full bg-blue-500 text-gray-500 z-20">
                        <li className="px-4 cursor-pointer capitalize py-6 text-4xl">
                            <NavLink
                                onClick={() => setNav(!nav)}
                                to="/"
                                className={(nav) =>
                                    nav.isActive ? "text-white" : "text-black"
                                }
                            >
                                Accueil
                            </NavLink>
                        </li>
                        {currentUser ? (
                            <li className="px-4 cursor-pointer capitalize py-6 text-4xl">
                                <button
                                    type="submit"
                                    onClick={signoutHandler}
                                    className="text-black"
                                >
                                    Déconnexion
                                </button>
                            </li>
                        ) : (
                            <>
                                <li className="px-4 cursor-pointer capitalize py-6 text-4xl">
                                    <NavLink
                                        to="/register"
                                        className={(nav) =>
                                            nav.isActive
                                                ? "text-white"
                                                : "text-black"
                                        }
                                    >
                                        Inscription
                                    </NavLink>
                                </li>
                                <li className="px-4 cursor-pointer capitalize py-6 text-4xl">
                                    <NavLink
                                        to="/login"
                                        className={(nav) =>
                                            nav.isActive
                                                ? "text-white"
                                                : "text-black"
                                        }
                                    >
                                        Connexion
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            )}
        </header>
    );
}
