const express = require('express');
const router = express.Router();
const {register,login,deleteUser} = require('../controller/auth_controller');
const { validateRegister, validateLogin, validateDetele } = require('../validetors/authValidator');

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/delete', validateDetele, deleteUser);

module.exports = router;