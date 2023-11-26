const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send({msg: 'Good to go!!!'});
});

app.listen(8000);