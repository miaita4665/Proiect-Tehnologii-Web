const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- INREGISTRARE ---
exports.register = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Verificam dacă email-ul există deja
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ message: "Acest email este deja înregistrat." });
        }

        // Criptam parola
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Salvăm userul
        const newUser = await User.create({
            email,
            password: hashedPassword,
            role: role || 'AUTHOR' // Daca nu trimitem rol, punem default AUTHOR
        });

        res.status(201).json({ message: "Utilizator creat cu succes!", userId: newUser.id });
    } catch (error) {
        res.status(500).json({ message: "Eroare la înregistrare", error: error.message });
    }
};

// --- LOGARE ---
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("JWT Secret din ENV:", process.env.JWT_SECRET);
        // Cautam userul
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "Utilizatorul nu a fost găsit." });
        }

        // Verificam parola
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Parolă incorectă." });
        }

        // Generam Token-ul 
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' } // Valabil 24 ore
        );

        res.json({
            token,
            user: { id: user.id, email: user.email, role: user.role }
        });
    } catch (error) {
        res.status(500).json({ message: "Eroare la logare", error: error.message });
    }
};