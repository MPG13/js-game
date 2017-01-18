
window.addEventListener('load', function(){
			var CANVAS_WIDTH = 2000;
			var CANVAS_HEIGHT = 1000;
			var GAME_WIDTH = 2000;
			var GAME_HEIGHT = 1000;

var sprites = {};

var gameLive = true;

// array [] holds MANY values
var enemies = [{
				x : 50,
				y : 22,
				speedY : 2,
				w : 10,
				h : 10,
				myColor : "#000066"
			}, {
				x : 75,
				y : 20,
				speedY : 4,
				w : 15,
				h : 15,
				myColor : "#339933"
			}, {
				x : 100,
				y : 18,
				speedY : 6,
				w : 20,
				h : 20,
				myColor : "#ff0000"
			}, {
				x : 300,
				y : 16,
				speedY : 8,
				w : 25,
				h : 25,
				myColor : "#ffff99"
			}, {
				x : 500,
				y : 14,
				speedY : 10,
				w : 30,
				h : 30,
				myColor : "#990000"
			}, {
				x : 700,
				y : 12,
				speedY : 12,
				w : 35,
				h : 35,
				myColor : "#FF9900"
			}, {
				x : 900,
				y : 10,
				speedY : 14,
				w : 40,
				h : 40,
				myColor : "#6699ff"
			}, {
				x : 1100,
				y : 8,
				speedY : 16,
				w : 45,
				h : 45,
				myColor : "#333300"
			}, {
				x : 1300,
				y : 6,
				speedY : 18,
				w : 50,
				h : 50,
				myColor : "#cc6600"
			}, {
				x : 1500,
				y : 4,
				speedY : 20,
				w : 55,
				h : 55,
				myColor : "#cc33ff"
			}, {
				x : 1700,
				y : 2,
				speedY : 22,
				w : 60,
				h : 60,
				myColor : "#FF0000"
			}, {
				x : 1900,
				y : 0,
				speedY : 24,
				w : 65,
				h : 65,
				myColor : "#FFCC00"
				
			},
			];


var goal = {
				
				x: 1950,
				y: 500,
				w: 50,
				h: 36
				
			};


var player = {
				x : 10,
				y : 500,
				speedX : 10,
				w : 50,
				h : 50,
				isMoving: false,
			};

var movePlayer = function(){
player.isMoving = true;
};

var stopPlayer = function(){
player.isMoving = false;
};

var load = function(){
sprites.player = new Image();
sprites.player.src = 'sprites/hero.png';

sprites.goal = new Image();
sprites.goal.src = 'sprites/chest.png';

sprites.enemy = new Image();
sprites.enemy.src = 'sprites/enemy.png';

sprites.background = new Image();
sprites.background.src = 'sprites/floor.png';	
	
};


var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

canvas.addEventListener("mousedown", movePlayer );
canvas.addEventListener("mouseup", stopPlayer );
canvas.addEventListener("touchstart", movePlayer);
canvas.addEventListener("touchend", stopPlayer);

var update = function() {

var j = 0;
var n = enemies.length;

if(checkCollision(player, goal)){
	
	gameLive = false;
	alert('Ya freakin winner');
	// later bump up the difficulty level here
	window.location = "";
	
}

if (player.isMoving){
	player.x += player.speedX;
}

// EXAMPLE OF FOREACH LOOPING
enemies.forEach(function(element, index){
element.y += element.speedY;

// test for collision between player and EACH of the enemies
if(checkCollision(player, element)){
	gameLive = false;
	alert('Ya darn loser!');
	window.location = "";
}


if (element.y >= GAME_HEIGHT){ // check if hitting the bottom, if so flip direction

element.y = GAME_HEIGHT;
element.speedY *= -1;
} else if (element.y <= 0){ // check if hitting top

element.y = 0;
element.speedY *= -1;
}
}); // end of forEach



};  // end of update

var draw = function() {
ctx.clearRect(0, 0, GAME_WIDTH, CANVAS_HEIGHT);

ctx.drawImage(sprites.background, 0, 0);
ctx.drawImage(sprites.player, player.x, player.y);
ctx.drawImage(sprites.goal, goal.x, goal.y);
//ctx.drawImage(sprites.enemies, enemies.x, enemies.y);


//ctx.fillStyle = "rgba(128, 128, 0, 0.6)";
//ctx.fillRect(goal.x, goal.y, goal.w, goal.h);

//ctx.fillStyle = "#000000";
//ctx.fillRect(player.x, player.y, player.w, player.h);

// EXAMPLE OF FOR LOOPING
for (var j = 0; j < enemies.length; j++){
/*
if (enemies[j].speedY > 0){    // going down
ctx.fillStyle = enemies[j].downColor;
}
else if (enemies[j].speedY < 0) {  // going up
ctx.fillStyle = enemies[j].upColor;
}
else {
ctx.fillStyle = "#000000";
}
*/
ctx.fillRect(enemies[j].x, enemies[j].y, enemies[j].w, enemies[j].h );

}

}; // end of draw()

var step = function() {
update();
draw();

if (gameLive){
window.requestAnimationFrame(step);
};


};


var checkCollision = function(rect1, rect2){
	var closeOnWidth = Math.abs(rect1.x - rect2.x) <= Math.max(rect1.w, rect2.w);
	var closeOnHeight = Math.abs(rect1.y - rect2.y) <= Math.max(rect1.h, rect2.h);
	return closeOnWidth && closeOnHeight;
};

load();
step();

}); // end of load event