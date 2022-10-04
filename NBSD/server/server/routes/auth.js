const router = require("express").Router();
const User = require("../schemas/UserSchema");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { generateAuthToken } = require("./verifyToken");

//REGISTER
router.post("/signup", async (req, res) => {
    const schema = Joi.object({
        firstname: Joi.string().min(2).max(30).required(),
        lastname: Joi.string().min(2).max(30).required(),
        email: Joi.string().min(3).max(200).required().email(),
        password: Joi.string().min(6).max(200).required(),
        cpassword: Joi.any()
            .equal(Joi.ref("password"))
            .required()
            .label("Passwords")
            .messages({ "any.only": "{{#label}} does not match" }),
    });

    const { error } = schema.validate(req.body);

    if (error)
        return res.status(400).json({ errors: error.details[0].message });

    let user = await User.findOne({ email: req.body.email });
    if (user)
        return res
            .status(400)
            .json({ errors: "An account with this email already exists." });

    user = new User({ ...req.body });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    console.log("Register user:", user);

    const accessToken = generateAuthToken(user);

    return res.status(201).json({
        accessToken,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        admin: user.admin,
        fullname: user.fullname,
    });
});

//LOGIN

router.post("/signin", async (req, res) => {
    const schema = Joi.object({
        email: Joi.string().min(3).max(200).required().email(),
        password: Joi.string().min(6).max(200).required(),
    });

    const { error } = schema.validate(req.body);

    if (error)
        return res.status(400).json({ errors: error.details[0].message });

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ errors: "Invalid credentials" });

    const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
    );
    if (!isValidPassword)
        return res.status(400).json({ errors: "Invalid credentials" });

    console.log("Login user:", user);

    const accessToken = generateAuthToken(user);

    return res.status(201).json({
        accessToken,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        admin: user.admin,
        fullname: user.fullname,
    });
});

module.exports = router;
