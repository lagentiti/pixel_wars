const express = require('express');
const fs = require('fs');
const colors = require('colors');
const config = require('./config.js');

const app = express();

fs.readdir("./apis/", (err, files) => {
  if(err) {
    console.error(colors.red(err));
    return;
  };
  for(i=0;i<=files.length-1;i++) {
    if(files[i].split('.')[1] == "js") {
      app.use(require(`./apis/${files[i]}`));
      console.log(colors.green(files[i] + " Charger"));
    };
  };
});


fs.readdir("./pages/", (err, files) => {
  if(err) {
    console.error(colors.red(err));
    return;
  };
  for(i=0;i<=files.length-1;i++) {
    if(files[i].split('.')[1] == "js") {
      app.use(require(`./pages/${files[i]}`));
      console.log(colors.green(files[i] + " Charger"));
    };
  };
});


app.listen(config.express.port, () => {
  console.log(colors.green(`Your app is listening on port 80`));
});