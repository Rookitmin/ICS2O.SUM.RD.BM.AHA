function setup() {
  createCanvas(400, 400);
  background(220);
}
var scroll = [0, 0];
var scene = 2;
var inGame = false;
function button (x, y, width, height, scene, text)  {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.scene = scene;
  this.words = text;
  this.hovering = false;
}
button.prototype.draw = function () {
  fill(0, 102, 102);
  rect(this.x, this.y, this.width, this.height);
  fill(0, 0, 0);
  text(this.words, this.x + 5, this.y + 5, 
       this.x + this.width - 10, 
       this.y + this.height - 10);
}
button.prototype.hover = function () {
  if (this.x < mouseX && this.y < mouseY && 
      this.x + this.width > mouseX && this.y + this.height > mouseY && 
      scene === this.scene) {
    fill(102, 102, 0);
  	rect(this.x, this.y, this.width, this.height);
    fill(0, 0, 0);
  	text(this.words, this.x + 5, this.y + 5, 
       this.x + this.width - 10, 
       this.y + this.height - 10);
    this.hovering = true;
  } 
  else {
    if (scene === this.scene)
    	fill(0, 102, 102);
  		rect(this.x, this.y, this.width, this.height);
    	fill(0, 0, 0);
  		text(this.words, this.x + 5, this.y + 5, 
      	 this.x + this.width - 10, 
      	 this.y + this.height - 10);
  }
  this.hovering = false;
}

var buttonMenu1 = new button (10, 10, 75, 20, 2, "Main Menu");
var buttonMenu2 = new button (100, 10, 75, 20, 3, "Main Menu");
function draw() {
  if (inGame) {
  	background(220);
  }
  else {
    buttonMenu1.hover();
  }
  print(buttonMenu1.hovering);
}
function mousePressed () {
	if (!inGame) {
  	if (buttonMenu1.hovering) {
      scene = 1;
  	  buttonMenu1.draw();
  	}
  }
}
