const express = require("express");
const router = express.Router();

const CommentaireController = require("../Controllers/CommentaireController");

//Travail Antoine

router.get("/Commentaire", CommentaireController.getCommentaire);
router.get("/Commentaire/:id", CommentaireController.getCommentaireById);
router.post("/Commentaire", CommentaireController.addCommentaire);
router.put("/Commentaire/:id", CommentaireController.updateCommentaireById);
router.delete("/Commentaire/:id", CommentaireController.deleteCommentaireById);

module.exports = router;