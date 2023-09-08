const express = require("express");
const {
  cadastrarUsuario,
  logarUsuario,
  detalharUsuario,
  atualizarUsuario,
} = require("./controladores/usuarios");
const conferirLogado = require("./intermediarios/conferirLogado");
const { listarCategorias } = require("./controladores/categorias");
const {
  listarTransacao,
  cadastrarTransacao,
  detalharTransacao,
  atualizarTransacao,
  deletarTransacao,
} = require("./controladores/transacoes");
const rotas = express();

rotas.get("/", (req, res) => {
  res.json("Pagina Inicial");
});

rotas.post("/usuario", cadastrarUsuario);
rotas.post("/login", logarUsuario);

rotas.use(conferirLogado);

rotas.get("/usuario", detalharUsuario);
rotas.put("/usuario", atualizarUsuario);
rotas.get("/categoria", listarCategorias);

rotas.get("/transacao", listarTransacao);
rotas.post("/transacao", cadastrarTransacao);
rotas.get("/transacao/:id", detalharTransacao);
rotas.put("/transacao/:id", atualizarTransacao);
rotas.delete("/transacao/:id", deletarTransacao);

module.exports = rotas;
