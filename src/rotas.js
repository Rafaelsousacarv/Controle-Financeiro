const express = require("express");
const {
  cadastrarUsuario,
  logarUsuario,
  detalharUsuario,
  atualizarUsuario,
} = require("./controladores/usuarios");
const conferirLogado = require("./intermediarios/conferirLogado");
const rotas = express();

rotas.get("/", (req, res) => {
  res.json("Pagina Inicial");
});

rotas.post("/usuario", cadastrarUsuario);
rotas.post("/login", logarUsuario);

rotas.use(conferirLogado);

rotas.get("/usuario", detalharUsuario);
rotas.put("/usuario", atualizarUsuario);

module.exports = rotas;
