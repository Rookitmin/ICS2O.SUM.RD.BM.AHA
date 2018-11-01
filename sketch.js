function setup() {
  createCanvas(400, 400);
  background(220);
}
// Basicly, these two variables control the way the
// system works, in way 1, or way 2. one of the ways will 
// always work
var v1 = false;
var v2 = true;
// an in-game ariable, controlling 
// where you are looking on the map.
var scroll = [0, 0];
// controlls what you see
var scene = 1;
var inGame = false;
// Changes the difficulty of the CPUs and the 
// color of the buttons
var difficulty = 1;
// Key Changing Variables
var keybinding = false;
var changeKey = 0;
var cycles = 0;
var P1 = {Up: 32, Down: 40, Left: 37, Right: 39, shoot: 77};
var P2 = {Up: 87, Down: 83, Left: 65, Right: 68, shoot: 82};

// creates genaralised button variables
function button (x, y, width, height, scene, text)  {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.scene = scene;
  this.words = text;
  this.hovering = false;
}
// conatins the code for drawing the buttons
button.prototype.draw = function () {
  fill(0, 102, 102);
  rect(this.x, this.y, this.width, this.height);
  fill(0, 0, 0);
  text(this.words, this.x + 5, this.y + 5, 
       this.x + this.width - 10, 
       this.y + this.height - 10);
}
// calls 
button.prototype.hover = function (lll) {
  if (this.x < mouseX && this.y < mouseY && 
      this.x + this.width > mouseX && this.y + this.height > mouseY && 
      scene === this.scene) {
		if (difficulty === 1) {
    	fill(102, 102, 0);
		}
		else if (difficulty === 2) {
			fill(102, 51, 10);
		}
		else {
			fill(102, 10, 10);
		}
		if (lll === 3) {
    	fill(102, 102, 0);
		}
		else if (lll === 2) {
			fill(102, 51, 10);
		}
		else if (lll === 1) {
			fill(102, 10, 10);
		}
  	rect(this.x, this.y, this.width, this.height);
    fill(255, 255, 255);
  	text(this.words, this.x + 5, this.y + 5, 
       this.width - 5, 
       this.height - 5);
    this.hovering = true;
  } 
  else {
    if (scene === this.scene) {
			if (difficulty === 1) {
				fill(0, 102, 102);
			}
			else if (difficulty === 2) {
				fill(10, 51, 102);
			}
			else {
				fill(10, 10, 102);
			}
			if (lll === 3) {
				fill(0, 102, 102);
			}
			else if (lll === 2) {
				fill(10, 51, 102);
			}
			else if (lll === 1) {
				fill(10, 10, 102);
			}
  		rect(this.x, this.y, this.width, this.height);
    	fill(255, 255, 255);
  		text(this.words, this.x + 5, this.y + 5, 
      	 this.width - 5, 
      	 this.height - 5);
    }
    this.hovering = false;
  }

}

var buttonMenu1 = new button (10, 10, 75, 25, 2, "Main Menu");
var buttonMenu2 = new button (10, 10, 75, 25, 3, "Main Menu");
var buttonMenu3 = new button (10, 10, 75, 25, 5, "Main Menu");
var buttonStart1 = new button (10, 50, 120, 40, 1, "Start");
var buttonSettings1 = new button (10, 100, 120, 40, 1, "Settings");
var buttonDifficulty1 = new button (20, 50, 75, 30, 2, "Difficulty");
// var buttonDifficulty2 = new button (20, 50, 75, 30, FillInTheBlank, "Difficulty");
var HardCpu = new button (30, 150, 75, 30, 3, "Hard");
var MediumCpu = new button (30, 100, 75, 30, 3, "Medium");
var EasyCpu = new button (30, 50, 75, 30, 3, "Easy");
var Back1 = new button (325, 10, 50, 20, 2, "back");
var Back2 = new button (325, 10, 50, 20, 3, "back");
var Back3 = new button (325, 10, 50, 20, 5, "back");
var keybind = new button (20, 100, 75, 30, 2, "Controls");
var P1Up = new button (80, 45, 80, 45, 5, 
											"bind Player 1 Up key");
var P1Down = new button (80, 135, 80, 45, 5, 
											"bind Player 1 Down key");
var P1Left = new button (80, 225, 80, 45, 5, 
											"bind Player 1 Left key");
var P1Right = new button (80, 315, 80, 45, 5, 
											"bind Player 1 Right key");

var P2Up = new button (240, 45, 80, 45, 5, 
											"bind Player 2 Up key");
var P2Down = new button (240, 135, 80, 45, 5, 
											"bind Player 2 Down key");
var P2Left = new button (240, 225, 80, 45, 5, 
											"bind Player 2 Left key");
var P2Right = new button (240, 315, 80, 45, 5, 
											"bind Player 2 RIght key");

var P1UDLR = function () {
	P1Up.hover();
	P1Down.hover();
	P1Left.hover();
	P1Right.hover();
}
var P2UDLR = function () {
	P2Up.hover();
	P2Left.hover();
	P2Right.hover();
	P2Down.hover();
}
function draw() {
  if (inGame) {
  	background(220);
  } 
	else {
		background(220);
		textSize(12);
		buttonMenu3.hover();
		Back3.hover();
		P1UDLR();
		textSize(12);
		P2UDLR();
		if (changeKey === 1 & keyIsPressed) {
			P1.Up = keyCode;
			changeKey = 0;
		}
		if (changeKey === 2 & keyIsPressed) {
			P1.Down = keyCode;
			changeKey = 0;
		}
		if (changeKey === 3 & keyIsPressed) {
			P1.Left = keyCode;
			changeKey = 0;
		}
		if (changeKey === 4 & keyIsPressed) {
			P1.Right = keyCode;
			changeKey = 0;
		}
		if (changeKey === 5 & keyIsPressed) {
			P2.Up = keyCode;
			changeKey = 0;
		}
		if (changeKey === 6 & keyIsPressed) {
			P2.Down = keyCode;
			changeKey = 0;
		}
		if (changeKey === 7 & keyIsPressed) {
			P2.Left = keyCode;
			changeKey = 0;
		}
		if (changeKey === 8 & keyIsPressed) {
			P2.Right = keyCode;
			changeKey = 0;
		}
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
    // buttonDifficulty2.hover();
		keybind.hover();
		HardCpu.hover(1);
		MediumCpu.hover(2);
		EasyCpu.hover(3);

  }
}
function mousePressed () {
	if (!inGame) {
		print(buttonMenu3.hovering);
  	if (buttonMenu1.hovering || buttonMenu2.hovering) {
			scene = 1;
		}
		if (buttonMenu3.hovering) {
			keybinding = false;     
			scene = 1;
  	}
    if (buttonSettings1.hovering) {
      scene = 2;
    }
    if (buttonDifficulty1.hovering
				// || buttonDifficulty2.hovering
			 ) {
      scene = 3;
    }
		if (HardCpu.hovering) {
			scene = 2;
			difficulty = 3;
		}
		if (MediumCpu.hovering) {
			scene = 2;
			difficulty = 2;
		}
		if (EasyCpu.hovering) {
			scene = 2;
			difficulty = 1;
		}
		if (Back1.hovering) {
			scene = 1;
		}
		if (Back2.hovering) {
			scene = 2;
		}
		if (Back3.hovering) {
			scene = 2;
		}
		if (keybind.hovering) {
			keybinding = true;
			// cycles = 0;
			scene = 5;
		}
		if (P1Up.hovering) {
			changeKey = 1;
		}
		if (P1Down.hovering) {
			changeKey = 2;
		}
		if (P1Left.hovering) {
			changeKey = 3;
		}
		if (P1Right.hovering) {
			changeKey = 4;
		}
		if (P2Up.hovering) {
			changeKey = 5;
		}
		if (P2Down.hovering) {
			changeKey = 6;
		}
		if (P2Left.hovering) {
			changeKey = 7;
		}
		if (P2Right.hovering) {
			changeKey = 8;
		}
  }
}
