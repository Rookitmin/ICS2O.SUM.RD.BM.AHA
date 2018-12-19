function Net (x1, y1, x2, y2, facing) {
	this.p1 = createVector(x1, y1);
	this.p2 = createVector(x2, y2);
	this.facing = facing;
	this.testPuck = function (pX, pY, pD, team) {
		if (pX > this.p1.x && pX < this.p2.x && ((pY >= this.p1.y && this.facing === 1 && pD > 90 && pD < 270) || (pY <= this.p1.y && this.facing === -1))) {
			if (team === 1) {
				score.t1 ++;
			}
			else {
				score.t2 ++;
			}
		}
	}
	
	this.draw = function () {
		stroke(0, 0, 0);
		strokeWeight(5);
		if (this.facing === 0) {
			line(this.p1.x, this.p1.y, this.p1.x, this.p2.y);
			line(this.p1.x, this.p2.y, this.p2.x, this.p2.y);
			line(this.p2.x, this.p2.y, this.p2.x, this.p1.y);
		}
		else {
			line(this.p1.x, this.p1.y, this.p1.x, this.p2.y);
			line(this.p1.x, this.p1.y, this.p2.x, this.p1.y);
			line(this.p2.x, this.p2.y, this.p2.x, this.p1.y);
		}
		strokeWeight(1);
	}
}
