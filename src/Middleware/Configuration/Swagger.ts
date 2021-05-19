const swaggerAutogen = require('swagger-autogen')()
const outputFile = './SwaggerOptions.json';

const routes = ['../../Serve.ts'];

swaggerAutogen(outputFile, routes).then(() => {
    require('../../Serve.ts')
})