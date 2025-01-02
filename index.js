const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');
dotenv.config();

const url_base = '/api/v1';
const path_app = './app/';
const swaggerSpec = {
    definition: {
        openapi: '3.0.0',
        info : {
            title: 'ShortLinks',
            version: '1.0.0',
            description: 'API REST para el servicio de Acortador de Links',
        },
    },
    apis : [
        `${path.join(__dirname, './app/routes/*.js')}`,
    ]
}

const app = express();


// Middlewares
app.use(express.json());
app.use(cors());

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerJSDoc(swaggerSpec)
));


// Routes
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} ======================>>>>>>>>>>>>>>>>>>`);
    console.log(`Headers: ${JSON.stringify(req.headers)}`);
    console.log(`IP: ${req.ip}`);
    next(); 
});

app.use(
    '/',
    require( path_app + 'routes/paths')
)

app.get('/', (req, res) => {
    res.redirect('/api-docs');
});

app.use(
    url_base + '/users',
    require( path_app + 'routes/users')
)

app.use(
    url_base + '/roles',
    require( path_app + 'routes/roles')
)

app.use(
    url_base + '/links',
    require( path_app + 'routes/links')
)

// Routes Free

app.use(
    url_base + '/free',
    require( path_app + 'routes/free')
)


app.listen(process.env.PORT, ()=> {
    console.log('Servidor corriendo en puerto: ', process.env.PORT);
})