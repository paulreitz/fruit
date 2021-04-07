const FruitDB = require('../database/fruitdb');

class FruitController {
    constructor(router) {
        this.fruitDB = new FruitDB();
        router.route('/fruit').get(this.getFruit);
        router.route('/nutrients').get(this.getNutrients);
        router.route('/fruit').post(this.addFruit);
        router.route('/fruit/:id').post(this.updateFruit);
    }

    getFruit = (__req, res) => {
        this.fruitDB.getFruit()
        .then(result => {
            res.send(result);
        })
    }

    getNutrients = (__req, res) => {
        this.fruitDB.getNutrientsList()
        .then(result => {
            res.send(result);
        })
    }

    addFruit = (req, res) => {
        this.fruitDB.addFruit(req.body)
        .then(result => {
            res.send(result);
        });
    }

    updateFruit = (req, res) => {
        this.fruitDB.updateFruit(req.params.id, req.body)
        .then(result => {
            res.send(result);
        });
    }
}

module.exports = FruitController;