function Explosion() {
	var x;
	var y;
	var time;
	var img;
	

	this.getX = function(){
		return this.x;
	}
	this.getY = function(){
		return this.y;
	}
	this.getTime = function(){
		return this.time;
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
	this.setTime = function(_d){
		this.time = _d;
	}
	this.setImg = function(_i){
		this.img = _i;
	}
	
	this.setExplosion = function(x, y, time, img) {
		this.x = x;
		this.y = y;
		this.img = img;
		this.time = time;
		
	}
}