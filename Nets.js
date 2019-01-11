function Net (x1, y1, x2, y2) {
	this.p1 = createVector(x1, y1);
	this.p2 = createVector(x2, y2);
	
	this.testPuck = function (pX, pY, pD, team) {
		// console.log("1" + (pX <= this.p2.x));
		// console.log("2: " + pX);
		// console.log("3: " + this.p2.x);
		if (pY > this.p1.y && pY < this.p2.y) { 
			// console.log(16);
			if (round(pX) < this.p2.x && team === 1 && pD > 180 && pD < 360) {
				Score ++;
				puck1 = [400, 200, 0, 0];
				// console.log(15);
			}
			else if (pX > this.p1.x && team === 0 && pD < 180 && pD > 0) {
				Score2 ++;
				puck1 = [400, 200, 0, 0];
				// console.log(17);
			}
		}
	}
}
