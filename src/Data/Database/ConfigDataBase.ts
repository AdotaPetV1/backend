export const knex = require('knex')({
    client: 'mssql',
    connection: {
        host: 'localhost',
        user: 'damaris',
        password: '12345',
        database: 'DB_ADOTAPET', "options": {
            "enableArithAbort": true
        }
    }
});
//Teste