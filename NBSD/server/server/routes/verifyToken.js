const jwt = require("jsonwebtoken");

const generateAuthToken = (user) => {
    const jwtSecretKey = process.env.JWT_SEC;
    const token = jwt.sign(
        {
            id: user._id,
            admin: user.admin,
        },
        jwtSecretKey,
        { expiresIn: "3d" }
    );

    return token;
};

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) res.status(403).json("Token is not valid!");
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json("You are not authenticated!");
    }
};

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user._id === req.params._id || req.user.admin) {
            next();
        } else {
            res.status(403).json("You are not alowed to do that!");
        }
    });
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.admin) {
            next();
        } else {
            res.status(403).json("You are not alowed to do that!");
        }
    });
};

module.exports = {
    generateAuthToken,
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
};
