import knex from 'knex';
import path from 'path';

// Configuração de banco de dados.
const connection  = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite'), // essa função une caminhos. ex.: 'database', index.js retorna.: database/index.js
    },
    useNullAsDefault: true,
});

export default connection;