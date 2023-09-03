const { compare } = require('bcrypt')

const compararSenhas = (senha, senhaCriptografada) => {
    return compare(senha, senhaCriptografada)
}

module.exports = compararSenhas