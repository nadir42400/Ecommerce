import React, { useState, useEffect } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../redux/userRedux";
import { publicRequest } from "../requestMethods";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentUser } = useSelector((state) => state.user);

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const login = (e) => {
        e.preventDefault();

        const data = {
            email: user.email,
            password: user.password,
        };

        publicRequest
            .post("/auth/signin", data)
            .then((res) => {
                console.log(res.data);
                dispatch(loginSuccess(res.data));
                navigate("/");
                setError([]);
            })
            .catch((err) => {
                console.log(err.response.data.errors);
                setError(err.response.data.errors);
            });
    };

    useEffect(() => {
        if (currentUser) {
            console.log("currentUser", currentUser);
            navigate("/");
        }
    }, [currentUser, navigate]);

    return (
        <div className="bg-slate-100">
               <Link to="/" className='ml-5 mt-3 text-blue-500 hover:underline'>Page d'accueil</Link>
            
            <div className="container mx-auto">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center h-screen px-2">
                    <div className="bg-white px-6 py-8 border-y rounded shadow-md text-black w-full mb-10">
                        <h1 className="mb-8 text-3xl text-center text-blue-700 ">Connectez-vous</h1>
                        <div className="text-red-500 mb-4">{error}</div>
                        <form onSubmit={login} className="flex flex-col">
                            <div className="mb-4">
                                <input
                                    type="email"
                                    className="block border w-full p-3 rounded"
                                    name="email"
                                    placeholder="Email"
                                    onChange={handleChange}
                                    value={user.email}
                                />
                            </div>

                            <div className="mb-4">
                                <input
                                    type="password"
                                    className="block border w-full p-3 rounded"
                                    name="password"
                                    placeholder="Mot de passe"
                                    onChange={handleChange}
                                    value={user.password}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full text-center py-3 rounded bg-blue-500 text-white focus:outline-none my-1"
                            >
                                Connexion
                            </button>
                        </form>
                    </div>

                    <div className="text-slate-500">
                        <Link to="/pwForget" className="text-xs text-blue-600 hover:underline">Mot de passe oublié ?</Link>
                    </div>
 
                    <div className="text-slate-500 mt-3">
                        <span>Vous n'avez pas de compte ?</span>
                        <NavLink
                            className="no-underline border-b border-blue-400 text-blue-600"
                            to="/register"
                        >
                            Créer un compte
                        </NavLink>
                        .
                    </div>
                </div>
            </div>
        </div>
    );
}
