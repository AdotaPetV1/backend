export const knex = require('knex')({
    client: 'mssql',
    connection:{
        host: 'adotapet.database.windows.net',
        user: '',
        password: '',
        database: 'adota_pet',"options": {
            "enableArithAbort": true,
            "encrypt": true
        }
    }
});
