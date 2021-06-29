const swaggerAutogen = require('swagger-autogen')()
const outputFile = 'SwaggerOptions.json';

const routes = ['./src/Server.ts'];

const docs = {
    
        "swagger": "2.0",
        "info": {
          "version": "1.0.0",
          "title": "Adota Pet API",
          "description": "Documentação da API do AdotaPet"
        },
        "host": "http://localhost:8080/api",
        "basePath": "/",
        "tags": [],
        "schemes": [
          "http"
        ],
        "components": {
          "securitySchemes":{
              "bearerAuth": {
                  "type": "http",
                  "scheme": "bearer", 
                  "bearerFormat": "JWT"
              }
          }
      },
}

swaggerAutogen(outputFile, routes, docs).then(() => {
    require('./src/Server.ts')
})