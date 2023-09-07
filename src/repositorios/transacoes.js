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

module.exports = {
  encontrarTransacoesPeloID,
  cadastrarTransacao,
  detalharTransacoesPeloID,
};
