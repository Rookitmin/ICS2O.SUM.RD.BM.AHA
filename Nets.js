function Net (x1, y1, x2, y2, facing) {
	this.p1 = createVector(x1, y1);
	this.p2 = createVector(x2, y2);
	this.facing = facing;
	
	this.testPuck = function (pX, pY, pD, team) {
		console.log("1" + (pX <= this.p1.X));
		if (pY > this.p1.y && pY < this.p2.y && 
				((pX <= this.p1.x && this.facing === 1 && pD > 180 && pD < 360) || 
				 (pX >= this.p1.X && this.facing === -1 && pD < 180 && pD > 0))) {
			console.log(16);
			if (team === 1) {
				Score ++;
				puck1 = [400, 200, 0, 0];
				console.log(15);
			}
			else {
				Score2 ++;
				puck1 = [400, 200, 0, 0];
				console.log(17);
			}
		}
	}
}
