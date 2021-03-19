// Model (usually gets data from database, in this case data is hard coded)
'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();

const getAllCats = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM wop_cat');
    console.log('somenthing back from db', rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

const getAllCatsSort = async (order) => {
  try {
    const [rows] = await promisePool.query(`SELECT * FROM wop_cat ORDER BY ${order}`);
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

const insertCat = async (cat) => {
  const [row] = await promisePool.execute( `INSERT INTO wop_cat (name, age, weight, owner, filename) 
  VALUES (?,?,?, \'1\', \'foo.jpg\')`, [cat.name, cat.age, cat.weight], (err, result, meta) => {
    console.log('insert?', row);
    return row.insertId;
  });
}

/*
const cats = [
  {
    id: '1',
    name: 'Frank',
    age: '6',
    weight: '5',
    owner: '1',
    filename: 'http://placekitten.com/400/300',
  },
  {
    id: '2',
    name: 'James',
    age: '4',
    weight: '11',
    owner: '2',
    filename: 'http://placekitten.com/400/302',
  },
];
*/

module.exports = {
  getAllCats,
  getAllCatsSort,
  insertCat,
};