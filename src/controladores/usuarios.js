const criptograrSenha = require("../utils/criptografarSenha");
const repositorioUsuario = require("../repositorios/usuarios")

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos são obrigatórios" });
  }
  try {
    const senhaCriptografada = await criptograrSenha(senha);
    const dadosUsuario = { nome, email, senhaCriptografada };
    const { rows: usuariosCadastrados } = await repositorioUsuario.cadastrarUsuario(dadosUsuario)
    delete usuariosCadastrados[0].senha
    return res.status(201).json(usuariosCadastrados[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
};

module.exports = {
  cadastrarUsuario,
};
