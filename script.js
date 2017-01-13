var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var CANVAS_WIDTH = 2000;
var CANVAS_HEIGHT = 1000;
var GAME_WIDTH = 2000;
var GAME_HEIGHT = 1000;

var enemies = [{
x : 50,
y : 0,
speedY : 1,
w : 04,
h : 04,
myColor : "#000066"
	}, {
x : 75,
y : 0,
speedY : 2,
w : 08,
h : 08,
myColor : "#339933"
	}, {
x : 100,
y : 0,
speedY : 3,
w : 12,
h : 12,
myColor : "#ff0000"
	}, {
x : 300,
y : 0,
speedY : 4,
w : 16,
h : 16,
myColor : "#ffff99"
	}, {
x : 500,
y : 0,
speedY : 5,
w : 20,
h : 20,
myColor : "#990000"
	}, {
x : 700,
y : 0,
speedY : 6,
w : 24,
h : 24,
myColor : "#FF9900"
	}, {
x : 900,
y : 0,
speedY : 7,
w : 28,
h : 28,
myColor : "#6699ff"
	}, {
x : 1100,
y : 0,
speedY : 8,
w : 32,
h : 32,
myColor : "#333300"
	}, {
x : 1300,
y : 0,
speedY : 9,
w : 36,
h : 36,
myColor : "#cc6600"
	}, {
x : 1500,
y : 0,
speedY : 10,
w : 40,
h : 40,
myColor : "#cc33ff"
	}, {
x : 1700,
y : 0,
speedY : 11,
w : 44,
h : 44,
myColor : "#FF0000"
	}, {
x : 1900,
y : 0,
speedY : 12,
w : 48,
h : 48,
myColor : "#FFCC00"
}];

var update = function() {
	var j = 0;
	var n = enemies.length;
	while (j < n) {
		enemies[j].y += enemies[j].speedY;
		if (enemies[j].y >= GAME_HEIGHT) {
			enemies[j].y = GAME_HEIGHT;
			enemies[j].speedY *= -1;

		} else if (enemies[j].y <= 0) {
			enemies[j].y = 0;
			enemies[j].speedY *= -1;
		}
		j++;
	}
};

var draw = function() {
	
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		var myColor = "#FFFF00";
		//ctx.fillStyle = "#3333FF";  // one color, for preliminary testing

	var j = 0;
	var n = enemies.length;

	while (j < n) {
		if (enemies[j].speedY > 0 ){ // if y is + (down) use custom color
			ctx.fillStyle = enemies[j].myColor;
			}
		else if (enemies[j].speedY < 0 ){ // y is - so give fixed color
			ctx.fillStyle = "#0000FF";
		}
		else {
			ctx.fillStyle = "#000000";
		}
	
		ctx.fillRect(enemies[j].x, enemies[j].y, enemies[j].w, enemies[j].h);
		j++;
	}

};

var step = function() {// call yourself is "recursion"

	update();
	draw();

	window.requestAnimationFrame(step);

};

step();
