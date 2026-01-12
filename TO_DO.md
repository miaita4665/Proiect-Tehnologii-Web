Proiect: Aplicație Web pentru Managementul Conferințelor Științifice
1. Obiectivul Proiectului
Implementarea unei aplicații web complete pentru organizarea și gestionarea conferințelor științifice. Proiectul se bazează pe un flux de lucru ce implică încărcarea, recenzarea și aprobarea articolelor de specialitate.
2. Arhitectură și Constrângeri Tehnice
Aplicația trebuie să respecte următoarele cerințe tehnologice:
•	Front-end: Single Page Application (SPA) construit cu un framework bazat pe componente (React.js, Angular sau Vue.js). Interfața trebuie să fie accesibilă de pe desktop, mobil și tabletă.
•	Back-end: Implementat în Node.js cu interfață RESTful.
•	Baza de date: Relațională, accesată prin intermediul unui ORM (ex. Sequelize, Prisma).
•	Servicii Externe: Integrarea datelor dintr-un serviciu extern (ex: trimitere email-uri, stocare cloud, API-uri meteo sau locații).
•	Deployment: Aplicația trebuie să fie publicată pe un server (ex: Azure, AWS, Render, Fly.io).
•	Versionare: Codul va fi găzduit pe un repository de Git cu commit-uri incrementale și descrieri clare.
3. Specificații Funcționale (Roluri și Flux)
Aplicația va gestiona trei tipuri principale de utilizatori:
3.1. Organizatorul
•	Poate crea o conferință nouă.
•	Alocă o serie de recenzori (reviewers) pentru fiecare conferință.
•	Monitorizează starea tuturor articolelor primite.
3.2. Autorul
•	Se poate înregistra la o conferință.
•	Poate propune un articol (paper proposal).
•	Poate încărca o versiune nouă a articolului pe baza feedback-ului primit.
3.3. Recenzorul (Reviewer)
•	Sistemul alocă automat 2 recenzori pentru fiecare articol primit.
•	Recenzorul poate accepta articolul sau poate oferi feedback autorului pentru actualizarea acestuia.
4. Standarde de Calitate și Documentare
•	Business Logic: Aplicația trebuie să fie coerentă și complet funcțională.
•	Organizarea Codului: Variabilele trebuie să aibă nume sugestive (camelCase), codul trebuie indentat corect și documentat cu comentarii pentru fiecare clasă și funcție.
•	Funcționalitate: Aplicațiile care nu pornesc nu vor fi punctate. Funcționalitățile Front-end și Back-end pot fi demonstrate separat dacă este cazul.
5. Livrabile și Termene Limită
Predarea se face prin furnizarea link-ului către repository-ul de Git. Lipsa unei etape intermediare reduce punctajul maxim cu 10%.
Etapa	Descriere Livrabil	Termen Limită
Etapa 1	Specificații detaliate, plan de proiect, repository Git activ.	    16.11.2025
Etapa 2	Serviciu RESTful funcțional în repository + instrucțiuni de rulare.	06.12.2025
Etapa 3	Aplicația completă, deployed (Live) și prezentarea Demo.	        Ultimul laborator

