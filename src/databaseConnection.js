const mongoose = require ('mongoose');

mongoose.set('useCreateIndex', true); //ignore deprecated

const bdConnect = async () =>{
    let error = null
    await mongoose.connect('mongodb://localhost/foro',
        { useNewUrlParser: true,
          useUnifiedTopology: true
        }) .catch(err => {error = err}) // atrapa el error y guarda en "error"
       
        if(error) {console.log("ERROR CONNECTING DATABASE: ", error)} // si error no es null(pasó por el catch) muestra el error
         else console.log("BD CONNECTED OK") //si no hubo error muestra connected ok
    }

    module.exports = {bdConnect};