const repositorioTransacoes = require("../repositorios/transacoes");

const listarTransacao = async (req, res) => {
  try {
    const { rows: transacoesEncontradas } = await repositorioTransacoes.encontrarTransacoesPeloID(
      req.usuarioCadastrado.id
    );
    return res.status(200).json(transacoesEncontradas);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
};

const cadastrarTransacao = async (req, res) => {
  const { descricao, valor, data, categoria_id, tipo } = req.body;
  if (!descricao || !valor || !data || !categoria_id || !tipo) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos são obrigatórios" });
  }
  try {
    const dadosTransacao = { descricao, valor, data, categoria_id, tipo, usuario_id: req.usuarioCadastrado.id };
    const { rows: transacoesCadastrados } =
      await repositorioTransacoes.cadastrarTransacao(dadosTransacao);
    return res.status(201).json(transacoesCadastrados[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
};

module.exports = {
  listarTransacao,
  cadastrarTransacao,
};
