const express = require("express");
const rotas = express();

rotas.get("/", (req, res) => {
  res.json("Pagina Inicial");
});

module.exports = rotas;
