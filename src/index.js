const express = require ('express');
const morgan = require ('morgan');

const app = express();

//config
app.set('port', process.env.PORT || 3000);


//middlewares
app.use(morgan('dev'))
app.use(express.json())

//bd connect
require ('./databaseConnection').bdConnect(); 

//routes
app.use(require('./routes/user.routes'))
app.use(require('./routes/auth.routes'))
app.use(require('./routes/posts.routes'))

 //cear roles
 require('./libs/initialSetup').createRoles();

 //server up
app.listen(app.get('port'), ()=>{
    console.log(`Waiting for connections at port ${app.get('port')}`);
})