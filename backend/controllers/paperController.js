const { Paper, User, Review, sequelize } = require('../models');

exports.uploadPaper = async (req, res) => {
    // Folosim o tranzacție pentru a ne asigura că ori se salvează tot, ori nimic
    const t = await sequelize.transaction();

    try {
        const { title, conferenceId, authorId } = req.body;

        // 1. Creăm articolul
        const newPaper = await Paper.create({
            title,
            conferenceId,
            authorId,
            status: 'PENDING',
            fileUrl: 'url_cloudinary_placeholder'
        }, { transaction: t });

        // 2. Căutăm utilizatorii care au rolul 'REVIEWER'
        const allReviewers = await User.findAll({ where: { role: 'REVIEWER' } });

        if (allReviewers.length < 2) {
            await t.rollback();
            return res.status(400).json({ message: "Nu sunt suficienți recenzori în sistem!" });
        }

        // 3. Logica de alocare: amestecăm lista și luăm primii 2 (Randomize)
        const shuffled = allReviewers.sort(() => 0.5 - Math.random());
        const selectedReviewers = shuffled.slice(0, 2);

        // 4. Creăm alocările în tabelul Reviews
        // Pentru fiecare din cei 2 recenzori, facem o intrare
        const reviewAssignments = selectedReviewers.map(reviewer => {
            return {
                paperId: newPaper.id,
                reviewerId: reviewer.id,
                status: 'ASSIGNED'
            };
        });

        await Review.bulkCreate(reviewAssignments, { transaction: t });

        // Dacă totul a mers bine, salvăm modificările în baza de date
        await t.commit();

        res.status(201).json({
            message: "Articol încărcat și alocat automat celor 2 recenzori!",
            paperId: newPaper.id,
            allocatedTo: selectedReviewers.map(r => r.email)
        });

    } catch (error) {
        await t.rollback();
        res.status(500).json({ message: "Eroare la alocare", error: error.message });
    }
};