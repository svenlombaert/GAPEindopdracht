(function(){

/*globals stage:true, Bound:true, Platform:true, CollisionDetection:true, 
MovingPlatform:true, MovingPlatformUP:true, createjs:true, Reward:true, World:true, Player:true*/
(function(){

	var boxes, movingboxes, player, keys, width, height, x;
	var ticker;
	var world;
	var deathzones;
	var cameras, cameraVisibilities;
	var aantalSwitches;

	function init(){
		console.log('hello world');

		boxes = [];
		movingboxes = [];
		keys = [];
		deathzones = [];
		cameras = [];
		cameras[0] = [];
		cameras[1] = [];
		cameras[2] = [];
		aantalSwitches = 0;
		cameraVisibilities = [];
		stage = new createjs.Stage('cnvs');
		world = new World(1024, 700);

		//dimensions van het canvas
		width = stage.canvas.width;
		height = stage.canvas.height;
		world.boundH = -(world.height-height);
		world.boundW = -(world.width-width);

		buildBounds();
		buildPlatforms();
		//aanmaken player + adden
		player = new Player(10, world.height-80, 20, 20);
		player.gravity = world.gravity;
		player.friction = world.friction;
		world.addChild(player.shape);
		//ticker, voor stage refresh.
		ticker = createjs.Ticker;
		ticker.setFPS('60');
		ticker.addEventListener("tick", update);

		window.onkeydown = keydown;
		window.onkeyup = keyup;

		stage.addChild(world.container);
	}

	function update() {

		if(keys[37]){
			//links
			if(player.velX > -player.speed){
				player.velX --;
			}
		}

		if(keys[38]){
			//omhoog
			if(player.grounded && !player.jumping){
				player.grounded = false;
				player.jumping = true;
				player.velY = -player.speed * 2;
			}
		}

		if(keys[39]){
			//rechts
			if(player.velX < player.speed) {
				player.velX ++;
			}
		}

		player.grounded = false;

		for (var i = 0; i < boxes.length ; i++) {
			
			switch(CollisionDetection.checkCollision(player, boxes[i])){
			case "l":
				player.velX = 0;
			break;
			case "r":
				player.velX = 0;
			break;
			case "t":
				player.velY *= -1;
			break;
			case "b":
				player.grounded = true;
				player.jumping = false;
			break;
			}
		}

		for (var j = 0; j < deathzones.length; j++) {
			switch(CollisionDetection.checkCollision(player, deathzones[j])){

			case "l":
				player.velX = 0;
				player.x = 20;
				player.y = world.height-80;
			break;
			case "r":
				player.velX = 0;
				player.x = 20;
				player.y = world.height-80;
			break;
			case "t":
				player.velY *= -1;
				player.x = 20;
				player.y = world.height-80;
			break;
			case "b":
				player.grounded = true;
				player.jumping = false;
				player.x = 20;
				player.y = world.height-80;
			break;
			}
		}

		player.update();
		stage.update();
	}

	function keydown(event) {
		keys[event.keyCode] = true;

		if(event.keyCode === 90){
			updateCameras(0, false);
			updateCameras(1, true);
			aantalSwitches++;
		document.getElementById("aantal").innerHTML = aantalSwitches;
		}

		if(event.keyCode === 65){
			updateCameras(0, true);
			updateCameras(1, false);
			aantalSwitches++;
		document.getElementById("aantal").innerHTML = aantalSwitches;
		}
	}

	function keyup(event) {
		keys[event.keyCode] = false;
	}

	function buildBounds(){
		boxes.push(new Bound(0, world.height-1, world.width, 1));
		boxes.push(new Bound(0, 0, world.width, 1));
		boxes.push(new Bound(0, 0, 1, world.height));
		boxes.push(new Bound(world.width-1, 0, 1, world.height));

		console.log(boxes);
	}

	function buildPlatforms() {
		var box1 = new Platform(0, height-40 ,200, 40, '#000000');
		var box2 = new Platform(500, height-40, 200, 40, '#000000');
		var box3 = new Platform(700, 40, 150, height-40, '#000000');
		
		var box4 = new Platform(580, height-280, 20, 140, '#000000');
		var box5 = new Platform(0, height - 200, 580, 60, '#000000');

		var box10 = new Platform(100, height - 370, 100, 20, '#000000');
		var box11 = new Platform(80, 0, 20, 350, '#000000');
		var box12 = new Platform(250, height - 330, 50, 20, '#000000');


		//ladder
		var box6 = new Platform(650, height -100, 50, 20, '#000000');
		var box7 = new Platform(600, height -160, 50, 20, '#000000');
		var box8 = new Platform(650, height -220, 50, 20, '#000000');
		var box9 = new Platform(600, height -280, 50, 20, '#000000');

		//Rewards
		var reward = new Reward(10, 10, 15, "#ffd700");

		var movingBox1 = new MovingPlatform(500, height - 100, 100, 20, '#00ff00', 180, 450, 'l', 3000);
		var movingBox2 = new MovingPlatform(80, height - 310, 100, 20, '#00ff00', 80, 500, 'r', 4500);
		var movingBox3 = new MovingPlatformUP(0, height - 310, 80, 20, '#00ff00', height - 310, 50, 'u', 4500);

		var deathzone1 = new Platform(200, height - 40, 300, 40, '#ff0000');
		var deathzone2 = new Platform(0, height - 260, 580, 60, '#ff0000');

		//******VISUEEL WEERGEVEN****////
		world.addChild(box1.shape);
		world.addChild(box2.shape);
		world.addChild(box3.shape);
		world.addChild(box4.shape);
		world.addChild(box5.shape);
		world.addChild(box6.shape);
		world.addChild(box7.shape);
		world.addChild(box8.shape);
		world.addChild(box9.shape);
		world.addChild(box10.shape);
		world.addChild(box11.shape);
		world.addChild(box12.shape);
		world.addChild(deathzone1.shape);
		world.addChild(deathzone2.shape);
		world.addChild(movingBox1.shape);
		world.addChild(movingBox2.shape);
		world.addChild(movingBox3.shape);
		world.addChild(reward.shape);

		//****COLLISION LOGICA*******/
		boxes.push(box1, box2, box3, box4, box5, box6, box7, box8, box9, box10, box11, box12, movingBox1, movingBox2, movingBox3);
		deathzones.push(deathzone1, deathzone2);


		//*******CAMERA LOGICA******//
		//stilstaande platforms + deathzones
		cameras[0].push(box1, box2, box3, box4, box5, box6, box7, box8, box9, box10, box11, box12, deathzone1, deathzone2);

		//bewegende platforms
		cameras[1].push(movingBox1, movingBox2, movingBox3);

		initCameras();
	}

	function initCameras(){
		console.log("init cameras");
		cameraVisibilities[0] = true;
		cameraVisibilities[1] = false;
		console.log(cameras);

		for (var i = 0; i < cameras[1].length; i++){
			cameras[1][i].setVisibility(false);
		}
	}

	function updateCameras(cameraNumber, visibility){

		for(var i = 0; i < cameras[cameraNumber].length; i++){
			cameras[cameraNumber][i].setVisibility(visibility);
			cameraVisibilities[cameraNumber] = visibility;
		}
	}

	init();

})();

var Bound = (function(){

	function Bound(x, y, width, height){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	return Bound;

})();

var CollisionDetection = (function(){

	function CollisionDetection(){

	}

	CollisionDetection.checkCollision = function(shapeA, shapeB){
		//verschil in x en y van de twee shapes;
		var vX = (shapeA.x + (shapeA.width/2)) - (shapeB.x + (shapeB.width/2));
		var vY = (shapeA.y + (shapeA.height/2)) - (shapeB.y + (shapeB.height/2));

		var hWidths = (shapeA.width/2) + (shapeB.width/2);
		var hHeights = (shapeA.height/2) + (shapeB.height/2);
		var colDir = "";

		if(Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
			var oX = hWidths - Math.abs(vX);
			var oY = hHeights - Math.abs(vY);

			if(oX >= oY)
			{
				//top of bottom :')
				if(vY > 0){
					colDir = "t";
					shapeA.y += oY;
			
				}else{
					colDir = "b";
					shapeA.y -= oY;
				}

			}else{
				
				if(vX > 0){
					colDir = "l";
					shapeA.x += oX;
				}else{
					colDir = "r";
					shapeA.x -= oX;
				}

			}

			return colDir;
		}
	};

	return CollisionDetection;

})();

/*globals createjs:true*/
var MovingPlatform = (function(){

	function MovingPlatform(x, y, width, height, color, leftBound, rightBound, startOrientation, speed){
		this.x = x;
		this.y = y;
		this.color = color;
		this.width = width;
		this.height = height;
		this.speed = speed;
		this.orientation = startOrientation;
		this.leftBound = leftBound;
		this.rightBound = rightBound;
		this.shape = new createjs.Shape();
		this.shape.x = this.x;
		this.shape.y = this.y;
		var self = this;
		self.draw();
	}

	MovingPlatform.prototype.draw = function() {
		this.shape.graphics.c();
		this.shape.graphics.f(this.color);
		this.shape.graphics.dr(0, 0, this.width, this.height);
		this.shape.graphics.ef();
		this.move();
	};

	MovingPlatform.prototype.move = function() {
		if(this.orientation === 'l'){
			createjs.Tween.get(this).to({x:this.leftBound}, this.speed).call(this.changeOrientation);
			createjs.Tween.get(this.shape).to({x:this.leftBound}, this.speed);
			console.log(this.x);
		}else{
			createjs.Tween.get(this).to({x:this.rightBound}, this.speed).call(this.changeOrientation);
			createjs.Tween.get(this.shape).to({x:this.rightBound}, this.speed);
		}
	};

	MovingPlatform.prototype.changeOrientation = function() {
		if(this.orientation === 'l') {
			this.orientation = 'r';
		} else {
			this.orientation = 'l';
		}
		this.move();
	};

	MovingPlatform.prototype.setVisibility = function(visible) {
		this.shape.visible = visible;
	};



	return MovingPlatform;

})();

/*globals createjs:true*/
var MovingPlatformUP = (function(){

	function MovingPlatformUP(x, y, width, height, color, downBound, upBound, startOrientation, speed){
		this.x = x;
		this.y = y;
		this.color = color;
		this.width = width;
		this.height = height;
		this.speed = speed;
		this.orientation = startOrientation;
		this.downBound = downBound;
		this.upBound = upBound;
		this.shape = new createjs.Shape();
		this.shape.x = this.x;
		this.shape.y = this.y;
		var self = this;
		self.draw();
	}

	MovingPlatformUP.prototype.draw = function() {
		this.shape.graphics.c();
		this.shape.graphics.f(this.color);
		this.shape.graphics.dr(0, 0, this.width, this.height);
		this.shape.graphics.ef();
		this.move();
	};

	MovingPlatformUP.prototype.move = function() {
		if(this.orientation === 'u'){
			createjs.Tween.get(this).to({y:this.upBound}, this.speed).call(this.changeOrientation);
			createjs.Tween.get(this.shape).to({y:this.upBound}, this.speed);
			console.log(this.y);
		}else{
			createjs.Tween.get(this).to({y:this.downBound}, this.speed).call(this.changeOrientation);
			createjs.Tween.get(this.shape).to({y:this.downBound}, this.speed);
		}
	};

	MovingPlatformUP.prototype.changeOrientation = function() {
		if(this.orientation === 'u') {
			this.orientation = 'd';
		} else {
			this.orientation = 'u';
		}
		this.move();
	};

	MovingPlatformUP.prototype.setVisibility = function(visible) {
		this.shape.visible = visible;
	};



	return MovingPlatformUP;

})();

/*globals createjs:true */
var Platform = (function(){
	
	function Platform(x, y, width, height, color){
		this.x = x;
		this.y = y;
		this.color = color;
		this.width = width;
		this.height = height;
		this.shape = new createjs.Shape();
		this.shape.x = this.x;
		this.shape.y = this.y;
		this.draw();
	}

	Platform.prototype.draw = function() {
		this.shape.graphics.c();
		this.shape.graphics.f(this.color);
		this.shape.graphics.dr(0, 0, this.width, this.height);
		this.shape.graphics.ef();
	};

	Platform.prototype.setVisibility = function(visible) {
		this.shape.visible = visible;
	};

	return Platform;

})();

/*globals createjs:true*/
var Player = (function(){

	function Player(x, y, width, height){
		this.x = x;
		this.y = y;
		this.velX = 0;
		this.velY = 0;
		this.speed = 3;
		this.friction = 0.8;
		this.gravity = 0.3;
		this.grounded = false;
		this.jumping = false;
		this.width = width;
		this.height = height;
		this.shape = new createjs.Shape();
		this.shape.x = this.x;
		this.shape.y = this.y;

		var self = this;
		self.draw();
	}

	Player.prototype.draw = function() {
		this.shape.graphics.f('#79CDCD	');
		this.shape.graphics.dr(0, 0, this.width, this.height);
		this.shape.graphics.ef();
	};

	Player.prototype.update = function() {
		if(this.grounded){
			this.velY = 0;
		}
		this.y += this.velY;
		this.x += this.velX;
		this.shape.x = this.x;
		this.shape.y = this.y;
		//vertraagt de player, als de velocity niet meer geupdate wordt
		this.velX *= this.friction;
		this.velY += this.gravity;
	};

	return Player;

})();

/*globals createjs:true*/
var Reward = (function(){
	
	function Reward(x, y, radius, color){
		this.x = x;
		this.y = y;
		this.color = color;
		this.radius = radius;
		this.shape = new createjs.Shape();
		this.shape.x = this.x;
		this.shape.y = this.y;
		this.draw();
	}

	Reward.prototype.draw = function() {
		this.shape.graphics.c();
		this.shape.graphics.f(this.color);
		this.shape.graphics.dc(this.x + (this.radius/2), this.y + (this.radius/2), this.radius);
		this.shape.graphics.ef();
	};

	Reward.prototype.setVisibility = function(visible) {
		this.shape.visible = visible;
	};

	return Reward;

})();

/*globals createjs:true*/
var World =(function(){
	var boundH, boundW;

	function World(width, height) {
		this.friction = 0.8;
		this.gravity = 0.3;
		this.width = width;
		this.height = height;

		this.container = new createjs.Container();
	}

	World.prototype.addChild = function(element) {
		this.container.addChild(element);
	};

	/*World.prototype.followPlayerX = function(player, width, offset) {
		var x = -(player.x - (width/2)) + offset;
		if(x < this.boundW) {
			this.container.x = this.boundW;
		}else if(x > 0) {
			this.container.x = 0;
		}else {
			this.container.x = x;
		}
	};

	World.prototype.followPlayerY = function(player, height, offset) {
		var y = -(player.y - (height/2)) + offset;
		if(y < this.boundH) {
			this.container.y = this.boundH;
		}else if(y > 0) {
			this.container.y = 0;
		}else {
			this.container.y = y;
		}
	};*/

	return World;

})();

})();