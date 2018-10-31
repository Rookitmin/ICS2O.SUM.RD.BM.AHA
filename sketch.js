function setup() {
  createCanvas(400, 400);
  background(220);
}
var scroll = [0, 0];
var scene = 1;
var inGame = false;
var difficulty = 1;
//scene number 
var pauseScreen = 99;
var mainMenu = 1;
var settings = 2;
var CPUSelect = 3;

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
    if (scene === this.scene) {
    	fill(0, 102, 102);
  		rect(this.x, this.y, this.width, this.height);
    	fill(0, 0, 0);
  		text(this.words, this.x + 5, this.y + 5, 
      	 this.x + this.width - 10, 
      	 this.y + this.height - 10);
    }
    this.hovering = false;
  }

}

var buttonMenu1 = new button (10, 10, 75, 20, settings, "Main Menu");
var buttonMenu2 = new button (10, 10, 75, 20, CPUSelect, "Main Menu");
var buttonStart1 = new button (10, 50, 100, 40, mainMenu, "Start");
var buttonSettings1 = new button (10, 100, 120, 40, mainMenu, "Settings");
var buttonDifficulty1 = new button (20, 50, 75, 30, settings, "Difficulty");
var buttonDifficulty2 = new button (20, 50, 75, 30, pauseScreen, "Difficulty");
var HardCpu = new button (30, 150, 75, 30, CPUSelect, "Hard");
var MediumCpu = new button (30, 100, 75, 30, CPUSelect, "Medium");
var EasyCpu = new button (30, 50, 75, 30, CPUSelect, "Easy");
var Back1 = new button (325, 10, 50, 20, settings, "back");
var Back2 = new button (325, 10, 50, 20, CPUSelect, "back");

function draw() {
  if (inGame) {
  	background(220);
  }
  else {
    background(220);
    textSize(12);
    buttonMenu1.hover();
    buttonMenu2.hover();
		Back1.hover();
		Back2.hover();
    textSize(30);
    buttonStart1.hover();
    buttonSettings1.hover();
    textSize(16);
    buttonDifficulty1.hover();
    buttonDifficulty2.hover();
		HardCpu.hover();
		MediumCpu.hover();
		EasyCpu.hover();
  }
}
function mousePressed () {
	if (!inGame) {
  	if (buttonMenu1.hovering || buttonMenu2.hovering) {
      scene = mainMenu;
  	}
    if (buttonSettings1.hovering) {
      scene = settings;
    }
    if (buttonDifficulty1.hovering || buttonDifficulty2.hovering) {
      scene = CPUSelect;
    }
		if (HardCpu.hovering) {
			scene = settings;
			difficulty = 3;
		}
		if (MediumCpu.hovering) {
			scene = settings;
			difficulty = 2;
		}
		if (EasyCpu.hovering) {
			scene = settings;
			difficulty = 1;
		}
		if (Back1.hovering) {
			scene = mainMenu;
		}
		if (Back2.hovering) {
			scene = settings;
		}
  }
}
