//var symbol;
var symbolSize = 24;
var streams = []; // global variable to hold our stream

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background('#0D0208');
  var x = 0;
  var y = 0;
  for (let i = 0; i <= (width / symbolSize); i++) //width of screen/ pixel size of each character
  {
    var stream = new Stream() //creating a stream object
    stream.generateSymbols(x, random(-2000, 0));
    streams.push(stream); //array of streams
    x += symbolSize; // so it moves on to the next value of x 0->width of screen
  }
  textFont('Conslas');
  textSize(symbolSize); //set the value of text to 60px
}

function draw() {
  background('#0D0208') //To remove the trail so every time it renders again 60fps it has a black background 
  streams.forEach(stream => {
      stream.render();
    }

  )

}

//Initializing the Value + All the dirty work forya
function SymbolConstructor(x, y, speed, first, opacity) {
  this.x = x;
  this.y = y;
  this.value;
  this.speed = speed;
  this.opacity = opacity
  this.switchInterval = round(random(2, 25));
  this.first = first; //for making the first symbol white!!!

  // Random Katakana unicode generator
  this.setToRandomSymbol = function () {
    //adding numbers in between the Katakanas
    var charType = round(random(0, 5));

    // This is for Katakana to change (right now its chaging instantly) after a certain time namely when switchInterval divides frameCounter
    //(predefined in p5.js)
    if (frameCount % this.switchInterval == 0) {
      if (charType > 1) {
        this.value = String.fromCharCode(
          0x30A0 + floor(random(0, 97))
        ); //to include the 96 element
      } else {
        //set it to numeric
        this.value = floor(random(0, 10));
      }
    }
  }

  this.rain = function () {
    this.y = (this.y > height) ? 0 : this.y + this.speed;
  }
} // end of SymbolConstructor()

//stream of Char Array also a constructor function!!! for Array other was for each Katakana
function Stream() {
  this.symbolArr = []
  this.totalSymbols = round(random(5, 30)); //having variable stream of Katakanas between 5-30
  this.speed = random(5, 9);

  this.generateSymbols = function (x, y) {
    var first = ((round(random(0, 4)) == 1) ? true : false);

    for (var i = 0; i < this.totalSymbols; i++) {
      symbol = new SymbolConstructor(x, y, this.speed, first);
      symbol.setToRandomSymbol(); //this obj has a function setToRandomSymbol which which is being executed!
      this.symbolArr.push(symbol);
      y = y - symbolSize; // so the next stream is not render above this one!
      first = false; //treu for i =1 and then fakse for everything else!!
    }
  }
  this.render = function () {
    //looping through all of out symbols and call each of the elements iterating over the   Arr.forEach(()=>{})
    // + symbol is a placeholder Value for every index iteration in for each it could be xyz too!
    this.symbolArr.forEach(symbol => {
      if (symbol.first) {
        fill(180, 255, 180);
      } else {
        fill(0, 255, 150);
      }
      text(symbol.value, symbol.x, symbol.y);
      // function causing the motion you can also use this.rain since this refers to symbol only
      symbol.rain();
      // changing the symbol during the motion
      symbol.setToRandomSymbol();
    });

  }
}