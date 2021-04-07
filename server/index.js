// const path = require('path');
const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
const cors = require('cors');
const FruitController = require('./controllers/FruitController');

const router = express.Router();
// const publicPath = path.join(__dirname, '..', 'build');
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

const __fruitController = new FruitController(router);

app.use('/api', router);

app.get('*', (__req, res) => {
    res.send({message: 'hello world'});
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});