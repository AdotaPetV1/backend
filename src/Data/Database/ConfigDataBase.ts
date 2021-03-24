export const knex = require('knex')({
    client: 'mssql',
    connection:{
        host: 'localhost',
        user: 'sa',
        password: '123456',
        database: 'DB_ADOTAPET',"options": {
            "enableArithAbort": true
        }
    }
});