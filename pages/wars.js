const pages = require('express').Router();
const config = require('../config.js');

pages.get('/wars', async (req, res) => {
  var colorButton = ``;
  
  for(i=0;i<=config.colors.length-1;i++) {
    var colorButton = colorButton + `<button style="background-color: #${config.colors[i]};" onclick="changeColor('${config.colors[i]}')"></button>`;
  };
  
  res.send(`
    <style>
      * {
        padding: 0;
        margin: 0;
      }
      button {
        width: 50px;
        height: 50px;
        border: none;
        cursor: pointer;
      }
      #myCanvas {
        border: 10px solid black;
      }
    </style>
    <canvas id="myCanvas" width="600" height="600"></canvas>
    <div id="tools">
      <div id="colors">${colorButton}</div>
    </div>
    <input id="colorinput" style="display: none;" value="000">
    <script>
      let config = ${JSON.stringify(config)};
    
      let canvas = document.getElementById("myCanvas");
      let ctx = canvas.getContext("2d");
      
      let width = canvas.width; 
      let cellSize = 10;

      function getJsonData() {
        let result = fetch('http://localhost:8081/api/getPixelPosition/')
        .then(res => res.json())
        .then(data => {
          for(i=0;i<=data.message.length-1;i++) {
            ctx.fillStyle = "#"+data.message[i].color;
            ctx.fillRect(data.message[i].x, data.message[i].y, 10, 10);
          };
        });
        return result;
      };

      function sendJsonData(x, y, color) {
        let result = fetch('http://localhost:8081/api/sendPixelPosition/'+x+'/'+y+'/'+color)
        .then(res => res.json())
        .then(data => {
          if(data == 0) return console.log("0");
        });
        return result;
      };

      function cooldawn() {
        
      };

      function changeColor(color) {
        for(i=0;i<=config.colors.length-1;i++) {
          if(color == config.colors[i]) {
            document.getElementById("colorinput").value = config.colors[i];
          };
        };
      };

      function getMousePos(canvas, evt) { 
        let rect = canvas.getBoundingClientRect(); 
        return { 
          x: evt.clientX - rect.left, 
          y: evt.clientY - rect.top,
        }; 
      };
      
      for(x=0;x<width;x+=cellSize) { 
        ctx.strokeStyle = "rgba(0, 0, 0, 0)"; 
        ctx.lineWidth = 0.5; 
        ctx.beginPath(); 
        ctx.moveTo(x, 0); 
        ctx.lineTo(x, width); 
        ctx.stroke(); 
      };
        
      for (y=0;y<=width;y+=cellSize) { 
        ctx.strokeStyle = "rgba(0, 0, 0, 0)"; 
        ctx.lineWidth = 0.5; 
        ctx.beginPath(); 
        ctx.moveTo(0, y); 
        ctx.lineTo(width, y); 
        ctx.stroke(); 
      };
      
    
      canvas.addEventListener('click', (evt) => { 
        let position = getMousePos(canvas, evt); 
        let x = Math.floor(position.x/10); 
        let y = Math.floor(position.y/10); 
        ctx.fillStyle = "#"+document.getElementById("colorinput").value; 
        ctx.fillRect(x*10,y*10, 10, 10);
        ctx.shadowColor = "none";
        sendJsonData(x*10,y*10,document.getElementById("colorinput").value)
      });

    // setInterval(getJsonData(), 0.1);
    getJsonData()
    </script>
  `);
});

module.exports = pages;