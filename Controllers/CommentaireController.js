const db = require('../Config/JeuxVideo');

//Travail Antoine

//Table Commentaire
exports.getCommentaire = (req,res)=> {
    db.all('SELECT * FROM Commentaire',(err,rows)=> {
        if (err) {
            return res.status(500).json({ erreur: err.message });
        }
        res.json(rows);
    });
};

exports.getCommentaireById = (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM Commentaire WHERE Commentaire_id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ erreur: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: 'Commentaire introuvable' });
        }
        res.json(row);
    });
};

//Ajoute dans Commentaire
exports.addCommentaire = (req,res)=>{
    const Joueurs_id = req.body.Joueurs_id;
    const Console_type = req.body.Console_type;
    const Plateforme_nom = req.body.Plateforme_nom;
    const Commentaire_jeu = req.body.Commentaire_jeu;

    console.log("Insertion:", Joueurs_id, Console_type, Plateforme_nom, Commentaire_jeu);

    db.run(
    "INSERT INTO Commentaire( Joueurs_id, Console_type, Plateforme_nom, Commentaire_jeu) VALUES (?,?,?,?)",
    [ Joueurs_id, Console_type, Plateforme_nom, Commentaire_jeu],
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
    const { Joueurs_id, Console_type, Plateforme_nom, Commentaire_jeu } = req.body;
    db.run(
        'UPDATE Commentaire SET Joueurs_id=?, Console_type=?, Plateforme_nom=?, Commentaire_jeu=? WHERE Commentaire_id=?',
        [ Joueurs_id, Console_type, Plateforme_nom, Commentaire_jeu, id ],
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
    if (!id) {
        return res.status(400).json({ message: "ID manquant" });
    }
    db.run(
        'DELETE FROM Commentaire WHERE Commentaire_id = ?',
        [id],
        function(err) {
            if (err) {
                console.error(err);
                return res.status(500).json({ erreur: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: "Aucun Commentaire trouvé avec cet ID" });
            }
            res.json({ message: "Commentaire supprimé", id: id });
        }
    );
};