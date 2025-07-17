const jwt = require('jsonwebtoken');
const authController = require('../controller/auth_controller');
const Temperature = require('../models/mongosensor'); 
const SECRET_KEY = process.env.SECRET_KEY || "SUPER_SECRET_KEY";

/**
 * @brief exports.register benim register fonksiyonumu en sonda export etmeden direk export etmemi sağladı
 * @param req json formatında aldığı request
 * @param res json formatında karşıya verilen respond
 */

exports.register = async (req, res) => {
    const { email, name, password } = req.body;/**Json formatındaki verileri ayırma */

    try {
        const user = await authController.findUserByEmail(email);/**Önce email ile kontrol edilir ve kayıtlı olup olmadığı döner */
        if (user) {
            return res.status(409).json({ error: "User already exists" });
        }
            
        const hashed = await authController.hashPassword(password);/**kayıtlı değilse eklenirken güvenlik için şifresi hashlenir */
        await authController.createUser(email, name, hashed);/**kayıt işlemi yapılır */

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
};
/**
 * @brief exports.login benim login fonksiyonumu en sonda export etmeden direk export etmemi sağladı
 * @param req json formatında aldığı request
 * @param res json formatında karşıya verilen respond
 */

exports.login = async (req, res) => {
    const { email, password } = req.body;/**Json formatındaki verileri ayırma */

    try {
        const user = await authController.findUserByEmail(email);/**user' ın kayıtlı olup olmadığına bakılır */
        if (!user) return res.status(400).json({ error: "User not found" });

        const isMatch = await authController.comparePasswords(password, user.password);/**loginde kullanılan şifre hashlenir ve hashlenmiş kayıtlı şifre ile kıyaslanır */
        if (!isMatch) return res.status(400).json({ error: "Invalid password" });

        const token = jwt.sign({ userId: user._id, email: user.email }, SECRET_KEY, {
            expiresIn: '1h',
        });/**oluşturulan tokenin özellikleri belirlenir bu tokende user id ,email,tanımlanan secret key kullanılır ve 1 saatin sonunda etkisiz hale getririlmesi istenir */
// JWT (JSON Web Token) oluşturulur
// Token içinde user ID ve email payload olarak ekleniyor.
// Token, belirlenen SECRET_KEY ile imzalanıyor
// "expiresIn: '1h'" ifadesiyle token'ın 1 saat geçerli olması sağlanıyor.
// 1 saat sonra token geçersiz hale gelir.
        res.json({ token });//token respond olarak json formatında ekrana basılır
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
};
/**
 * @brief exports.deleteuser benim delete fonksiyonumu en sonda export etmeden direk export etmemi sağladı
 * @param req json formatında aldığı request
 * @param res json formatında karşıya verilen respond
 */
exports.deleteUser = async (req, res) => {
  try {
    const email = req.user.email;
    const user = await authController.findUserByEmail(email);
    if (!user) return res.status(404).json({ error: "Kullanıcı bulunamadı" });

    // Önce sıcaklık verilerini sil
    await Temperature.deleteMany({ userId: user._id });

    // Ardından kullanıcıyı sil
    await authController.deleteUserByEmail(email);

    res.json({ message: "Kullanıcı ve verileri silindi." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Sunucu hatası" });
  }
};
