const application = require('./Server');

application.listen(process.env.PORT || 8080, () =>{
    console.log("Aplicação rodando em : http://localhost:8080/api/docs")
});

