const application = require('./Server');

application.listen(process.env.PORT || 8082, () =>{
    console.log("Aplicação rodando em : http://localhost:8082/api/docs")
});

