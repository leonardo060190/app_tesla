const express = require('express');//importa a biblioteca express
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');//faz a conversão de JSON para javascript
const app = express();

const routes = require('./routes.js');

require('./database')

app.use(cors());
app.use(cookieParser());
app.use(express.json());// Configurando o express para aceitar JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);

app.listen(3001)
