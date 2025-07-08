/**router/user */
const express = require('express');
const router = express.Router();
const {register,login,deleteUser} = require('../services/auth');
const { validateRegister, validateLogin, validateDetele } = require('../validetors/authValidator');

router.post('/register', validateRegister, register);/**eksik bilgi olmadığını kontrol ettikten sonra servislerdeki register'a yönlendir */
router.post('/login', validateLogin, login);/**eksik bilgi olmadığını kontrol ettikten sonra servislerdeki logine yönlendir */
router.post('/delete', validateDetele, deleteUser);/**eksik bilgi olmadığını kontrol ettikten sonra servislerdeki delete'e yönlendir */

module.exports = router;