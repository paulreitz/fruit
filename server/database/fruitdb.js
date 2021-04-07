const Pool = require('pg').Pool;
const config = require('./dbConfig');

class FruitDB {
    constructor() {
        this.pool = new Pool(config);
    }

    getFruit = () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT getFruit();';
            this.pool.query(query, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result.rows[0].getfruit);
            });
        });
    }

    getNutrientsList = () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT getNutrientsList();';
            this.pool.query(query, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result.rows[0].getnutrientslist);
            })
        });
    }

    addFruit = (data) => {
        return new Promise((resolve, reject) => {
            const nutrients = data.nutrients.map(n => {
                return `row(${n.id},${n.value})::nutrient_input`;
            });
            const query = `SELECT addFruit('${data.name}',${data.calories},${data.carbohydrate},${data.fiber},${data.sugar},${data.fat},${data.protein},ARRAY[${nutrients.join(',')}]);`;
            this.pool.query(query, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result.rows[0].addfruit);
            });
        });
    }

    updateFruit = (id, data) => {
        return new Promise((resolve, reject) => {
            const nutrients = data.nutrients.map(n => {
                return `row(${n.id},${n.value})::nutrient_input`;
            });
            const query = `SELECT updateFruit(${id},'${data.name}',${data.calories},${data.carbohydrate},${data.fiber},${data.sugar},${data.fat},${data.protein},ARRAY[${nutrients.join(',')}]);`;
            this.pool.query(query, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result.rows[0].updatefruit);
            })
        })
    }
}

module.exports = FruitDB;