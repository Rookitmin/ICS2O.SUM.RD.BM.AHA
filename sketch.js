var Rinkln;
var moosic;
function preload () {
	Rinkln = loadImage("something.png");
	soundFormats('mp3');
	moosic = loadSound('Rodrycks_Fanfare.mp3');
}

var net1;
var net2;
function setup() {
  createCanvas(400, 400);
  background(220);
	textAlign(CENTER);
	colorMode(RGB, 255, 255, 255, 255);
	net1 = new Net(0, 200, 50, 270, 1);
	net2 = new Net(740, 200, 800, 270, -1);
	frameRate(60);
}
// an in-game variable, controlling 
// where you are looking on the map.
var buttonArray = [];
var PauseButton = [];
var PauseSlider = [];
var scroll = [0, 0];
var gotoPause = false;
var Score = 0;
var Score2 = 0;
var Players = 0;
var PlayerType = 0;
var playerSpeed = 5;
// var CompleteControl = false;
var colorChange = {
	team1: {
		r: 250,
		g: 0,
		b: 0
	},
	team2: {
		r: 0,
		g: 255,
		b: 0
	}
}
// controls what you see
var scene = 1;
var Pause = false;
var inGame = false;
var GameMode = 0;
// Changes the difficulty of the CPUs and the 
// color of the buttons
var difficulty = 1;
var stick1 = [0, 200, 1, 0];
var stick2 = [0, 0, 0, 1];
var puck = [0, 0, 0, 0];
// Key Changing Variables
var changeKey = 0;
var changeKeyPressed = false;
var P1 = {Up: 38, Down: 40, Left: 37, Right: 39, shoot: 77, keyName: {}, speedX: 0, speedY: 0};
var P2 = {Up: 87, Down: 83, Left: 65, Right: 68, shoot: 82, keyName: {}, speedX: 0, speedY: 0};
P1.keyName = {Up: "Up Arrow", Down: "Down Arrow", Left: "Left Arrow", 
							Right: "Right Arrow", Shoot: "M"};
P2.keyName = {Up: "W", Down: "S", Left: "A", Right: "D", Shoot: "R"};

var team1 = [];
var team2 = [];

var teamCreate = function (color1, color2, color3, color4) {
	for (var i = 0; i < 10; i ++) {
		team1[i] = {posX: -200, posY: -200, facing: 0, UserAssigned: 0, color:color1};
		// console.log(1);
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
		team1[i] = {posX: 200, posY: 200, facing:0, UserAssigned: 0, color:color2, posNum:6}
		// console.log(1);
	}
	for (i = 0; i < 10; i ++) {
		team2[i] = {posX: -600, posY: -200, facing:0, UserAssigned: 0, color:color3}
		// console.log(1);
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
		team2[i] = {posX: 600, posY: 200, facing:0, UserAssigned: 0, color:color4, posNum:6}
		// console.log(1);
	}
}

// creates genaralised button & Slider variables
var OneButton = true;
// Sliders
function slider (min, max, x, y, w, h, sceneNumber, title, valueChange, pos) {
	this.x = x;
	this.y = y;
	this.width = w;
	this.buttonwidth = w;
	this.height = h;
	this.scene = sceneNumber;
	this.words = title;
	this.min = min;
	this.max = max;
	this.pos = pos;
	this.hovering = false;
	this.change = valueChange;

	this.hover = function (r, g, b) {
		this.hovering = false;
		// console.log(this.scene);
		// console.log(scene);
		if (scene === this.scene) {
			// console.log(451);
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
			if (!(r <= 0 && g <= 0 && b <= 0)) {
				fill(r, g, b);
			}
			rect(this.x + this.pos * (this.width / (this.max - this.min)), this.y, 
					 this.width / (this.max - this.min), this.height);
			text(this.words, this.x, this.y - 15, this.width, this.height);
			fill(255, 255, 255);
			text(this.pos, this.x + this.pos * this.width / (this.max - this.min), this.y + this.height / 5, 
					 this.width / (this.max - this.min), this.height);
			if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height) {
				this.hovering = true;
				cursor(HAND);
			}
		}
	}

	this.posChange = function () {
		if (this.x + ((this.pos + this.change) * this.width / (this.max - this.min)) < mouseX && 
					this.scene === scene && this.pos + this.change <= this.max && 
						mouseIsPressed) {
				this.pos += this.change;
		}
		else if (this.x + ((this.pos - this.change) * this.width / (this.max - this.min)) > mouseX && 
					this.scene === scene && this.pos - this.change >= this.min && 
						 mouseIsPressed) {
			this.pos -= this.change;
		}
	}
}

function button (x, y, width, height, scene, text, TextSize, scene2)  {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.scene = scene;
  this.words = text;
  this.hovering = false;
	this.TextSize = TextSize;
	this.gotoScene = scene2;
}
button.prototype.draw = function () {
	if (this.scene === scene) {
		if (this.hovering) {
			if (difficulty === 1) {
				fill(102, 102, 0);
			}
			else if (difficulty === 2) {
				fill(102, 51, 10);
			}
			else {
				fill(102, 10, 10);
			}
			rect(this.x, this.y, this.width, this.height);
			fill(255, 255, 255);
			text(this.words, this.x + 5, this.y + 5, 
				 this.width - 5, 
				 this.height - 5);
		} 
		else {
			if (difficulty === 1) {
				fill(0, 102, 102);
			}
			else if (difficulty === 2) {
				fill(10, 51, 102);
			}
			else {
				fill(10, 10, 102);
			}
			rect(this.x, this.y, this.width, this.height);
			fill(255, 255, 255);
			text(this.words, this.x + 5, this.y + 5, 
				 this.width - 5, 
				 this.height - 5);
		}
	}
}
// conatins the code for drawing the buttons
// calls the function to change the color of the button
// & change a variable on wheather the button is selected.
button.prototype.hover = function (lll) {
	textSize(this.TextSize);
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
			cursor(HAND);
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
// Here's the description of our code
var credits = "Coded By: Rookitmin, Printear, Winnie And The Guy Next Door." + 
					 " Also I\'d Like to thank Aadsta, Sheepdude and all of my other" + 
						" sponsers. This Assingment was coded in Approxamitly ... 50 Hours?" + 
						" has it really been that long? ... I guess so. huh. well... here are " + 
						"the real credits: Rookitmin, Ali596087, and Minirals in collaboration " +
						"With the grade three's ... Hockey Dude, and Ringette Girl.";
var creditScroll = 400;
// var sliderPlayerSpeed = new slider (0, 15, 10, 200, 380, 20, 2, "Player Speed", 0.5, 8.5);
// var sliderCPUSpeed = new slider (0, 15, 10, 250, 380, 20, 2, "Puck Speed", 0.5, 7.5);
// Here is all of our button array & it works
buttonArray.push (new button (10, 10, 75, 25, 2, "Main Menu", 12, 1));  //0
buttonArray.push (new button (10, 10, 75, 25, 3, "Main Menu", 12, 1)); //1
buttonArray.push (new button (10, 10, 75, 25, 5, "Main Menu", 12, 1)); //2
buttonArray.push (new button (10, 10, 75, 25, 6, "Main Menu", 12, 1)); //3
buttonArray.push (new button (315, 365, 75, 25, 7, "Main Menu", 12, 1)); //4
buttonArray.push (new button (10, 10, 75, 25, 9, "Main Menu", 12, 1));  //5
buttonArray.push (new button (10, 10, 75, 25, 10, "Main Menu", 12, 1)); //6
buttonArray.push (new button (10, 10, 75, 25, 4, "Main Menu", 12, 1));  //7
buttonArray.push (new button (10, 10, 75, 25, 11, "Main Menu", 12, 1)); //8
buttonArray.push (new button (10, 50, 120, 40, 1, "Start", 30, 9));    //9
buttonArray.push (new button (315, 340, 75, 50, 1, "How To Play", 16, 4)); //10
buttonArray.push (new button (10, 100, 120, 40, 1, "Settings", 30, 2));  //11
buttonArray.push (new button (20, 50, 75, 30, 2, "Difficulty", 16, 3));  //12
buttonArray.push (new button (30, 150, 75, 30, 3, "Hard", 16, 2));        //14
buttonArray.push (new button (30, 100, 75, 30, 3, "Medium", 16, 2));      //15
buttonArray.push (new button (30, 50, 75, 30, 3, "Easy", 16, 2));         //16
buttonArray.push (new button (325, 10, 50, 20, 2, "back", 12, 1));        //17
buttonArray.push (new button (325, 10, 50, 20, 3, "back", 12, 2));        //18
buttonArray.push (new button (325, 10, 50, 20, 5, "back", 12, 2));        //19
buttonArray.push (new button (325, 10, 50, 20, 6, "back", 12, 2));        //20
buttonArray.push (new button (325, 10, 50, 20, 9, "back", 12, 1));        //21
buttonArray.push (new button (325, 10, 50, 20, 10, "back", 12, 9));       //22
buttonArray.push (new button (325, 10, 50, 20, 11, "back", 12, 10));       //23
buttonArray.push (new button (0, 0, 400, 200, 9, "One Player", 30, 12));   //24
buttonArray.push (new button (0, 200, 400, 200, 9, "Two Players", 30, 10));//25
buttonArray.push (new button (0, 0, 400, 200, 10, "Versus", 30, 11));      //26
buttonArray.push (new button (0, 200, 400, 200, 10, "Same Team", 30, 11)); //27
buttonArray.push (new button (95, 95, 200, 200, 11, "Single Match", 16, 13)); //28
buttonArray.push (new button (325, 10, 50, 20, 12, "back", 12, 9));  //29
buttonArray.push (new button (10, 10, 75, 25, 12, "Main Menu", 12, 1));    //30
buttonArray.push (new button (95, 95, 200, 200, 12, "Practice Match", 16, 13)); //31
buttonArray.push (new button (20, 100, 75, 30, 2, "Controls", 16, 5));       //32
buttonArray.push (new button (325, 355, 50, 20, 5, "Next", 12 , 6));          //33
buttonArray.push (new button (10, 355, 50, 20, 6, "Prev", 12, 5));           //34
buttonArray.push (new button (10, 150, 120, 40, 1, "Credits", 30, 7));       //35
buttonArray.push (new button (80, 45, 80, 45, 5, "bind Player 1 Up key", 12, 0)); //36
buttonArray.push (new button (80, 135, 80, 45, 5, "bind Player 1 Down key", 12, 0)); //37
buttonArray.push (new button (80, 225, 80, 45, 5, "bind Player 1 Left key", 12, 0)); //38
buttonArray.push (new button (80, 315, 80, 45, 5, "bind Player 1 Right key", 12, 0));//39
buttonArray.push (new button (80, 45, 80, 45, 6, "bind Player 1 Shoot key", 12, 0)); //40
buttonArray.push (new button (240, 45, 80, 45, 5, "bind Player 2 Up key", 12, 0));   //41
buttonArray.push (new button (240, 135, 80, 45, 5, "bind Player 2 Down key", 12, 0));//42
buttonArray.push (new button (240, 225, 80, 45, 5, "bind Player 2 Left key", 12, 0));//43
buttonArray.push (new button (240, 315, 80, 45, 5, "bind Player 2 Right key", 12, 0));//44
buttonArray.push (new button (240, 45, 80, 45, 6, "bind Player 2 Shoot key", 12, 0));//45
buttonArray.push (new button (10, 10, 75, 25, 8, "Main Menu",  12, 1));//45
PauseButton.push (new button (50, 75, 200, 50, 15, "Resume", 40, 15));
PauseButton.push (new button (50, 135, 200, 50, 15, "Main Menu", 40, 1));
PauseButton.push (new button (50, 195, 200, 50, 15, "Settings", 40, 16));
PauseButton.push (new button (60, 80, 300, 35, 16, "Change Team 1 Colour", 21, 17));
PauseButton.push (new button (60, 160, 300, 35, 16, "Change Team 2 Colour", 21, 18));
PauseButton.push (new button (725, 10, 50, 20, 16, "back", 12, 15));
PauseButton.push (new button (725, 10, 50, 20, 17, "back", 12, 16));
PauseButton.push (new button (725, 10, 50, 20, 18, "back", 12, 16));
PauseSlider.push (new slider (0, 255, 70, 85, 510, 15, 17, "Team 1 Red Value", 5, 250));
PauseSlider.push (new slider (0, 255, 70, 115, 510, 15, 17, "Team 1 Green Value", 5, 0));
PauseSlider.push (new slider (0, 255, 70, 145, 510, 15, 17, "Team 1 Blue Value", 5, 0));
PauseSlider.push (new slider (0, 255, 70, 85, 510, 15, 18, "Team 2 Red Value", 5, 0));
PauseSlider.push (new slider (0, 255, 70, 115, 510, 15, 18, "Team 2 Green Value", 5, 250));
PauseSlider.push (new slider (0, 255, 70, 145, 510, 15, 18, "Team 2 Blue Value", 5, 0));

// new slider (0, 15, 10, 250, 380, 20, 2, "Puck Speed", 0.5, 7.5);
var drawScore = function () {
	textSize(32);
	fill(colorChange.team1.r, colorChange.team1.g, colorChange.team1.b);
	rect(300, 0, 100, 70);
	fill(colorChange.team2.r, colorChange.team2.g, colorChange.team2.b);
	rect(400, 0, 100, 70);
	fill(0, 0, 0);
	text(Score, 300, 40, 100);
	text(Score2, 400, 40, 100);
}
var DrawButton = function () {
	cursor(ARROW);
	for (var i = 0; i < buttonArray.length; i ++) {
		if (i >= 13 && i <= 15) {
			buttonArray[i].hover(i - 12);
		} 
		else {
		buttonArray[i].hover();
		}
	}
	for(i = 17; i < 23; i ++){
		buttonArray[i].draw();
	}
}
var PauseScreen = function () {
	cursor(ARROW);
	OneButton = true;
	for (var i = 0; i < PauseButton.length; i++) {
		PauseButton[i].hover();
	}
	for (var ii = 0; ii < PauseSlider.length; ii++) {
		if (ii <= 2) {
			PauseSlider[ii].hover(colorChange.team1.r, colorChange.team1.g, colorChange.team1.b);
		}
		else if (ii <= 5) {
			PauseSlider[ii].hover(colorChange.team2.r, colorChange.team2.g, colorChange.team2.b);
		}
		else {
			PauseSlider[ii].hover();
		}
	}
}
var updateColor = function (lll) {
	if (lll === 1) {
		for (var i = 0; i < team1.length; i++) {
			team1[i].color = color(colorChange.team1.r, colorChange.team1.g, colorChange.team1.b);
		}
	}
	else if (lll === 2) {
		for (var ii = 0; ii < team1.length; ii++) {
			team2[ii].color = color(colorChange.team2.r, colorChange.team2.g, colorChange.team2.b);
		}
	}
}
//This changes the scene when a player changes the difficulty
var detectSceneChange = function () {
	for (var i = 0; i < buttonArray.length; i ++) {
		if (buttonArray[i].hovering && buttonArray[i].gotoScene >= 1) {
			scene = buttonArray[i].gotoScene;
			if (i === 13) {
				difficulty = 3;
				console.log(1);
			}
			else if (i === 14) {
				difficulty = 2;
			}
			else if (i === 15) {
				difficulty = 1;
			}
			if (buttonArray[i].gotoScene === 13) {
				inGame = true;
				teamCreate(color(255, 0, 0), color(255, 102, 102), color(0, 255, 0), color(102, 255, 102));
				if (i === 27) {
					gameMode = 1;
				}
				if (i === 28) {
					gameMode = 2;
				}
				if (i === 29) {
					gameMode = 3;
				}
				if (i === 30) {
					gameMode = 4;
				}
			}
			else if (buttonArray[i].gotoScene === 10 || buttonArray[i].gotoScene === 11) {
				// if (i === 23) {
				// 	Players = 1;
				// } 
				if (i === 24) {
					Players = 2;
				}
				if (i === 25) {
					PlayerType = 1;
				}
				if (i === 26) {
					PlayerType = 2;
				}
			}
			if (i === 23) {
				Players = 1;
			}
		} else if (buttonArray[i].gotoScene === 0 && buttonArray[i].hovering) {
			if (i === 35) {
				changeKey = 1;
			}
			else if (i === 36) {
				changeKey = 2;
			}
			else if (i === 37) {
				changeKey = 3;
			}
			else if (i === 38) {
				changeKey = 4;
			}
			else if (i === 39) {
				changeKey = 5;
			}
			else if (i === 40) {
				changeKey = 6;
			}
			else if (i === 41) {
				changeKey = 7;
			}
			else if (i === 42) {
				changeKey = 8;
			}
			else if (i === 43) {
				changeKey = 9;
			}
			else if (i === 44) {
				changeKey = 10;
			}
		}
	}
}
var detectPauseChange = function (lll) {
	if (lll === 1) {
		for (var i = 0; i < PauseButton.length; i ++) {
			if (PauseButton[i].hovering && PauseButton[i].gotoScene >= 1) {
				scene = PauseButton[i].gotoScene;
				if (i === 0) {
					inGame = true;
					Pause = false;
				}
				if (i === 1) {
					inGame = false;
					Pause = false;
					team1 = [];
					team2 = [];
					teamCreate();
					puck1 = [400, 255, 0, 0] 
				}
			}
		}
	}
	else if (lll === 2) {
		for (var ii = 0; ii < PauseSlider.length; ii ++) {
			if (PauseSlider[ii].hovering) {
				PauseSlider[ii].posChange();
				if (ii === 0) {
					colorChange.team1.r = PauseSlider[ii].pos;
					updateColor(1);
				}
				else if (ii === 1) {
					colorChange.team1.g = PauseSlider[ii].pos;
					updateColor(1);
				}
				else if (ii === 2) {
					colorChange.team1.b = PauseSlider[ii].pos;
					updateColor(1);
				}
				else if (ii === 3) {
					colorChange.team2.r = PauseSlider[ii].pos;
					updateColor(2);
				}
				else if (ii === 4) {
					colorChange.team2.g = PauseSlider[ii].pos;
					updateColor(2);
				}
				else if (ii === 5) {
					colorChange.team2.b = PauseSlider[ii].pos;
					updateColor(2);
				}
			}
		}
	}
}
var speedPos1 = 5 - P1.speedX / 5;
var speedNeg1 = P1.speedX / 5 - 5;
var speedPos2 = 5 - P1.speedY / 5;
var speedNeg2 = P1.speedY / 5 - 5;
var puck1 = [400, 225, 0, 0];
var ignore = false;
var dleayl = 0;
var detectPlayer = function (PT, NP) {
	// console.log(3);
	if (PT === 0) {
		// console.log(2);
		if (puck1[0] * -1 <= team1[0].posX + 20 && puck1[0] * -1 >= team1[0].posX - 20 && 
				puck1[1] * -1 <= team1[0].posY + 20 && puck1[1] * -1 >= team1[0].posY - 20) {
			// console.log(1);
			return(true);
		}
		else {
			return(false);
		}
	}
	else if (PT === 1) {
		if (NP === 1) {
			if (puck1[0] * -1 <= team1[0].posX + 20 && puck1[0] * -1 >= team1[0].posX - 20 && 
					puck1[1] * -1 <= team1[0].posY + 20 && puck1[1] * -1 >= team1[0].posY - 20) {
				if (puck1[0] * -1 <= team1[1].posX + 20 && puck1[0] * -1 >= team1[1].posX - 20 && 
				puck1[1] * -1 <= team1[1].posY + 20 && puck1[1] * -1 >= team1[1].posY - 20 && keyIsDown(P2.shoot)) {
					return(false);
				}
				else {
					return(true);
				}
			}
		}
		else {
			if (puck1[0] * -1 <= team1[1].posX + 20 && puck1[0] * -1 >= team1[1].posX - 20 && 
					puck1[1] * -1 <= team1[1].posY + 20 && puck1[1] * -1 >= team1[1].posY - 20) {
				if (puck1[0] * -1 <= team1[0].posX + 20 && puck1[0] * -1 >= team1[0].posX - 20 && 
				puck1[1] * -1 <= team1[0].posY + 20 && puck1[1] * -1 >= team1[0].posY - 20 && keyIsDown(P1.shoot)) {
					return(false);
				}
				else {
					return(true);
				}
			}
		}
	}
	else {
		if (NP === 1) {
			if (puck1[0] * -1 <= team1[0].posX + 20 && puck1[0] * -1 >= team1[0].posX - 20 && 
						puck1[1] * -1 <= team1[0].posY + 20 && puck1[1] * -1 >= team1[0].posY - 20) {
				if (puck1[0] * -1 <= team2[0].posX + 20 && puck1[0] * -1 >= team2[0].posX - 20 && 
						puck1[1] * -1 <= team2[0].posY + 20 && puck1[1] * -1 >= team2[0].posY - 20 && keyIsDown(P2.shoot)) {
					return(false);
				}
				else {
					return(true);
				}
			}
		}
		else {
			if (puck1[0] * -1 <= team2[0].posX + 20 && puck1[0] * -1 >= team2[0].posX - 20 && 
					puck1[1] * -1 <= team2[0].posY + 20 && puck1[1] * -1 >= team2[0].posY - 20) {
				if (puck1[0] * -1 <= team1[0].posX + 20 && puck1[0] * -1 >= team1[0].posX - 20 && 
				puck1[1] * -1 <= team1[0].posY + 20 && puck1[1] * -1 >= team1[0].posY - 20 && keyIsDown(P1.shoot)) {
					return(false);
				}
				else {
					return(true);
				}
			}
		}
	}
}
var drawPuck = function () {
	fill(0, 0, 0);
	if (Players === 1) {
		// console.log(11);
		if (detectPlayer(0, 1) && !ignore) {
			if (!keyIsDown(P1.shoot)) {
				puck1[0] = 0 - (team1[0].posX);
				puck1[1] = 0 - (team1[0].posY);
				ellipse(puck1[0] + 5, puck1[1] + 5, 15, 15);
			} 
			else {
				puck1[2] = team1[0].facing;
				puck1[3] = 5;
				ellipse(puck1[0], puck1[1], 15, 15);
				ignore = true;
				delayl = 0;
			}
		}
	}
	else if (PlayerType === 1) {
		if (detectPlayer(2, 1) && !ignore) {
			if (!keyIsDown(P1.shoot)) {
				puck1[0] = 0 - (team1[0].posX);
				puck1[1] = 0 - (team1[0].posY);
				ellipse(puck1[0] + 5, puck1[1] + 5, 15, 15);
			} 
			else {
				puck1[2] = team1[0].facing;
				puck1[3] = 5;
				ellipse(puck1[0], puck1[1], 15, 15);
				ignore = true;
				delayl = 0;
			} 
		}
		else if (detectPlayer(2, 2) && !ignore) {
			if (!keyIsDown(P2.shoot)) {
				puck1[0] = 0 - (team2[0].posX);
				puck1[1] = 0 - (team2[0].posY);
				ellipse(puck1[0] + 5, puck1[1] + 5, 15, 15);
			} 
			else {
				puck1[2] = team2[0].facing;
				puck1[3] = 5;
				ellipse(puck1[0], puck1[1], 15, 15);
				ignore = true;
				delayl = 0;
			}
		}
	}
	else if (PlayerType === 2) {
		if (detectPlayer(1, 1) && !ignore) {
			if (!keyIsDown(P1.shoot)) {
				puck1[0] = -team1[0].posX;
				puck1[1] = -team1[0].posY;
				ellipse(puck1[0] + 5, puck1[1] + 5, 15, 15);
			} 
			else {
				puck1[2] = team1[0].facing;
				puck1[3] = 5;
				ellipse(puck1[0], puck1[1], 10, 10);
				ignore = true;
				delayl = 0;
			} 
		}
		else if (detectPlayer(1, 2) && !ignore) {
			if (!keyIsDown(P2.shoot)) {
				puck1[0] = -team1[1].posX;
				puck1[1] = -team1[1].posY;
				ellipse(puck1[0] + 5, puck1[1] + 5, 15, 15);
			} 
			else {
				puck1[2] = team1[1].facing;
				puck1[3] = 5;
				ellipse(puck1[0], puck1[1], 15, 15);
				ignore = true;
				delayl = 0;
			}
		}
	}
	if (ignore) {
		delayl ++;
		if (delayl > 50) {
			ignore = false;
		}
	}
	net1.testPuck(puck1[0], puck1[1], puck1[2], 1);
	net2.testPuck(puck1[0], puck1[1], puck1[2], 0);
	resetMatrix();
	ellipse(puck1[0], puck1[1], 15, 15);
	if (puck1[2] === 45) {
		puck1[0] += puck1[3] / 2;
		puck1[1] -= puck1[3] / 2;
	}
	else if (puck1[2] === 90) {
		puck1[0] += puck1[3];
	}
	else if (puck1[2] === 135) {
		puck1[0] += puck1[3] / 2;
		puck1[1] += puck1[3] / 2;
	}
	else if (puck1[2] === 180) {
		puck1[1] += puck1[3];
	}
	else if (puck1[2] === 225) {
		puck1[0] -= puck1[3] / 2;
		puck1[1] += puck1[3] / 2;
	}
	else if (puck1[2] === 270) {
		puck1[0] -= puck1[3];
	}
	else if (puck1[2] === 315) {
		puck1[0] -= puck1[3] / 2;
		puck1[1] -= puck1[3] / 2;
	}
	else if (puck1[2] === 0) {
		puck1[1] -= puck1[3];
	}
	if (puck1[0] < 0) {
		puck1[0] = 0;
		if (puck1[2] === 225) {
			puck1[2] = 135;
		}
		else if (puck1[2] === 270) {
			puck1[2] = 90;
		}
		else if (puck1[2] === 315) {
			puck1[2] = 45;
		}
	}
	if (puck1[0] > 800) {
		puck1[0] = 800;
		if (puck1[2] === 135) {
			puck1[2] = 225;
		}
		else if (puck1[2] === 90) {
			puck1[2] = 270;
		}
		else if (puck1[2] === 45) {
			puck1[2] = 315;
		}
	}
	if (puck1[1] < 0) {
		puck1[1] = 0;
		if (puck1[2] === 315) {
			puck1[2] = 225;
		}
		else if (puck1[2] === 0) {
			puck1[2] = 180;
		}
		else if (puck1[2] === 45) {
			puck1[2] = 135;
		}
	}
	if (puck1[1] > 475) {
		puck1[1] = 475;
		if (puck1[2] === 225) {
			puck1[2] = 315;
		}
		else if (puck1[2] === 180) {
			puck1[2] = 0;
		}
		else if (puck1[2] === 135) {
			puck1[2] = 45;
		}
	}
}
// The start to our draw function 
function draw() {
	if (!moosic.isPlaying()) {
		moosic.play();
	}
  if (inGame) {
		if (Score >= 5) {
			scene = 8;
			inGame = false;
			Pause = false;
			resizeCanvas(400, 400);
		}
		if (Score2 >= 5) {
			scene = 8;
			inGame = false;
			Pause = false;
			resizeCanvas(400, 400);
		}
		// resizeCanvas(800, 800);
		speedPos1 = playerSpeed - P1.speedX / playerSpeed;
		speedNeg1 = P1.speedX / playerSpeed - playerSpeed;
		speedPos2 = playerSpeed - P1.speedY / playerSpeed;
		speedNeg2 = P1.speedY / playerSpeed - playerSpeed;
  	background(220);
		// console.log(detectPlayer(0, 1));
		resetMatrix();
		image(Rinkln, 0, 0, 800, 475);
		drawScore();
		// How our puck is designed & interacts 
		drawPuck();
		resetMatrix();
		fill(team1[0].color);
		translate(-1 * team1[0].posX, -team1[0].posY);
		rotate(team1[0].facing);
		ellipse(0, 0, 50, 15);
		ellipse(0, 0, 25, 25);
		if (P1.speedX > 0) {
			if (P1.speedX > 0.1) {
				P1.speedX -= 0.1;
			}
			else {
				P1.speedX = 0;
			}
		}
		else if (P1.speedX < 0) {
			if (P1.speedX < -0.1) {
				P1.speedX += 0.1;
			}
			else {
				P1.speedX = 0;
			}
		}
		if (P1.speedY > 0) {
			if (P1.speedY > 0.1) {
				P1.speedY -= 0.1;
			}
			else {
				P1.speedY = 0;
			}
		}
		else if (P1.speedY < 0) {
			if (P1.speedY < -0.1) {
				P1.speedY += 0.1;
			}
			else {
				P1.speedY = 0;
			}
		}
		if (team1[0].posX < -800 || team1[0].posX > 0) {
			P1.speedX = P1.speedX * -1;
			team1[0].posX = constrain(team1[0].posX, -800, 0);
		}
		if (team1[0].posY < -475 || team1[0].posY > 0) {
			P1.speedY = P1.speedY * -1;
			team1[0].posY = constrain(team1[0].posY, -475, 0);
		}
		team1[0].posX += P1.speedX;
		team1[0].posY += P1.speedY;
		if (keyIsDown(P1.Up)) {
			if (keyIsDown(P1.Left)) {
				team1[0].facing = 315;
				P1.speedX = speedPos1 * 2 / 3;
				P1.speedY = speedPos2 * 2 / 3;
			} 
			else if (keyIsDown(P1.Right)) {
				team1[0].facing = 45;
				P1.speedX = speedNeg1 * 2 / 3;
				P1.speedY = speedPos2 * 2 / 3;
			}
			else if (keyIsDown(P1.Down)) {
				
			}
			else {
				team1[0].facing = 0;
				P1.speedY = speedPos2;
			}
		}
		else if (keyIsDown(P1.Down)) {
			if (keyIsDown(P1.Left)) {
				team1[0].facing = 225;
				P1.speedX = speedPos1 * 2 / 3;
				P1.speedY = speedNeg2 * 2 / 3;
			} 
			else if (keyIsDown(P1.Right)) {
				team1[0].facing = 135;
				P1.speedX = speedNeg1 * 2 / 3;
				P1.speedY = speedNeg2 * 2 / 3;
			}
			else if (keyIsDown(P1.Up)) {
			}
			else {
				team1[0].facing = 180;
				P1.speedY = speedNeg2;
			}
		}
		else if (keyIsDown(P1.Left) && !keyIsDown(P1.Right)) {
			team1[0].facing = 270;
			P1.speedX = speedPos1;
		}
		else if (keyIsDown(P1.Right) && !keyIsDown(P1.Left)) {
			team1[0].facing = 90;
			P1.speedX = speedNeg1;
		}
		if (Players === 2) {
			if (PlayerType === 1) {
				resetMatrix();
				fill(team2[0].color);
				translate(-team2[0].posX, -team2[0].posY);
				rotate(team2[0].facing);
				ellipse(0, 0, 50, 15);
				ellipse(0, 0, 25, 25);
				if (P2.speedX > 0) {
					if (P2.speedX > 0.1) {
						P2.speedX -= 0.1;
					}
					else {
						P2.speedX = 0;
					}
				}
				else if (P2.speedX < 0) {
					if (P2.speedX < -0.1) {
						P2.speedX += 0.1;
					}
					else {
						P2.speedX = 0;
					}
				}
				if (P2.speedY > 0) {
					if (P2.speedY > 0.1) {
						P2.speedY -= 0.1;
					}
					else {
						P2.speedY = 0;
					}
				}
				else if (P2.speedY < 0) {
					if (P2.speedY < -0.1) {
						P2.speedY += 0.1;
					}
					else {
						P2.speedY = 0;
					}
				}
				if (team2[0].posX < -800 || team2[0].posX > 0) {
					P2.speedX = P2.speedX * -1;
					team2[0].posX = constrain(team2[0].posX, -800, 0);
				}
				if (team2[0].posY < -475 || team2[0].posY > 0) {
					P2.speedY = P2.speedY * -1;
					team2[0].posY = constrain(team2[0].posY, -475, 0);
				}
				team2[0].posX += P2.speedX;
				team2[0].posY += P2.speedY;
				if (keyIsDown(P2.Up)) {
					if (keyIsDown(P2.Left)) {
						team2[0].facing = 315;
						P2.speedX = speedPos1 * 2 / 3;
						P2.speedY = speedPos2 * 2 / 3;
					} 
					else if (keyIsDown(P2.Right)) {
						team2[0].facing = 45;
						P2.speedX = speedNeg1 * 2 / 3;
						P2.speedY = speedPos2 * 2 / 3;
					}
					else if (keyIsDown(P2.Down)) {

					}
					else {
						team2[0].facing = 0;
						P2.speedY = speedPos2;
					}
				}
				else if (keyIsDown(P2.Down)) {
					if (keyIsDown(P2.Left)) {
						team2[0].facing = 225;
						P2.speedX = speedPos1 * 2 / 3;
						P2.speedY = speedNeg2 * 2 / 3;
					} 
					else if (keyIsDown(P2.Right)) {
						team2[0].facing = 135;
						P2.speedX = speedNeg1 * 2 / 3;
						P2.speedY = speedNeg2 * 2 / 3;
					}
					else if (keyIsDown(P2.Up)) {
					}
					else {
						team2[0].facing = 180;
						P2.speedY = speedNeg2;
					}
				}
				else if (keyIsDown(P2.Left) && !keyIsDown(P2.Right)) {
					team2[0].facing = 270;
					P2.speedX = speedPos1;
				}
				else if (keyIsDown(P2.Right) && !keyIsDown(P2.Left)) {
					team2[0].facing = 90;
					P2.speedX = speedNeg1;
				}
			}
			else if (PlayerType === 2) {
				resetMatrix();
				fill(team1[1].color);
				translate(-team1[1].posX, -team1[1].posY);
				rotate(team1[1].facing);
				ellipse(0, 0, 50, 15);
				ellipse(0, 0, 25, 25);
				if (P2.speedX > 0) {
					if (P2.speedX > 0.1) {
						P2.speedX -= 0.1;
					}
					else {
						P2.speedX = 0;
					}
				}
				else if (P2.speedX < 0) {
					if (P2.speedX < -0.1) {
						P2.speedX += 0.1;
					}
					else {
						P2.speedX = 0;
					}
				}
				if (P2.speedY > 0) {
					if (P2.speedY > 0.1) {
						P2.speedY -= 0.1;
					}
					else {
						P2.speedY = 0;
					}
				}
				else if (P2.speedY < 0) {
					if (P2.speedY < -0.1) {
						P2.speedY += 0.1;
					}
					else {
						P2.speedY = 0;
					}
				}
				if (team1[1].posX < -800 || team1[1].posX > 0) {
					P2.speedX = P2.speedX * -1;
					team1[1].posX = constrain(team1[1].posX, -800, 0);
				}
				if (team1[1].posY < -475 || team1[1].posY > 0) {
					P2.speedY = P2.speedY * -1;
					team1[1].posY = constrain(team1[1].posY, -475, 0);
				}
				team1[1].posX += P2.speedX;
				team1[1].posY += P2.speedY;
				if (keyIsDown(P2.Up)) {
					if (keyIsDown(P2.Left)) {
						team1[1].facing = 315;
						P2.speedX = speedPos1 * 2 / 3;
						P2.speedY = speedPos2 * 2 / 3;
					} 
					else if (keyIsDown(P2.Right)) {
						team1[1].facing = 45;
						P2.speedX = speedNeg1 * 2 / 3;
						P2.speedY = speedPos2 * 2 / 3;
					}
					else if (keyIsDown(P2.Down)) {

					}
					else {
						team1[1].facing = 0;
						P2.speedY = speedPos2;
					}
				}
				else if (keyIsDown(P2.Down)) {
					if (keyIsDown(P2.Left)) {
						team1[1].facing = 225;
						P2.speedX = speedPos1 * 2 / 3;
						P2.speedY = speedNeg2 * 2 / 3;
					} 
					else if (keyIsDown(P2.Right)) {
						team1[1].facing = 135;
						P2.speedX = speedNeg1 * 2 / 3;
						P2.speedY = speedNeg2 * 2 / 3;
					}
					else if (keyIsDown(P2.Up)) {
					}
					else {
						team1[1].facing = 180;
						P2.speedY = speedNeg2;
					}
				}
				else if (keyIsDown(P2.Left) && !keyIsDown(P2.Right)) {
					team1[1].facing = 270;
					P2.speedX = speedPos1;
				}
				else if (keyIsDown(P2.Right) && !keyIsDown(P2.Left)) {
					team1[1].facing = 90;
					P2.speedX = speedNeg1;
				}
			}
		}
  } 
	else if (Pause) {
		background(220);
		resetMatrix();
		fill(225, 225, 255);
		image(Rinkln, 0, 0, 800, 475);
		drawScore();
		//This is how our animation works in our main screen works
		fill(0, 0, 0);
		ellipse(puck1[0], puck1[1], 20, 20);
		resetMatrix();
		fill(team1[0].color);
		translate(-1 * team1[0].posX, -team1[0].posY);
		rotate(team1[0].facing);
		ellipse(0, 0, 50, 15);
		ellipse(0, 0, 25, 25);
		if (Players === 2) {
			if (PlayerType === 1) {
				resetMatrix();
				fill(team2[0].color);
				translate(-team2[0].posX, -team2[0].posY);
				rotate(team2[0].facing);
				ellipse(0, 0, 50, 15);
				ellipse(0, 0, 25, 25);
			}
			else if (PlayerType === 2) {
				resetMatrix();
				fill(team1[1].color);
				translate(-team1[1].posX, -team1[1].posY);
				rotate(team1[1].facing);
				ellipse(0, 0, 50, 15);
				ellipse(0, 0, 25, 25);
			}
		}
		resetMatrix();
		fill(0, 0, 0, 125);
		rect(0, 0, 801, 801);
		PauseScreen();
		if (mouseIsPressed) {
			detectPauseChange(2);
		}
	}
	else {
		background(220);
		angleMode(DEGREES);
		if (scene === 1) {
			background(220, 220, 220);
			fill(220, 220, 220);
			stroke(0, 0, 0);
			resetMatrix();
			translate(stick1[0], stick1[1]);
			rect(0, 0, 50, 20, 30);
			fill(0, 0, 0);
			rect(20, 0, 5, 20);
			rect(27, 0, 5, 20);
			rect(34, 0, 5, 20);
			fill(220, 220, 220);
			rotate(225);
			rect(-25, -10, 100, 20, 30);
			resetMatrix();
			translate(stick2[0], stick2[1]);
			rotate(180);
			rect(0, 0, 50, 20, 30);
			fill(0, 0, 0);
			rect(20, 0, 5, 20);
			rect(27, 0, 5, 20);
			rect(34, 0, 5, 20);
			fill(220, 220, 220);
			rotate(135);
			rect(-5, -20, 100, 20, 30);
			resetMatrix();
			fill(0, 0, 0);
			ellipse(puck[0], puck[1], 25, 25);
			if (stick1[0] < 50) {
				stick1[3] = 0;
				stick1[0] += 5;
			} 
			else if (stick1[0] > 340 || stick1[3] === 1) {
				stick1[3] = 1;
				stick1[0] -= 5;
			} 
			else {
				stick1[0] += 5;
			}
			if (stick1[1] < 50) {
				stick1[4] = 0;
				stick1[1] += 5;
			} 
			else if (stick1[1] > 370 || stick1[4] === 1) {
				stick1[4] = 1;
				stick1[1] -= 5;
			} 
			else {
				stick1[1] += 5;
			}
			if (stick2[0] < 50) {
				stick2[3] = 0;
				stick2[0] += 5;
			} 
			else if (stick2[0] > 340 || stick2[3] === 1) {
				stick2[3] = 1;
				stick2[0] -= 5;
			} 
			else {
				stick2[0] += 5;
			}
			if (stick2[1] < 50) {
				stick2[4] = 0;
				stick2[1] += 5;
			} 
			else if (stick2[1] > 370 || stick2[4] === 1) {
				stick2[4] = 1;
				stick2[1] -= 5;
			} 
			else {
				stick2[1] += 5;
			}
			if (puck[0] < 50) {
				puck[3] = 0;
				puck[0] += 7;
			} 
			else if (puck[0] > 340 || puck[3] === 1) {
				puck[3] = 1;
				puck[0] -= 7;
			} 
			else {
				puck[0] += 5;
			}
			if (puck[1] < 50) {
				puck[4] = 0;
				puck[1] += 7;
			} 
			else if (puck[1] > 370 || puck[4] === 1) {
				puck[4] = 1;
				puck[1] -= 7;
			} 
			else {
				puck[1] += 7;
			}
			// This displaces our title for our game. 
			textSize(25);
			fill(220, 0, 0);
			text("Hockey Game 9201", 10, 40, 390);
			textSize(12);
			fill(220, 0, 0);
			text("Presented By Rookitmin, Ali596087, and Minirals", 5, 385, 350);
		}
		//This what makes changing keybinds work
		DrawButton();
		buttonArray[5].draw();
		buttonArray[6].draw();
		buttonArray[21].draw();
		buttonArray[22].draw();
		if (changeKey != 0) {
			if(changeKeyPressed && !keyIsPressed) {
			if (changeKey === 1) {
				P1.Up = keyCode;
				P1.keyName.Up = key;
				changeKey = 0;
			}
			if (changeKey === 2) {
				P1.Down = keyCode;
				P1.keyName.Down = key;
				changeKey = 0;
			}
			if (changeKey === 3) {
				P1.Left = keyCode;
				P1.keyName.Left = key;
				changeKey = 0;
			}
			if (changeKey === 4) {
				P1.Right = keyCode;
				P1.keyName.Right = key;
				changeKey = 0;
			}
			if (changeKey === 6) {
				P2.Up = keyCode;
				P2.keyName.Up = key;
				changeKey = 0;
			}
			if (changeKey === 7) {
				P2.Down = keyCode;
				P2.keyName.Down = key;
				changeKey = 0;
			}
			if (changeKey === 8) {
				P2.Left = keyCode;
				P2.keyName.Left = key;
				changeKey = 0;
			}
			if (changeKey === 9) {
				P2.Right = keyCode;
				P2.keyName.Right = key;
				changeKey = 0;
			}	
			if (changeKey === 5) {
				P1.shoot = keyCode;
				P1.keyName.Shoot = key;
				changeKey = 0;
			}
			if (changeKey === 10) {
				P2.shoot = keyCode;
				P2.keyName.Shoot = key;
				changeKey = 0;
			}
				changeKeyPressed = false;
			}
			if (!changeKeyPressed && keyIsPressed) {
				changeKeyPressed = true;
			}
		}
		OneButton = true;
		// if (CompleteControl) {
		// 	sliderPlayerSpeed.hover();
		// 	sliderCPUSpeed.hover();
		// 	if (mouseIsPressed) {
		// 		if (sliderPlayerSpeed.hovering) {
		// 			sliderPlayerSpeed.posChange();
		// 			playerSpeed = sliderPlayerSpeed.pos;
		// 		}
		// 		if (sliderCPUSpeed.hovering) {
		// 			sliderCPUSpeed.posChange();
		// 		}
		// 	}
		// }
		// This keeps our credits scene scrolling down
		if (scene === 7) {
			background(155, 0, 155);
			fill(0, 0, 0);
			textSize(15);
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
		//This tells the player their score
		if (scene === 8) {
			// resizeCanvas(400, 400);
			textSize(35);
			text("Game Over", 100, 100, 200, 200);
			textSize(30);
			fill("black");
			text("Your Score Is:", 100, 150, 200, 150);
			text(Score + " points to " + Score2 + " points.", 100, 200, 200, 100);
		}
		// Here tell's the player their keybinds in the "How to Play"
		if (scene === 4) {
			fill("black");
			textSize(29);
			text("The Keys to Move are " + P2.keyName.Up + " - " + P2.keyName.Down + " - " + P2.keyName.Left + " - " + 
					 P2.keyName.Right + " with " + P2.keyName.Shoot + " to shoot (Player 2) " + 
					 "& " + P1.keyName.Up + " - " + P1.keyName.Down + " - " + P1.keyName.Left + " - " + P1.keyName.Right + " with " + 
					 P1.keyName.Shoot + " to shoot (Player 1). Press [SPACE] to Pause", 50, 50, 300, 300);
		}
  }
}
function mousePressed () {
	cursor(ARROW);
	resizeCanvas(400, 400);
	if (!inGame && !Pause) {
		detectSceneChange();
  }
	if (Pause) {
		detectPauseChange(1);
		resizeCanvas(800, 476);
	}
	if (inGame) {
		resizeCanvas(800, 476);
		console.log("X: " + mouseX + ", Y: " + mouseY);
	}
}

function keyTyped() {
	noCursor();
	if (inGame && key === " ") {
		Pause = true;
		inGame = false;
		scene = 15;
		cursor(ARROW);
	}
	if (key === "j") {
		console.log("T1: " + Score + " T2: " + Score2);
	}
	if (inGame || Pause) {
		resizeCanvas(801, 476);
	}
	else {
		resizeCanvas(400, 400);
	}
}
