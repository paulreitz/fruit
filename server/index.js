const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const publicPath = path.join(__dirname, '..', 'build');
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());

app.get('*', (__req, res) => {
    res.send({message: 'hello world'});
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});