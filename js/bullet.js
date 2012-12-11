function Bullet() {
	var x;
	var y;
	var damage;
	var img;

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
	this.setX = function(_x){
		this.x = _x;
	}
	this.setY = function(_y){
		this.y = _y;
	}
	this.setDamage = function(_d){
		this.damage = _d;
	}

	this.setBullet = function(x, y , damage, img) {
		this.x = x;
		this.y = y;
		this.img = img;
		this.damage = damage;
	}
}