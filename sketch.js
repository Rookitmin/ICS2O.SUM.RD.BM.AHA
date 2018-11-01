function setup() {
  createCanvas(400, 400);
  background(220);
}
var v1 = false;
var v2 = true;
var scroll = [0, 0];
var scene = 1;
var inGame = false;
var difficulty = 1;
var keybinding = false;
var cycles = 0;
var P1 = {Up: 32, Down: 40, Left: 37, Right: 39, shoot: 77};
var P2 = {Up: 87, Down: 83, Left: 65, Right: 68, shoot: 82};
//scene number 
var pauseScreen = 99;

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
var buttonDifficulty2 = new button (20, 50, 75, 30, pauseScreen, "Difficulty");
var HardCpu = new button (30, 150, 75, 30, 3, "Hard");
var MediumCpu = new button (30, 100, 75, 30, 3, "Medium");
var EasyCpu = new button (30, 50, 75, 30, 3, "Easy");
var Back1 = new button (325, 10, 50, 20, 2, "back");
var Back2 = new button (325, 10, 50, 20, 3, "back");
var Back3 = new button (325, 10, 50, 20, 5, "back");
var keybind = new button (20, 100, 75, 30, 2, "Controls");
var P1U = new button (80, 45, 80, 45, 5, "bind Player 1 Up key");
var P1D = new button (80, 135, 80, 45, 5, "bind Player 1 Down key");
var P1L = new button (80, 225, 80, 45, 5, "bind Player 1 Left key");
var P1R = new button (80, 315, 80, 45, 5, "bind Player 1 Right key");
var P2U = new button (240, 45, 80, 45, 5, "bind Player 2 Up key");
var P2D = new button (240, 135, 80, 45, 5, "bind Player 2 Down key");
var P2L = new button (240, 225, 80, 45, 5, "bind Player 2 Left key");
var P2R = new button (240, 315, 80, 45, 5, "bind Player 2 RIght key");

function draw() {
  if (inGame) {
  	background(220);
  } 
	else if (keybinding) {
		if (v1) {
			background(220);
			if (cycles < 200) {
				text("Press Player 1's new Up Button", 100, 100, 200, 200)
			} else if (cycles < 420 && cycles > 220) {
				text("Press Player 1's new Down Button", 100, 100, 200, 200)
			} else if (cycles < 640 && cycles > 440) {
				text("Press Player 1's new Left Button", 100, 100, 200, 200)
			} else if (cycles < 860 && cycles > 660) {
				text("Press Player 1's new Right Button", 100, 100, 200, 200)
			} else if (cycles < 1080 && cycles > 880) {
				text("Press Player 2's new Up Button", 100, 100, 200, 200)
			} else if (cycles < 1300 && cycles > 1100) {
				text("Press Player 2's new Down Button", 100, 100, 200, 200)
			} else if (cycles < 1520 && cycles > 1320) {
				text("Press Player 2's new Left Button", 100, 100, 200, 200)
			} else if (cycles < 1740 && cycles > 1540) {
				text("Press Player 2's new Right Button", 100, 100, 200, 200)
			} else if (cycles > 2000) {
				keybinding = false;
			}
			cycles ++;
		}
		else if (v2) {
			background(220);
			textSize(12);
			buttonMenu3.hover();
			Back3.hover();
			P1U.hover();
			P1D.hover();
			P1L.hover();
			P1R.hover();
			P2U.hover();
			P2D.hover();
			P2L.hover();
			P2R.hover();
		}
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
		keybind.hover();
		HardCpu.hover(1);
		MediumCpu.hover(2);
		EasyCpu.hover(3);

  }
}
function mousePressed () {
	if (!inGame) {
  	if (buttonMenu1.hovering || buttonMenu2.hovering) {
      scene = 1;
  	}
    if (buttonSettings1.hovering) {
      scene = 2;
    }
    if (buttonDifficulty1.hovering || buttonDifficulty2.hovering) {
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
		if (keybind.hovering) {
			keybinding = true;
			cycles = 0;
			scene = 5;
		}
  }
}
