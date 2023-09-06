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
    [id]);
    return transacoesEncontradas;
  };

  const cadastrarTransacao = (dadosTransacao) => {
    const { descricao, valor, data, categoria_id, tipo, usuario_id } = dadosTransacao;
    const transacaoCadastrada = pool.query(
      `
          INSERT INTO
              transacoes (descricao, valor, data, categoria_id, tipo, usuario_id)
          VALUES
              ($1, $2, $3, $4, $5, $6)
          RETURNING *
      `,
      [ descricao, valor, data, categoria_id, tipo, usuario_id ]
    );
    return transacaoCadastrada;
  }

  module.exports= {
    encontrarTransacoesPeloID,
    cadastrarTransacao
  }