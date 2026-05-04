const db = require('../Config/JeuxVideo');

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