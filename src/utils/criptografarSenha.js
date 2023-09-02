const { hash } = require("bcrypt");

const criptograrSenha = (senha) => {
  const senhaCriptografada = hash(senha, 10);
  return senhaCriptografada;
};

module.exports = criptograrSenha;
