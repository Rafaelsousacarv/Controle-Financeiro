const pool = require("../config/conexaoBD");

const encontrarCategorias = () => {
    const categoriasEncontradas = pool.query(
      `
        SELECT
            *
        FROM 
            categorias        
    `
    );
    return categoriasEncontradas;
  };

  module.exports= {
    encontrarCategorias
  }