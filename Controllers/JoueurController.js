const db = require('../Config/JeuxVideo');

//- - - - - // Travail Yasmine //- - - - - //

// Table Joueur
exports.getJoueur = (req,res)=> {
    db.all('SELECT * FROM Joueur',(err,rows)=> {
        res.json(rows);
        });
    };

exports.getJoueurById = (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM Joueur WHERE Joueurs_id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ erreur: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: 'Joueur introuvable' });
        }
        res.json(row);
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