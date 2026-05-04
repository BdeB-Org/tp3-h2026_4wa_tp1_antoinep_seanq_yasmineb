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