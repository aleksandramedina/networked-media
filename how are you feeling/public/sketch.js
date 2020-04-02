// let data = [
//   {"person":"aleksandra","mood":"moodOne"},
//   {"person":"shawn","mood":"moodTwo"},
//   {"person":"cezar","mood":"moodThree"},
//   {"person":"ty","mood":"moodFour"},
//   {"person":"shawn","mood":"moodFive"},
//   {"person":"cezar","mood":"moodSix"},
//   {"person":"ty","mood":"moodSeven"}
// ];

let data = [];
let position = [];

let imgHalo;
let imgFlushed;
let imgAlien;
let imgNerd;
let imgSneezing;
let imgUnicorn;
let imgShrug;

let x;
let y;

function preload() {
  imgHalo = loadImage('images/halo-face.png');
  imgFlushed = loadImage('images/flushed-face.png');
  imgAlien = loadImage('images/extraterrestrial-alien.png');
  imgNerd = loadImage('images/nerd-face.png');
  imgSneezing = loadImage('images/sneezing-face.png');
  imgUnicorn = loadImage('images/unicorn-face.png');
  imgShrug = loadImage('images/woman-shrugging.png');
}

function loadData() {

	fetch('/data')
	  .then((response) => {
		return response.json();
	  })
	  .then((incoming) => {
		console.log("*****");
		console.log(incoming);
		data = incoming.thedata;
    })
    for (var i=0; i<data.length; i++){
       position.push ({x: random(0,360), y: random(0,360)})
     }
     console.log ("position is: " + position);
     background('blue');

     for (let i = 0; i < data.length; i++) {
         if (data[i].mood == "🤧"){
         image(imgSneezing, position[i].x,position[i].y);
         }
         else if (data[i].mood == "🤓"){
         image(imgNerd, position[i].x,position[i].y);
         }
         else if (data[i].mood == "👽"){
         image(imgAlien, position[i].x,position[i].y);
         }
         else if (data[i].mood == "🦄"){
         image(imgUnicorn, position[i].x,position[i].y);
         }
         else if (data[i].mood == "😳"){
         image(imgFlushed, position[i].x,position[i].y);
         }
         else if (data[i].mood == "😇"){
         image(imgHalo, position[i].x,position[i].y);
         }
         else if (data[i].mood == "🤷🏻‍"){
         image(imgShrug, position[i].x,position[i].y);
         }
     }

}

setTimeout(loadData, 10000);

function setup() {
  createCanvas(500, 500);
  loadData();
  console.log(data);




}

setTimeout(loadData, 1000);

function draw() {




}
