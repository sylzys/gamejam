function Enemy() {
	var x;
	var y;
	var damage;
	var img;
	var speed;
	var life;

	this.getX = function(){
		return this.x;
	}
	this.getY = function(){
		return this.y;
	}
	this.getDamage = function(){
		return this.damage;
	}
	this.getImg = function(){
		return this.img;
	}
	this.getSpeed = function(){
		return this.speed;
	}
	this.getLife = function(){
		return this.life;
	}
	this.getSide = function(){
		return this.side;
	}
	this.setX = function(_x){
		this.x = _x;
	}
	this.setY = function(_y){
		this.y = _y;
	}
	this.setDamage = function(_d){
		this.damage = _d;
	}
	this.setSpeed = function(_s){
		this.speed = _s;
	}
	this.setLife = function(_f){
		this.life = _f;
	}
	this.setSide = function(_sd){
		this.side = _sd;
	}
	this.setEnemy = function(x, y , damage, img, speed, life, side) {
		this.x = x;
		this.y = y;
		this.img = img;
		this.damage = damage;
		this.speed = speed;
		this.life = life;
		this.side = side;
	}
}