const express = require("express");
const { cadastrarUsuario, logarUsuario } = require("./controladores/usuarios");
const rotas = express();

rotas.get("/", (req, res) => {
  res.json("Pagina Inicial");
});

rotas.post("/usuario", cadastrarUsuario);
rotas.post("/login", logarUsuario);

module.exports = rotas;
