


window.addEventListener("load", function(){
	
	var movePlayer = function() {
				
				player.isMoving = true;
				
			};
	var stopPlayer = function() {
		
		player.isMoving = false;
	};
	
	
	
	

			var canvas = document.getElementById("myCanvas");
			var ctx = canvas.getContext("2d");
			
			canvas.addEventListener("mousedown", movePlayer);
			
			canvas.addEventListener("mouseup", stopPlayer);
			
			canvas.addEventListener("touchstart", movePlayer);
			
			canvas.addEventListener("touchend", stopPlayer);
			
			

			//var CANVAS_WIDTH = 900;
			//var CANVAS_HEIGHT = 900;
			//var GAME_WIDTH = 900;
			//var GAME_HEIGHT = 900;
			var CANVAS_WIDTH = 2000;
			var CANVAS_HEIGHT = 1000;
			var GAME_WIDTH = 2000;
			var GAME_HEIGHT = 1000;

			var gameLive = true;

			var player = {
				x : 10,
				y : 500,
				speedX : 10,
				w : 50,
				h : 50,
				isMoving: false,
			};
			
			var goal = {
				
				x: 1950,
				y: 500,
				w: 50,
				h: 36
				
			};
			
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

			var update = function() {
				
				if (player.isMoving) {
					
					
					player.x += player.speedX;
				}
				
				if (checkCollision(player, goal)) {
					gamelive = false;
					alert('You won!');
					window.location = "";
				}
				

				var j = 0;
				var n = enemies.length;

				//while (j < n) {
					// (start; stop; step size)
					

					for (var j = 0; j < enemies.length; j++){
						//check collision

					if(checkCollision(player,enemies[j])){
						
						gameLive = false;
						
						alert('oh no! Game Over!');
						
						window.location = "";
						
						
					}
					
					enemies[j].y += enemies[j].speedY;
					
					if(enemies[j].y>= GAME_HEIGHT){
						
						enemies[j].y = GAME_HEIGHT; //prevent weird round-offs
						enemies[j].speedY *= -1;
						
						
					}
					
					else if(enemies[j].y<= 0){
						
						enemies[j].y = 0;
						enemies[j].speedY *= -1;
						
						
					}
					/*
					//begin of x speed change
					
					enemies[j].x += enemies[j].speedX;
					
					if(enemies[j].x>= GAME_WIDTH){
						
						enemies[j].x = GAME_WIDTH; //prevent weird round-offs
						enemies[j].speedX *= -1;
						
						
					}
					
					else if(enemies[j].x<= 0){
						
						enemies[j].x = 0;
						enemies[j].speedX *= -1;
						
						
					}
					
					
					//end of x movement
					*/ 
					//j++; use this in while loop but already part of the "for" loop

				}

			};

			var draw = function() {
				ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
				
				ctx.drawImage(sprites.background, 0, 0);
				
				
				ctx.fillStyle = "00FF00";
				ctx.fillRect(player.x, player.y, player.w, player.h);
				
				ctx.fillStyle= "rgb(128, 128, 0, 0.5)";
				ctx.fillRect(goal.x, goal.y, goal.w, goal.h);

				
				//ctx.fillStyle = "#3333FF";
				
				// one color for testing the program

				var j = 0;
				var n = enemies.length;

				while (j < n) {
					
					if(enemies[j].speedY > 0){
					ctx.fillStyle = enemies[j].myColor;
					}
					else if(enemies[j].speedY < 0){
						ctx.fillStyle = "#0000FF";
					}
					else {
						ctx.fillStylle = "#000000";
						
					}
					ctx.fillRect(enemies[j].x, enemies[j].y, enemies[j].w, enemies[j].h);
					j++;
				}

			};

			var step = function() {// call yourself is "recursion"

				update();
				draw();


				if (gameLive){
				window.requestAnimationFrame(step);
				}
			};
			
			//checkCollision
			
			var checkCollision = function(rect1, rect2){
				
				var closeOnWidth = Math.abs(rect1.x - rect2.x) <= Math.max(rect1.w, rect2.w);
				var closeOnHeight = Math.abs(rect1.y - rect2.y) <= Math.max(rect1.h, rect2.h);
				
				
				return closeOnHeight && closeOnWidth;
			};
			

			step();

});