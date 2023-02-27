const apis = require('express').Router();
const config = require('../config.js');
const mysql = require('mysql');

const connection = mysql.createPool({
  host     : config.mysql.connection.host,
  user     : config.mysql.connection.user,
  password : config.mysql.connection.password,
  database : config.mysql.connection.bdd
});

apis.get('/api/getPixelPosition/', async (req, res) => {
  connection.query("SELECT * FROM `pixel`", function (error, results, fields) {
    if(error) return error;
    if(results[0] !== undefined) {
      var list = [];
      for(i=0;i<=results.length-1;i++) {
        list.push({id:results[i].id,x:results[i].x,y:results[i].y,color:results[i].color});
      };
      return res.send({message: list});
    } else {
      return res.send({message: 0});
    };
  });
});

module.exports = apis;