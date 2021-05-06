export const knex = require('knex')({
    client: 'mssql',
    connection: {
        host: '',
        user: '',
        password: '123456',
        database: 'DB_ADOTAPET', "options": {
            "enableArithAbort": true
        }
    }
});
//Teste