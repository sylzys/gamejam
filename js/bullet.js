function Bullet() {
	var x;
	var y;
	var damage;
	var img;
	var active;
	var side;

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
	this.getActive = function(){
		return this.active;
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
	this.setActive = function(_a){
		this.active = _a;
	}
	// this.setSide = function(_s){
	// 	this.side = _s;
	// }

	this.setBullet = function(x, y, damage, img, side, active=true) {
		this.x = x;
		this.y = y;
		this.img = img;
		this.damage = damage;
		this.active = active;
		this.side = side;
	}
}