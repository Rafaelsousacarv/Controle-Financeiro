const repositorioTransacoes = require("../repositorios/transacoes");
const repositorioCategorias = require("../repositorios/categorias");

const listarTransacao = async (req, res) => {
  try {
    const { rows: transacoesEncontradas } =
      await repositorioTransacoes.encontrarTransacoesPeloID(
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
    const { rowCount } =
      await repositorioCategorias.encontrarCategoriaPeloID(
        categoria_id
      );
      if (rowCount === 0) {
        return res.status(404).json({ mensagem: "Categoria não encontrada." });
      }
    const dadosTransacao = {
      descricao,
      valor,
      data,
      categoria_id,
      tipo,
      usuario_id: req.usuarioCadastrado.id,
    };
    const { rows: transacoesCadastrados } =
      await repositorioTransacoes.cadastrarTransacao(dadosTransacao);
    return res.status(201).json(transacoesCadastrados[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
};

const detalharTransacao = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows: transacoesEncontradas, rowCount } =
      await repositorioTransacoes.detalharTransacoesPeloID(
        req.usuarioCadastrado.id,
        id
      );
    if (rowCount === 0) {
      return res.status(404).json({ mensagem: "Transação não encontrada." });
    }
    return res.status(200).json(transacoesEncontradas[0]);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
};

const atualizarTransacao = async (req, res) => {
  const { id } = req.params;
  const { descricao, valor, data, categoria_id, tipo } = req.body;
  if (!descricao || !valor || !data || !categoria_id || !tipo) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos são obrigatórios" });
  }
  try {
      const { rowCount: countTransacoes } =
      await repositorioTransacoes.detalharTransacoesPeloID(
        req.usuarioCadastrado.id,
        id
      );
    if (countTransacoes === 0) {
      return res.status(404).json({ mensagem: "Transação não encontrada." });
    }
    const { rowCount: countCategorias } =
    await repositorioCategorias.encontrarCategoriaPeloID(
      categoria_id
    );
    if (countCategorias === 0) {
      return res.status(404).json({ mensagem: "Categoria não encontrada." });
    }
    const dadosTransacao = {
      descricao,
      valor,
      data,
      categoria_id,
      tipo,
      usuario_id: req.usuarioCadastrado.id,
    };
      await repositorioTransacoes.atualizarTransacaoPeloID(id, dadosTransacao);
    return res.status(204).send();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
};

module.exports = {
  listarTransacao,
  cadastrarTransacao,
  detalharTransacao,
  atualizarTransacao,
};
