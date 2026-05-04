const express = require("express");
const router = express.Router();
 
const JeuxVideoControllers = require("../Controllers/JeuxVideoControllers");

//Travail Sean

router.get("/Jeux", JeuxVideoControllers.getJeux);
router.post("/Jeux", JeuxVideoControllers.addJeux);
router.put("/Jeux/:id", JeuxVideoControllers.updateJeuxById);
router.delete("/Jeux/:id", JeuxVideoControllers.deleteJeuxById);



//Travail Antoine

router.get("/Commentaire", JeuxVideoControllers.getCommentaire);
router.post("/Commentaire", JeuxVideoControllers.addCommentaire);
router.put("/Commentaire/:id", JeuxVideoControllers.updateCommentaireById);
router.delete("/Commentaire/:id", JeuxVideoControllers.deleteCommentaireById);



//Travail Yasmine

router.get("/Joueur", JeuxVideoControllers.getJoueur);
router.post("/Joueur", JeuxVideoControllers.addJoueur);
router.put("/Joueur/:id", JeuxVideoControllers.updateJoueurById);
router.delete("/Joueur/:id", JeuxVideoControllers.deleteJoueurById);



module.exports = router;