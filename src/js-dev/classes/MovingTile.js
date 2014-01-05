/*globals createjs:true*/
var MovingTile = (function(){

	function MovingTile(sprite, tilewidth, tileheight, target, speed){
		this.sprite = sprite;
		this.width = tilewidth;
		this.height = tileheight;
		this.speed = speed;
		this.target = target;
		this.displayobject = new createjs.Container();
		this.originalX = this.x = this.displayobject.x = this.sprite.x;
		this.originalY = this.y = this.displayobject.y = this.sprite.y;
		this.displayobject.name = name;
		this.displayobject.obj = this;
		this.displayobject.width = this.width;
		this.displayobject.height = this.height;
		this.sprite.x = 0;
		this.sprite.y = 0;
		this.displayobject.addChild(this.sprite);
		this.moveToTarget();
	}

	MovingTile.prototype.moveToTarget = function() {
		if(this.x < this.target.x){
			this.x += -0.8;
		}

		//createjs.Tween.get(this.displayobject, {override:true, loop:true}).to({x:this.target.x, y: this.target.y}, 2000).to({x:this.originalX, y:this.originalY}, 2000).addEventListener("change", this.setPosition.bind(this));
		//createjs.Tween.get(self.displayobject, {override:true, loop:true}).wait(2000).to({x:self.originalX, y: self.originalY}, 2000).addEventListener("change", self.setPosition.bind(self));
	};

	MovingTile.prototype.moveToOrigin = function() {
		var self = this;
		console.log(self);
		
	};

	MovingTile.prototype.setPosition = function() {
		this.x = this.displayobject.x;
		this.y = this.displayobject.y;
	};

	return MovingTile;

})();