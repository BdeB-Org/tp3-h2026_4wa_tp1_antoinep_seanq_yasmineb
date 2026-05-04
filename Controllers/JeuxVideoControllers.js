const db = require('../Config/JeuxVideo');

//Travail Sean

// Table Jeux
exports.getJeux = (req,res)=> {
    db.all('SELECT * FROM Jeux',(err,rows)=> {
        res.json(rows);
        });
    };

    //Ajoute dans Jeux
    exports.addJeux = (req,res)=>{
const Jeux_nom = req.body.Jeux_nom;
const Jeux_note = req.body.Jeux_note;

console.log("Insertion:",Jeux_nom,Jeux_note);

db.run(
"INSERT INTO Jeux(Jeux_nom,Jeux_note) VALUES (?,?)",
[Jeux_nom,Jeux_note],
function(err){
    if(err){
console.log(err);
return res.status(500).json({erreur:err.message});
}
res.json({
message:"Jeux ajouté",
id:this.lastID
});
}
);
};

exports.updateJeuxById = (req, res) => {
    const id = req.params.id;
    const { Jeux_nom, Jeux_note } = req.body;
    db.run(
        'UPDATE Jeux SET Jeux_nom=?, Jeux_note=? WHERE Jeux_id=?',
        [Jeux_nom, Jeux_note, id],
        function(err){
            if(err){
                return res.status(500).json({ erreur: err.message });
            }
            res.json({
                message: "Jeux modifié",
                id: id
            });
        }
    );
};

exports.deleteJeuxById = (req, res) => {
    const id = req.params.id;
    // Vérifier que l'id est fourni
    if (!id) {
        return res.status(400).json({ message: "ID manquant" });
    }
    // Exécuter la requête SQL avec callback
    db.run(
        'DELETE FROM Jeux WHERE Jeux_id = ?',
        [id],
        function(err) {
            if (err) {
                console.error(err);
                return res.status(500).json({ erreur: err.message });
            }
            // Vérifier si une ligne a été supprimée
            if (this.changes === 0) {
                return res.status(404).json({ message: "Aucun jeux trouvé avec cet ID" });
            }
            res.json({ message: "Jeux supprimé", id: id });
        }
    );
};


//Travail Antoine

//Table Commentaire
exports.getCommentaire = (req,res)=> {
    db.all('SELECT * FROM Commentaire',(err,rows)=> {
        res.json(rows);
        });
    };

//Ajoute dans Commentaire
exports.addCommentaire = (req,res)=>{
    const Console_type = req.body.Console_type;
    const Plateforme_nom = req.body.Plateforme_nom;
    const Commentaire_jeu = req.body.Commentaire_jeu;

    console.log("Insertion:",  Console_type, Plateforme_nom, Commentaire_jeu);

    db.run(
    "INSERT INTO Commentaire( Console_type, Plateforme_nom, Commentaire_jeu) VALUES (?,?,?,?)",
    [ Console_type, Plateforme_nom, Commentaire_jeu],
    function(err){
        if(err){
            console.log(err);
            return res.status(500).json({erreur:err.message});
        }
        res.json({
            message:"Commentaire ajouté",
            id:this.lastID
        });
    });
};

// Mettre à jour Commentaire
exports.updateCommentaireById = (req, res) => {
    const id = req.params.id;
    const {  Console_type, Plateforme_nom, Commentaire_jeu } = req.body;
    db.run(
        'UPDATE Commentaire SET Console_type=?, Plateforme_nom=?, Commentaire_jeu=? WHERE Joueurs_id=?',
        [ Console_type, Plateforme_nom, Commentaire_jeu, id],
        function(err){
            if(err){
                return res.status(500).json({ erreur: err.message });
            }
            res.json({
                message: "Commentaire modifié",
                id: id
            });
        }
    );
};

// Supprimer dans Commentaire
exports.deleteCommentaireById = (req, res) => {
    const id = req.params.id;
    // Vérifier que l'id est fourni
    if (!id) {
        return res.status(400).json({ message: "ID manquant" });
    }
    // Exécuter la requête SQL avec callback
    db.run(
        'DELETE FROM Commentaire WHERE Joueurs_id = ?',
        [id],
        function(err) {
            if (err) {
                console.error(err);
                return res.status(500).json({ erreur: err.message });
            }
            // Vérifier si une ligne a été supprimée
            if (this.changes === 0) {
                return res.status(404).json({ message: "Aucun Commentaire trouvé avec cet ID" });
            }
            res.json({ message: "Commentaire supprimé", id: id });
        }
    );
};

//- - - - - // Travail Yasmine //- - - - - //

// Table Joueur
exports.getJoueur = (req,res)=> {
    db.all('SELECT * FROM Joueur',(err,rows)=> {
        res.json(rows);
        });
    };

// Ajoute dans Joueur
exports.addJoueur = (req,res)=>{
    const Nom = req.body.Nom;
    const Prénom = req.body.Prénom;
    const Pseudo = req.body.Pseudo;
    const Nbr_jeux_joues = req.body.Nbr_jeux_joues;

    console.log("Insertion:", Nom, Prénom, Pseudo, Nbr_jeux_joues);

    db.run(
    "INSERT INTO Joueur(Nom, Prénom, Pseudo, Nbr_jeux_joues) VALUES (?,?,?,?)",
    [Nom, Prénom, Pseudo, Nbr_jeux_joues],
    function(err){
        if(err){
            console.log(err);
            return res.status(500).json({erreur:err.message});
        }
        res.json({
            message:"Joueur ajouté",
            id:this.lastID
        });
    });
};

// Mettre à jour Joueur
exports.updateJoueurById = (req, res) => {
    const id = req.params.id;
    const { Nom, Prénom, Pseudo, Nbr_jeux_joues } = req.body;
    db.run(
        'UPDATE Joueur SET Nom=?, Prénom=?, Pseudo=?, Nbr_jeux_joues=? WHERE Joueurs_id=?',
        [ Nom, Prénom, Pseudo, Nbr_jeux_joues, id],
        function(err){
            if(err){
                return res.status(500).json({ erreur: err.message });
            }
            res.json({
                message: "Joueur modifié",
                id: id
            });
        }
    );
};

// Supprimer dans Joueur
exports.deleteJoueurById = (req, res) => {
    const id = req.params.id;
    // Vérifier que l'id est fourni
    if (!id) {
        return res.status(400).json({ message: "ID manquant" });
    }
    // Exécuter la requête SQL avec callback
    db.run(
        'DELETE FROM Joueur WHERE Joueurs_id = ?',
        [id],
        function(err) {
            if (err) {
                console.error(err);
                return res.status(500).json({ erreur: err.message });
            }
            // Vérifier si une ligne a été supprimée
            if (this.changes === 0) {
                return res.status(404).json({ message: "Aucun Joueur trouvé avec cet ID" });
            }
            res.json({ message: "Joueur supprimé", id: id });
        }
    );
};