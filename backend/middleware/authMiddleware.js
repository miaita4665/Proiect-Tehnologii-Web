const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    // I token-ul din Header-ul "Authorization"
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Acces refuzat. Nu ai trimis tokenul !" });
    }

    try {
        // Verificam folosind cheia secreta
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Salvez datele (id, role) pentru a le folosi în controllere
        next(); // Permit trecerea mai departe la funcția din controller
    } catch (error) {
        res.status(403).json({ message: "Token invalid sau expirat!" });
    }
};

module.exports = authenticateToken;