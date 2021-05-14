export const knex = require('knex')({
    client: 'mssql',
    connection:{
        host: 'SEU_HOST',
        user: 'SEU_USER',
        password: 'SUA_SENHA',
        database: 'adota_pet',"options": {
            "enableArithAbort": true,
            "encrypt": true
        }
    }
});
