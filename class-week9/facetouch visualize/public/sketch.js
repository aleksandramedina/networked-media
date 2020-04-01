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

let imgHalo;
let imgFlushed;
let imgAlien;
let imgNerd;
let imgSneezing;
let imgUnicorn;
let imgShrug;

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
}

setTimeout(loadData, 10000);

function setup() {
  createCanvas(500, 500);
  loadData();
  print(data);


}

function draw() {
  background('blue');

  for (let i = 0; i < data.length; i++) {
      if (data[i].mood == "🤧"){
      let x = random (0,360);
      let y = random (0,360);
      image(imgSneezing, x,y);
      }
      else if (data[i].mood == "🤓"){
      let x = random (0,360);
      let y = random (0,360);
      image(imgNerd, x, y);
      }
      else if (data[i].mood == "👽"){
      let x = random (0,360);
      let y = random (0,360);
      image(imgAlien, x,y);
      }
      else if (data[i].mood == "🦄"){
      let x = random (0,360);
      let y = random (0,360);
      image(imgUnicorn, x,y);
      }
      else if (data[i].mood == "😳"){
      let x = random (0,360);
      let y = random (0,360);
      image(imgFlushed, x,y);
      }
      else if (data[i].mood == "😇"){
      let x = random (0,360);
      let y = random (0,360);
      image(imgHalo, x,y);
      }
      else if (data[i].mood == "🤷🏻‍"){
      let x = random (0,360);
      let y = random (0,360);
      image(imgShrug, x,y);
      }
  }



}
