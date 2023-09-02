const express = require("express");
const { cadastrarUsuario } = require("./controladores/usuarios");
const rotas = express();

rotas.get("/", (req, res) => {
  res.json("Pagina Inicial");
});

rotas.post("/usuario", cadastrarUsuario);

module.exports = rotas;
