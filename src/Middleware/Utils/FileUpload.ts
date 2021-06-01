const multer = require('multer');

module.exports = (multer({
    
   storage: multer.diskStorage({
     
       // Qual deve ser o destino deles?
       destination: (req : Request, file: File, cb: any) => {
           cb(null, '../Images');
       },
       

       filename: (req : Request , file: any, cb: any) => {

           cb(null, Date.now().toString() + '-' + file.name);
           
       }
       
   }), 
}));