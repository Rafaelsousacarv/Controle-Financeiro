const { verify } = require("jsonwebtoken");
const { senhaToken } = require("../../dadosSensiveis");
const { encontrarUsuarioPeloId } = require("../repositorios/usuarios");

const conferirLogado = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      mensagem:
        "Para acessar este recurso um token de autenticação válido deve ser enviado.",
    });
  }  
  const token = req.headers.authorization.split(" ")[1];
  try {
    const { id } = verify(token, senhaToken);
    const { rows: usuariosCadastrados, rowCount } =
      await encontrarUsuarioPeloId(id);
    if (rowCount === 0) {
      return res
        .status(401)
        .json({
          mensagem:
            "Para acessar este recurso um token de autenticação válido deve ser enviado.",
        });
    }
    req.usuarioCadastrado = usuariosCadastrados[0];
    next();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
};

module.exports = conferirLogado;
