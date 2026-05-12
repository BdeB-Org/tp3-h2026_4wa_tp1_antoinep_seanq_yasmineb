const express = require("express");
const router = express.Router();
 
const JoueurController = require("../Controllers/JoueurController");

//Travail Yasmine

router.get("/Joueur", JoueurController.getJoueur);
router.get("/Joueur/:id", JoueurController.getJoueurById);
router.post("/Joueur", JoueurController.addJoueur);
router.put("/Joueur/:id", JoueurController.updateJoueurById);
router.delete("/Joueur/:id", JoueurController.deleteJoueurById);

module.exports = router;