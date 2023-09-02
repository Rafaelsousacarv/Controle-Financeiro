const pool = require("../config/conexaoBD");

const cadastrarUsuario = (dadosDoUsuario) => {
  const { nome, email, senhaCriptografada } = dadosDoUsuario;
  const usuarioCadastrado = pool.query(
    `
        INSERT INTO
	        usuarios (nome, email, senha)
        VALUES
	        ($1, $2, $3)
        RETURNING *
    `,
    [nome, email, senhaCriptografada]
  );
  return usuarioCadastrado;
};

module.exports = {
  cadastrarUsuario,
};
