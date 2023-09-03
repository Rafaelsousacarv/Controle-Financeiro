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

const encontrarUsuarioPeloEmail = (email) => {
  const usuarioEncontrado = pool.query(
    `
      SELECT
          id, nome, email, senha
      FROM 
          usuarios
      WHERE
          email = $1;
  `,
    [email]
  );
  return usuarioEncontrado;
};

const encontrarUsuarioPeloId = (id) => {
  const usuarioEncontrado = pool.query(
    `
      SELECT
          id, nome, email
      FROM 
          usuarios
      WHERE
          id = $1;
  `,
    [id]
  );
  return usuarioEncontrado;
};

module.exports = {
  cadastrarUsuario,
  encontrarUsuarioPeloEmail,
  encontrarUsuarioPeloId,
};
