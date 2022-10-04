import React, { useState, useEffect } from "react";
import { publicRequest } from "../requestMethods";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../redux/userRedux";

export default function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentUser } = useSelector((state) => state.user);

    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        cpassword: "",
    });

    const [error, setError] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const register = (e) => {
        e.preventDefault();

        const data = {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password,
            cpassword: user.cpassword,
        };

        publicRequest
            .post("/auth/signup", data)
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
                        <h1 className="mb-8 text-3xl text-center text-blue-500">Inscrivez-vous</h1>
                        <div className="text-red-500 mb-4">{error}</div>
                        <form onSubmit={register} className="flex flex-col">
                            <div className="mb-4">
                                <input
                                    type="text"
                                    className="block border w-full p-3 rounded"
                                    name="firstname"
                                    placeholder="Prénom"
                                    onChange={handleChange}
                                    value={user.firstname}
                                />
                            </div>

                            <div className="mb-4">
                                <input
                                    type="text"
                                    className="block border w-full p-3 rounded"
                                    name="lastname"
                                    placeholder="Nom"
                                    onChange={handleChange}
                                    value={user.lastname}
                                />
                            </div>

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

                            <div className="mb-4">
                                <input
                                    type="password"
                                    className="block border w-full p-3 rounded"
                                    name="cpassword"
                                    placeholder="Confirmation mot de passe"
                                    onChange={handleChange}
                                    value={user.cpassword}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full text-center py-3 rounded bg-blue-500 text-white focus:outline-none my-1"
                            >
                                Inscription
                            </button>
                        </form>
                    </div>

                    <div className="text-slate-500 mt-6">
                        <span>Vous avez déjà un compte? </span>
                        <NavLink
                            className="no-underline border-b border-blue-400 text-blue-600"
                            to="/login"
                        >
                            Connexion
                        </NavLink>
                        .
                    </div>
                </div>
            </div>
        </div>
    );
}
