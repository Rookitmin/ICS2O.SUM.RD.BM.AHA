function setup() {
  createCanvas(400, 400);
  background(220);
	textAlign(CENTER);
}
// an in-game variable, controlling 
// where you are looking on the map.
var scroll = [0, 0];
var Score = 100;
var Players = 0;
var PlayerType = 0;
var playerSpeed = 5;
var CompleteControl = false;
// controlls what you see
var scene = 1;
var inGame = false;
var GameMode = 0;
// Changes the difficulty of the CPUs and the 
// color of the buttons
var difficulty = 1;
// Key Changing Variables
var changeKey = 0;
var P1 = {Up: 32, Down: 40, Left: 37, Right: 39, shoot: 77, keyName: {}};
var P2 = {Up: 87, Down: 83, Left: 65, Right: 68, shoot: 82, keyName: {}};
P1.keyName = {Up: "Up Arrow", Down: "Down Arrow", Left: "Left Arrow", 
							Right: "Right Arrow", Shoot: "M"};
P2.keyName = {Up: "W", Down: "S", Left: "A", Right: "D", Shoot: "R"};

var team1 = [];
var team2 = [];

var teamCreate = function (color1, color2, color3, color4) {
	for (var i = 0; i < 10; i ++) {
		team1[i] = {posX: 0, posY: 0, UserAssigned: 0, color:color1};
		console.log(1);
	}
	team1[0].posNum = 1;
	team1[1].posNum = 1;
	team1[2].posNum = 2;
	team1[3].posNum = 2;
	team1[4].posNum = 3;
	team1[5].posNum = 3;
	team1[6].posNum = 4;
	team1[7].posNum = 4;
	team1[8].posNum = 5;
	team1[9].posNum = 5;
	for (i = 10; i < 12; i ++) {
		team1[i] = {posX: 0, posY: 0, UserAssigned: 0, color:color2, posNum:6}
		console.log(1);
	}
	for (i = 0; i < 10; i ++) {
		team2[i] = {posX: 0, posY: 0, UserAssigned: 0, color:color3}
		console.log(1);
	}
	team2[0].posNum = 1;
	team2[1].posNum = 1;
	team2[2].posNum = 2;
	team2[3].posNum = 2;
	team2[4].posNum = 3;
	team2[5].posNum = 3;
	team2[6].posNum = 4;
	team2[7].posNum = 4;
	team2[8].posNum = 5;
	team2[9].posNum = 5;
	for (i = 10; i < 12; i ++) {
		team2[i] = {posX: 0, posY: 0, UserAssigned: 0, color:color4, posNum:6}
		console.log(1);
	}
}

// creates genaralised button & Slider variables
var OneButton = true;
// Sliders
function slider (min, max, x, y, w, h, scene, title, valueChange) {
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
	this.scene = scene;
	this.words = title;
	this.min = min;
	this.max = max + valueChange;
	this.pos = min;
	this.hovering = false;
	this.change = valueChange;
}

slider.prototype.hover = function () {
	this.hovering = false;
	if (scene === this.scene) {
		noFill();
		rect(this.x, this.y + this.height / 3, this.width, this.height / 3);
		if (difficulty === 1) {
			fill(0, 102, 102);
		}
		else if (difficulty === 2) {
			fill(10, 51, 102);
		}
		else {
			fill(10, 10, 102);
		}
		rect(this.x + this.pos * this.width / (this.max - this.min), this.y, 
				 this.width / (this.max - this.min), this.height);
		text(this.words, this.x, this.y - 15, this.width, this.height);
		fill(255, 255, 255);
		text(this.pos, this.x + this.pos * this.width / (this.max - this.min), this.y + this.height / 5, 
				 this.width / (this.max - this.min), this.height);
		if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height) {
			this.hovering = true;
		}
	}
}

slider.prototype.posChange = function () {
	if ((this.pos + this.change / 2) * this.width / (this.max - this.min) + this.width / (this.max - this.min) < mouseX && 
				this.scene === scene && this.pos + this.change <= this.max) {
			this.pos += this.change;
	}
	else if ((this.pos - this.change / 2) * this.width / (this.max - this.min) + this.width / (this.max - this.min) > mouseX && 
				this.scene === scene && this.pos - this.change >= this.min) {
		this.pos -= this.change;
		
	}
}

function button (x, y, width, height, scene, text, changeBy)  {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.scene = scene;
  this.words = text;
  this.hovering = false;
	this.change = changeBy;
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
// calls the function to change the color of the button
// & change a variable on wheather the button is selected.
button.prototype.hover = function (lll) {
  if (this.x < mouseX && this.y < mouseY && 
      this.x + this.width > mouseX && this.y + this.height > mouseY && 
      scene === this.scene) {
		if (OneButton) {
			OneButton = false;
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
		} else {
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
			this.hovering = false;
		}
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
var credits = "Coded By: Rookitmin, Printear, Winnie And The Guy Next Door." + 
					 " Also I\'d Like to thank Aadsta, Sheepdude and all of my other" + 
						" sponsers. This Assingment was coded in Approxamitly ... 10 Hours?" + 
						" has it really been that long? ... I guess so. huh. well... here are " + 
						"the real credits: Rookitmin, Ali596087, and Minirals in collaboration " +
						"With the grade three's ... Hockey Dude, and Ringette Girl.";
var creditScroll = 400;
var sliderPlayerSpeed = new slider (0, 15, 10, 200, 380, 20, 2, "Player Speed", 0.5);
var sliderCPUSpeed = new slider (0, 15, 10, 250, 380, 20, 2, "CPU Speed", 0.5);
var buttonMenu1 = new button (10, 10, 75, 25, 2, "Main Menu");
var buttonMenu2 = new button (10, 10, 75, 25, 3, "Main Menu");
var buttonMenu3 = new button (10, 10, 75, 25, 5, "Main Menu");
var buttonMenu4 = new button (10, 10, 75, 25, 6, "Main Menu");
var buttonMenu5 = new button (315, 365, 75, 25, 7, "Main Menu");
var buttonMenu6 = new button (10, 10, 75, 25, 9, "Main Menu");
var buttonMenu7 = new button (10, 10, 75, 25, 10, "Main Menu");
var buttonMenu8 = new button (10, 10, 75, 25, 4, "Main Menu");
var buttonStart1 = new button (10, 50, 120, 40, 1, "Start");
var buttonHowToPlay1 = new button (315, 340, 75, 50, 1, "How To Play");
var buttonSettings1 = new button (10, 100, 120, 40, 1, "Settings");
var buttonDifficulty1 = new button (20, 50, 75, 30, 2, "Difficulty");
var buttonDifficulty2 = new button (20, 50, 75, 30, 999, "Difficulty");
var HardCpu = new button (30, 150, 75, 30, 3, "Hard");
var MediumCpu = new button (30, 100, 75, 30, 3, "Medium");
var EasyCpu = new button (30, 50, 75, 30, 3, "Easy");
var Back1 = new button (325, 10, 50, 20, 2, "back");
var Back2 = new button (325, 10, 50, 20, 3, "back");
var Back3 = new button (325, 10, 50, 20, 5, "back");
var Back4 = new button (325, 10, 50, 20, 6, "back");
var Back5 = new button (325, 10, 50, 20, 9, "back");
var Back6 = new button (325, 10, 50, 20, 10, "back");
var buttonNumOfPlayer1 = new button (0, 0, 400, 200, 9, "One Player");
var buttonNumOfPlayer2 = new button (0, 200, 400, 200, 9, "Two Players");
var buttonPlayerType1 = new button (0, 0, 400, 200, 10, "Versus");
var buttonPlayerType2 = new button (0, 200, 400, 200, 10, "Same Team");
var keybind = new button (20, 100, 75, 30, 2, "Controls");
var next1 = new button (325, 355, 50, 20, 5, "Next");
var prev1 = new button (10, 355, 50, 20, 6, "Prev");
var credits1 = new button (10, 150, 120, 40, 1, "Credits");
var P1Up = new button (80, 45, 80, 45, 5, 
											"bind Player 1 Up key");
var P1Down = new button (80, 135, 80, 45, 5, 
											"bind Player 1 Down key");
var P1Left = new button (80, 225, 80, 45, 5, 
											"bind Player 1 Left key");
var P1Right = new button (80, 315, 80, 45, 5, 
											"bind Player 1 Right key");
var P1Shoot = new button (80, 45, 80, 45, 6, 
											"bind Player 1 Shoot key");
var P2Up = new button (240, 45, 80, 45, 5, 
											"bind Player 2 Up key");
var P2Down = new button (240, 135, 80, 45, 5, 
											"bind Player 2 Down key");
var P2Left = new button (240, 225, 80, 45, 5, 
											"bind Player 2 Left key");
var P2Right = new button (240, 315, 80, 45, 5, 
											"bind Player 2 RIght key");
var P2Shoot = new button (240, 45, 80, 45, 6, 
											"bind Player 2 Shoot key");
var P1UDLRS = function () {
	P1Up.hover();
	P1Down.hover();
	P1Left.hover();
	P1Right.hover();
	P1Shoot.hover();
}
var P2UDLRS = function () {
	P2Up.hover();
	P2Left.hover();
	P2Right.hover();
	P2Down.hover();
	P2Shoot.hover();
}

function draw() {
  if (inGame) {
  	background(220);
  } 
	else {
		background(220);
		textSize(12);
		buttonMenu3.hover();
		buttonMenu4.hover();
		Back3.hover();
		Back4.hover();
		next1.hover();
		prev1.hover();
		P1UDLRS();
		textSize(12);
		P2UDLRS();
		// just to make scrolling t o where I want to go Easier.
		if (true) {
			if (changeKey === 1 & keyIsPressed) {
				P1.Up = keyCode;
				P1.keyName.Up = key;
				changeKey = 0;
			}
			if (changeKey === 2 & keyIsPressed) {
				P1.Down = keyCode;
				P1.keyName.Down = key;
				changeKey = 0;
			}
			if (changeKey === 3 & keyIsPressed) {
				P1.Left = keyCode;
				P1.keyName.Left = key;
				changeKey = 0;
			}
			if (changeKey === 4 & keyIsPressed) {
				P1.Right = keyCode;
				P1.keyName.Right = key;
				changeKey = 0;
			}
			if (changeKey === 5 & keyIsPressed) {
				P2.Up = keyCode;
				P2.keyName.Up = key;
				changeKey = 0;
			}
			if (changeKey === 6 & keyIsPressed) {
				P2.Down = keyCode;
				P2.keyName.Down = key;
				changeKey = 0;
			}
			if (changeKey === 7 & keyIsPressed) {
				P2.Left = keyCode;
				P2.keyName.Left = key;
				changeKey = 0;
			}
			if (changeKey === 8 & keyIsPressed) {
				P2.Right = keyCode;
				P2.keyName.Right = key;
				changeKey = 0;
			}	
			if (changeKey === 9 & keyIsPressed) {
				P1.shoot = keyCode;
				P1.keyName.Shoot = key;
				changeKey = 0;
			}
			if (changeKey === 10 & keyIsPressed) {
				P2.shoot = keyCode;
				P2.keyName.Shoot = key;
				changeKey = 0;
			}
		}
    textSize(12);
    buttonMenu1.hover();
    buttonMenu2.hover();
		buttonMenu5.hover();
		buttonMenu8.hover();
		Back1.hover();
		Back2.hover();
    textSize(30);
    buttonStart1.hover();
    buttonSettings1.hover();
		credits1.hover();
		buttonNumOfPlayer1.hover();
		buttonNumOfPlayer2.hover();
		buttonPlayerType1.hover();
		buttonPlayerType2.hover();
		OneButton = true;
    textSize(16);
    buttonDifficulty1.hover();
    buttonDifficulty2.hover();
		buttonHowToPlay1.hover();
		keybind.hover();
		HardCpu.hover(1);
		MediumCpu.hover(2);
		EasyCpu.hover(3);
		textSize(12);
		buttonMenu6.hover();
		buttonMenu7.hover();
		Back5.hover();
		Back6.hover();
		if (CompleteControl) {
			sliderPlayerSpeed.hover();
			sliderCPUSpeed.hover();
			if (mouseIsPressed) {
				if (sliderPlayerSpeed.hovering) {
					sliderPlayerSpeed.posChange();
					playerSpeed = sliderPlayerSpeed.pos;
				}
				if (sliderCPUSpeed.hovering) {
					sliderCPUSpeed.posChange();
				}
			}
		}
		if (scene === 7) {
			background(155, 0, 155);
			fill(0, 0, 0);
			text(credits, 40, 0 + creditScroll, 320, 320);
			textSize(30);
			if (creditScroll > 0) {
				text("AND YOU! Thanks For Playing!", 40, 200 + creditScroll, 320, 120);
			} else if (creditScroll > -50) {
				text("AND YOU! Thanks For Playing!", 40, 200 + creditScroll / 2, 320, 120);
			} else {
				text("AND YOU! Thanks For Playing!", 40, 175, 320, 120);
			}
			creditScroll -= 1;
			if (creditScroll < -400) {
				scene = 1;
				creditScroll = 400;
			}
		}
		if (scene === 8) {
			textSize(35);
			text("Game Over", 100, 100, 200, 200);
			textSize(30);
			if (GameMode === 1 || GameMode === 2) {
				text("Your Score Is:", 100, 150, 200, 150);
				text(Score + " points.", 100, 200, 200, 100);
			}
			if (GameMode === 3) {
				text("Your Score Is:", 100, 150, 200, 150);
				text(Score + " Goals.", 100, 200, 200, 100);
			}
			if (GameMode === 4) {
				text("Your'e in:", 100, 150, 200, 150);
				text(Score + "th place.", 100, 200, 200, 100);
			}
		}
		if (scene === 4) {
			fill("black");
			textSize(30);
			text("The Origanal Keys to Move are " + P2.keyName.Up + " - " + P2.keyName.Down + " - " + P2.keyName.Left + " - " + 
					 P2.keyName.Right + " with " + P2.keyName.Shoot + " to shoot (Player 2) " + 
					 "& " + P1.keyName.Up + " - " + P1.keyName.Down + " - " + P1.keyName.Left + " - " + P1.keyName.Right + " with " + 
					 P1.keyName.Shoot + " to shoot (Player 1).", 50, 50, 300, 300);
		}
  }
}
function mousePressed () {
	if (!inGame) {
  	if (buttonMenu1.hovering || buttonMenu2.hovering || buttonMenu6.hovering || buttonMenu7.hovering) {
			scene = 1;
		}
		if (buttonMenu3.hovering || buttonMenu4.hovering || buttonMenu5.hovering || buttonMenu8.hovering) {    
			scene = 1;
  	}
		if (Back5.hovering) {
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
		if (Back3.hovering || Back4.hovering) {
			scene = 2;
		}
		if (Back6.hovering) {
			scene = 9;
		}
		if (keybind.hovering) {
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
		if (P1Shoot.hovering) {
			changeKey = 9;
		}
		if (P2Shoot.hovering) {
			changeKey = 10;
		}
		if (next1.hovering) {
			scene = 6;
		}
		if (prev1.hovering) {
			scene = 5;
		}
		if (credits1.hovering) {
			scene = 7;
		}
		if (buttonStart1.hovering) {
			scene = 9;
		}
		// console.log(scene);
		if (buttonNumOfPlayer1.hovering) {
			Players = 1;
			scene = 11;
		}
		if (buttonNumOfPlayer2.hovering) {
			Players = 2;
			scene = 10;
		} 
		if (buttonPlayerType1.hovering) {
			PlayerType = 1;
			scene = 11;
		}
		if (buttonPlayerType2.hovering) {
			PlayerType = 2;
			scene = 11;
		}
		if (buttonHowToPlay1.hovering) {
			scene = 4;
		}
  }
}

function keyTyped() {
	if (key === 'v') {
		scene = 1;
	}
	else if (key === 'b') {
		CompleteControl = true;
		teamCreate(color(255, 0, 0), color(255, 102, 102), color(0, 255, 0), color(102, 255, 102));
	}
}


