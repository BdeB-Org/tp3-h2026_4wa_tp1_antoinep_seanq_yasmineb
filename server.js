const express = require("express");
 
const app = express();
 
const JeuxVideoRoutes = require("./Routes/JeuxVideoRoutes");
 
app.use(express.json());
 
app.use("/", JeuxVideoRoutes);
 
app.listen(3000, () => {
    console.log("Serveur lancé sur http://localhost:3000");
});
 