const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = "SUPER_SECRET_KEY";
const users = []; // geçici bellek

const register = async (req, res) => {
    const { email, name, password } = req.body;
    const isexistuser = users.find(u => u.email === email);
    if (isexistuser) {
        return res.status(409).json({ error: "This user already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: users.length + 1, email, name, password: hashedPassword };
    users.push(newUser);
    console.log("User added successfully");
    res.status(201).json({ message: "User added successfully" });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(400).json({ error: "No such user can be found." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ error: "Password, email or name is not correct." });
    }
    const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
};

const deleteUser = async (req, res) => {
    const { email, password } = req.body;
    const index = users.findIndex(u => u.email === email);
    if (index === -1) {
        return res.status(400).json({ error: "No such user can be found." });
    }
    const user = users[index];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ error: "Password is incorrect." });
    }
    users.splice(index, 1);
    res.json({ message: "User deleted." });
};

module.exports = {
    register,
    login,
    deleteUser
};
