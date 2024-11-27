const express = require('express');
const app = express();
const port = 3000; 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const conx=require('./conifg/bd')
const user=require('./models/User')

const user_router=require('./routes/user_route');


// creation de modele user
user();

const logger=(req,res,next)=>{
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    console.log(`[${date} ${time} ] ${req.method} ${req.path}`)
    next();
}

app.use(logger);


app.use('/api/user',user_router);

app.listen(port, () => {
    conx();
    console.log(`Application exemple à l'écoute sur le port ${port}!`);
});
