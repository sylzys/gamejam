function Bonus() {
	var x;
	var y;
	var img;
	var active;
	var type;

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
	this.getType = function(){
		return this.type;
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
	this.setType = function(_t){
		this.type = _t;
	}

	this.setBonus = function(x, y, img, type, active=true) {
		this.x = x;
		this.y = y;
		this.img = img;
		this.active = active;
		this.type = type;
	}
}