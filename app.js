const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;
const router_user = require('./route/user');

app.use(express.json());
app.use(cors());
app.use('/user', router_user);

app.listen(port, () => {
    console.log('Broker API is listening on port'+port);
});