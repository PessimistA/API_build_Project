const User = require('../models/mongouser');
const bcrypt = require('bcryptjs');

async function findUserByEmail(email) {
    return await User.findOne({ email });
}

async function comparePasswords(plain, hash) {
    return await bcrypt.compare(plain, hash);
}

async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

async function createUser(email, name, hashedPassword) {
    const newUser = new User({ email, name, password: hashedPassword });
    return await newUser.save();
}

async function deleteUserByEmail(email) {
    return await User.deleteOne({ email });
}

module.exports = {
    findUserByEmail,
    comparePasswords,
    hashPassword,
    createUser,
    deleteUserByEmail
};
