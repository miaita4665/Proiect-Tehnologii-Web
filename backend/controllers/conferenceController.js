// Import modelele 
const { Conference } = require('../models');

// Functia pentru a crea o conferință
exports.createConference = async (req, res) => {
    try {
        // Luăm datele trimise de React din req.body
        const { name, description } = req.body;

        // Folosim Sequelize pentru a insera în MySQL
        const newConference = await Conference.create({ name, description });

        // Trimitem răspunsul de succes
        res.status(201).json(newConference);
    } catch (error) {
        // Dacă apare o eroare (ex: MySQL e picat), trimitem eroarea
        res.status(500).json({ message: "Eroare la crearea conferinței", error: error.message });
    }
};

// Funcția pentru a vedea toate conferințele
exports.getAllConferences = async (req, res) => {
    try {
        const conferences = await Conference.findAll();
        res.status(200).json(conferences);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};