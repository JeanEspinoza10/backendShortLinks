const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

url_base = '/api/v1';
path_app = './app/';

const app = express();

app.use(express.json());

app.use(cors());


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