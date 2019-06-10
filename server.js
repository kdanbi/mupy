const express = require('express'); //initialize Express
const app = express(); //initialize Express
const cors = require('cors'); //give right to access API
const serverRoutes = require('./routes/server-routes'); //accessing video-routes under routes folder and calling it videoRoutes
const port = 8080;

app.use(express.urlencoded({ extended: false })); //app.use how we register middleware
app.use(express.json());
app.use(express.static('assets')); //lets Express know where to serve static content form
app.use(cors());

app.use('/', serverRoutes); //mounting routers to middleware

app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
}); 