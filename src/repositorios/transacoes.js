const pool = require("../config/conexaoBD");

const encontrarTransacoesPeloID = (id) => {
  const transacoesEncontradas = pool.query(
    `
        SELECT
            *
        FROM 
            transacoes
        WHERE usuario_id = $1;        
    `,
    [id]
  );
  return transacoesEncontradas;
};

const cadastrarTransacao = (dadosTransacao) => {
  const { descricao, valor, data, categoria_id, tipo, usuario_id } =
    dadosTransacao;
  const transacaoCadastrada = pool.query(
    `
          INSERT INTO
              transacoes (descricao, valor, data, categoria_id, tipo, usuario_id)
          VALUES
              ($1, $2, $3, $4, $5, $6)
          RETURNING *
      `,
    [descricao, valor, data, categoria_id, tipo, usuario_id]
  );
  return transacaoCadastrada;
};

const detalharTransacoesPeloID = (usuario_id, transacao_id) => {
  const transacoesEncontradas = pool.query(
    `
    SELECT 
         tr.id, tr.tipo, tr.descricao, tr.valor, tr.data, tr.usuario_id, tr.categoria_id, ca.descricao categoria_nome
    FROM 
        transacoes tr join categorias ca 
    on
        tr.categoria_id = ca.id
    where
        usuario_id = $1 and tr.id = $2;
     `,
    [usuario_id, transacao_id]
  );
  return transacoesEncontradas;
};

const atualizarTransacaoPeloID = (transacao_id, dadosTransacao) => {
  const { descricao, valor, data, categoria_id, tipo, usuario_id } =
    dadosTransacao;
  const transacaoAtualizada = pool.query(
    `
      UPDATE transacoes
        SET descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5, usuario_id = $6
      WHERE id = $7
      `,
    [descricao, valor, data, categoria_id, tipo, usuario_id, transacao_id]
  );
  return transacaoAtualizada;
};

const deletarTransacaoPeloID = (id) => {
  const transacaoDeletada = pool.query(
    `
        DELETE FROM 
            transacoes
        WHERE id = $1;        
    `,
    [id]
  );
  return transacaoDeletada;
};

module.exports = {
  encontrarTransacoesPeloID,
  cadastrarTransacao,
  detalharTransacoesPeloID,
  atualizarTransacaoPeloID,
  deletarTransacaoPeloID
};
