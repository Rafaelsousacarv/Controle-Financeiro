const { encontrarCategorias } = require("../repositorios/categorias");

const listarCategorias = async (req, res) => {
    try {
        const { rows: categoriasEncontradas } = await encontrarCategorias()
        return res.status(200).json(categoriasEncontradas)
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: "Erro interno no servidor" })
    }
}


module.exports= { 
    listarCategorias
}