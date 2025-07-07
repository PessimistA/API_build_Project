const jwt = require('jsonwebtoken');
const authController = require('../controller/auth_controller');
const SECRET_KEY = process.env.SECRET_KEY || "SUPER_SECRET_KEY";

exports.register = async (req, res) => {
    const { email, name, password } = req.body;

    try {
        const user = await authController.findUserByEmail(email);
        if (user) {
            return res.status(409).json({ error: "User already exists" });
        }

        const hashed = await authController.hashPassword(password);
        await authController.createUser(email, name, hashed);

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await authController.findUserByEmail(email);
        if (!user) return res.status(400).json({ error: "User not found" });

        const isMatch = await authController.comparePasswords(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid password" });

        const token = jwt.sign({ userId: user._id, email: user.email }, SECRET_KEY, {
            expiresIn: '1h',
        });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.deleteUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await authController.findUserByEmail(email);
        if (!user) return res.status(400).json({ error: "User not found" });

        const isMatch = await authController.comparePasswords(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid password" });

        await authController.deleteUserByEmail(email);
        res.json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
};

