1.1. Roluri Utilizatori

    Organizator: Inițiază conferința.

    Autor: Trimite lucrările spre evaluare.

    Recenzor (Reviewer):  Evaluează calitatea lucrărilor.

1.2. Fluxul Principal de Business (Workflow)

    Creare Conferință: Organizatorul definește numele, descrierea și alege o listă de utilizatori care vor fi recenzori.

    Trimitere Lucrare: Autorul se înscrie, încarcă un fișier PDF (stocat extern în Cloudinary) și primește un status de "În așteptare".

    Alocare Automată: Sistemul detectează o lucrare nouă și alege automat 2 recenzori din lista organizatorului.

    Evaluare: Recenzorii primesc lucrarea în dashboard, o citesc și oferă feedback text + un verdict (Acceptat / Revizuire Necesară).

    Iterație: Dacă este necesară revizuirea, Autorul poate încărca o versiune nouă (v2).

2.  Arhitectură și Specificații Tehnice

    Frontend: React.js (Component-based UI).

    Backend: Node.js cu Express (RESTful API).

    Baza de Date: Relațională (MySQL) via Sequelize ORM.

    Servicii Externe: Cloudinary API pentru managementul fișierelor PDF.

    Autentificare: JSON Web Tokens (JWT) pentru securizarea rutelor.

3.  Structura Bazei de Date (Schema Logica)
    Vom folosi următoarele entități:

        Users: (id, email, password, role)

        Conferences: (id, title, organizerId)

        Papers: (id, title, fileUrl, status, authorId, conferenceId)

        Reviews: (id, paperId, reviewerId, feedback, verdict)
