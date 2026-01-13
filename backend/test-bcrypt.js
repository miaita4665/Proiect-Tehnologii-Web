const bcrypt = require('bcrypt');

// 1. Pune aici PAROLA pe care o scrii în React
const parolaTastata = "123456"; 

// 2. Pune aici HASH-ul exact pe care îl vezi în MySQL (copy-paste din tabel)
const hashDinBazaDeDate = "$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGGa31S."; 

async function verifica() {
    console.log("--- START DEBUGGING BCRYPT ---");
    console.log("Parola testată:", parolaTastata);
    console.log("Hash-ul din DB: ", hashDinBazaDeDate);
    
    // Verificăm lungimea (trebuie să fie fix 60)
    console.log("Lungime Hash:", hashDinBazaDeDate.length);

    try {
        const isMatch = await bcrypt.compare(parolaTastata, hashDinBazaDeDate);
        
        if (isMatch) {
            console.log("✅ REZULTAT: PAROLA ESTE CORECTĂ!");
        } else {
            console.log("❌ REZULTAT: PAROLA ESTE GREȘITĂ!");
            console.log("Sfat: Verifică dacă ai spații invizibile în baza de date.");
        }
    } catch (err) {
        console.error("Eroare tehnică la comparare:", err.message);
    }
    console.log("--- SFÂRȘIT DEBUGGING ---");
}

verifica();