import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, isAdmin }) => {
    const { currentUser } = useSelector((state) => state.user);

    return (
        <>
            {!currentUser ? (
                <Navigate to="/login" />
            ) : isAdmin ? (
                currentUser.admin ? (
                    children
                ) : (
                    <Navigate to="/" />
                )
            ) : (
                children
            )}
        </>
    );
};

export default ProtectedRoute;
