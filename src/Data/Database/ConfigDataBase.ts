export const knex = require('knex')({
    client: 'mssql',
    connection:{
        host: 'adotapet.database.windows.net',
        user: 'lucas.vilas',
        password: 'Luc@sVil@s1407',
        database: 'adota_pet',"options": {
            "enableArithAbort": true,
            "encrypt": true
        }
    }
});
//Teste