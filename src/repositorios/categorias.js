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

  const encontrarCategoriaPeloID = (id) => {
    const categoriaEncontradas = pool.query(
      `
          SELECT
              *
          FROM 
              categorias
          WHERE id = $1;        
      `,
      [id]
    );
    return categoriaEncontradas;
  };

  module.exports= {
    encontrarCategorias,
    encontrarCategoriaPeloID
  }