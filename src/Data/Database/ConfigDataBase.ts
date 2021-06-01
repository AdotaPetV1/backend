export const knex = require('knex')({
    client: 'mssql',
    connection:{
        host: 'den1.mssql7.gear.host',
        user: 'adotapet',
        password: 'Am537_Bh~vlb',
        database: 'adotapet',"options": {
            "enableArithAbort": true,
            "encrypt": true,
            "trustServerCertificate": true
        }
    }
});
