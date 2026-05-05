//connexion base de donnée
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./TP1.db', (err) => {
    if (err) {
        console.error('Erreur SQLite :', err.message);
    } else {
        console.log('Connecté à SQLite');
    }
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS etudiants (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nom TEXT,
            programme TEXT
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        )
    `);

    db.run(
        "INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)",
        ['admin', 'admin123']
    );

    // Table Jeux
    db.run(`
        CREATE TABLE IF NOT EXISTS Jeux (
            Jeux_id INTEGER PRIMARY KEY AUTOINCREMENT,
            Jeux_nom TEXT,
            Jeux_note TEXT
        )
    `);

    // Table Joueur
    db.run(`
        CREATE TABLE IF NOT EXISTS Joueur (
            Joueurs_id INTEGER PRIMARY KEY AUTOINCREMENT,
            Nom TEXT,
            Prénom TEXT,
            Pseudo TEXT,
            Nbr_jeux_joues INTEGER
        )
    `);

    // Table Commentaire
    db.run(`
        CREATE TABLE IF NOT EXISTS Commentaire (
            Commentaire_id INTEGER PRIMARY KEY AUTOINCREMENT,
            Joueurs_id INTEGER,
            Console_type TEXT,
            Plateforme_nom TEXT,
            Commentaire_jeu TEXT,
            FOREIGN KEY (Joueurs_id) REFERENCES Joueur(Joueurs_id)
        )
    `);
});

module.exports = db;

 