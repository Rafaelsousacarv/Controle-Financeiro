const { userBd, hostBd, databaseBd, passwordBd, portBd } = require('../../dadosSensiveis')
const { Pool } = require('pg')

const pool = new Pool({
	host: hostBd,
	port: portBd,
	user: userBd,
	password: passwordBd,
	database: databaseBd,
})

module.exports = pool
