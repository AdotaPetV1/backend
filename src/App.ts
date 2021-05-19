const application = require('./Server');

application.listen(8080, () =>{
    console.log("Aplicação rodando em : http://localhost:8080/api/docs")
});

