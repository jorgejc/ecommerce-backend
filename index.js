const express = require('express');
const { getConnection } = require('./bd/db-connect-mongo');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT; 

app.use(cors());

getConnection();

app.use(express.json());

app.use('/vendedor', require('./router/vendedor'));
app.use('/marca', require('./router/marca'));
app.use('/categoria', require('./router/categoria'));
app.use('/producto', require('./router/producto'));

app.listen(port, () => { //empieza a escuchar peticiones http a través de un recurso o una url
    console.log(`Example app listening on port ${port}`)
});