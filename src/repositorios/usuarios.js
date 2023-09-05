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

const atualizarUsuario = (dadosDoUsuario) => {
  const { nome, email, senhaCriptografada, id } = dadosDoUsuario;
  const usuarioAtualizado = pool.query(
    `
        UPDATE usuarios 
        SET nome = $1, email = $2, senha = $3
        WHERE id = $4
    `,
    [nome, email, senhaCriptografada, id]
  );
  return usuarioAtualizado;
};

module.exports = {
  cadastrarUsuario,
  encontrarUsuarioPeloEmail,
  encontrarUsuarioPeloId,
  atualizarUsuario,
};
