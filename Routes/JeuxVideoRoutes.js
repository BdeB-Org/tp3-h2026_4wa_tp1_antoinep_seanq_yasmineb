const express = require("express");
const router = express.Router();
 
const JeuxVideoControllers = require("../Controllers/JeuxVideoControllers");

//Travail Sean

router.get("/Jeux", JeuxVideoControllers.getJeux);
router.post("/Jeux", JeuxVideoControllers.addJeux);
router.put("/Jeux/:id", JeuxVideoControllers.updateJeuxById);
router.delete("/Jeux/:id", JeuxVideoControllers.deleteJeuxById);

module.exports = router;