const apis = require('express').Router();
const config = require('../config.js');
const mysql = require('mysql');

const connection = mysql.createPool({
  host     : config.mysql.connection.host,
  user     : config.mysql.connection.user,
  password : config.mysql.connection.password,
  database : config.mysql.connection.bdd
});

apis.get('/api/sendPixelPosition/:x/:y/:color', async (req, res) => {
  var x = req.params.x;
  var y = req.params.y;
  var color = req.params.color;
  connection.query("SELECT * FROM `pixel` WHERE `x` = '"+x+"' AND  y = '"+y+"'", function (error, results, fields) {
    if(error) return error;
    if(results[0] == undefined) {
      connection.query("INSERT INTO `pixel`(`x`, `y`, `color`) VALUES ('"+x+"','"+y+"','"+color+"')");
    } else {
      connection.query("UPDATE `pixel` SET `color`='"+color+"' WHERE `x` = '"+x+"' AND `y` = '"+y+"'");
    };
    return res.send({message:1});
  });

});

module.exports = apis;