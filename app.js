const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;
const router_user = require('./route/user');
const router_board = require('./route/board');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use('/user', router_user);
app.use('/board', router_board);

app.listen(port, () => {
    console.log('Broker API is listening on port'+port);
});