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

const cadastrarTransacao = (dadosDaTransacao) => {
  const { senhaCriptografada, descricao, valor, data, categoria_id, tipo, usuario_id } = dadosDaTransacao;
  const transacaoCadastrada = pool.query(
    `
        INSERT INTO
          transacoes (senhaCriptografada,descricao, valor, data, categoria_id, tipo, usuario_id)
        VALUES
          ($1, $2, $3, $4, $5, $6,$7)
        RETURNING *
    `,
    [senhaCriptografada, descricao, valor, data, categoria_id, tipo, usuario_id]
  );
  return transacaoCadastrada;

}
const atualizarTransacao = (dadosAtualizados) => {
  const { descricao, valor, data, categoria_id, tipo, usuario_id, id } = dadosAtualizados;
  const cadastroAtualizado = pool.query(

    `UPDATE transacoes 
   SET descricao = $1 ,
   valor = $2,
   data = $3,
   categoria_id = $4,
   tipo = $5
   WHERE usuario_id = $6 and id = $7
  ($1, $2,$3,$4,$5,$6,$7)
  RETURNING *
`,
    [descricao, valor, data, categoria_id, tipo, usuario_id, id]
  );

  return cadastroAtualizado
}

module.exports = {
  cadastrarUsuario,
  encontrarUsuarioPeloEmail,
  encontrarUsuarioPeloId,
  atualizarUsuario,
  cadastrarTransacao,
  atualizarTransacao,
};
