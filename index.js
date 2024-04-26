import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

const app = express();

// Conectar a la db
db.authenticate()
    .then( () => console.log('BD conectada ')) 
    .catch( error => console.log(error))

const port = process.env.PORT || 3000;

// Habilitar PUG 
app.set('view engine', 'pug');

// Obtener el año actual
app.use( (req, res, next) => {

    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia de Viajes";
    next();
})

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

// Definir la carpeta public
app.use(express.static('public'));

// Agregar router
app.use('/', router);

app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
})