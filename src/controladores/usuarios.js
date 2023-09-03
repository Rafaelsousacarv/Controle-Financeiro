const criptograrSenha = require("../utils/criptografarSenha");
const repositorioUsuario = require("../repositorios/usuarios");
const compararSenhas = require("../utils/conferirSenhas");
const { sign } = require("jsonwebtoken");
const { senhaToken } = require("../../dadosSensiveis");

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos são obrigatórios" });
  }
  try {
    const { rowCount } = await repositorioUsuario.encontrarUsuarioPeloEmail(
      email
    );
    if (rowCount > 0) {
      return res
        .status(400)
        .json({
          mensagem: "Já existe usuário cadastrado com o e-mail informado.",
        });
    }
    const senhaCriptografada = await criptograrSenha(senha);
    const dadosUsuario = { nome, email, senhaCriptografada };
    const { rows: usuariosCadastrados } =
      await repositorioUsuario.cadastrarUsuario(dadosUsuario);
    delete usuariosCadastrados[0].senha;
    return res.status(201).json(usuariosCadastrados[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
};

const logarUsuario = async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Os campos email e senha são obrigatórios" });
  }
  try {
    const { rows: usuariosEncontrados, rowCount } =
      await repositorioUsuario.encontrarUsuarioPeloEmail(email);
    if (rowCount === 0) {
      return res.status(404).json({ mensagem: "Usuário e/ou senha inválido(s)." });
    }
    const confereSenha = await compararSenhas(
      senha,
      usuariosEncontrados[0].senha
    );
    if (!confereSenha) {
      return res.status(404).json({ mensagem: "Usuário e/ou senha inválido(s)." });
    }
    const token = sign({ id: usuariosEncontrados[0].id }, senhaToken, {
      expiresIn: "8h",
    });
    delete usuariosEncontrados[0].senha;
    const usuarioLogado = {
      usuarios: {
      id: usuariosEncontrados[0].id,
      nome: usuariosEncontrados[0].nome,
      email: usuariosEncontrados[0].email
      },
      token: token
    }
    return res.status(200).json(usuarioLogado);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
};

const detalharUsuario = (req, res) => {
  return res.status(200).json(req.usuarioCadastrado);
}


module.exports = {
  cadastrarUsuario,
  logarUsuario,
  detalharUsuario
};
