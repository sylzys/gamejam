var stage;
var canvas;
var bg;
var gfxLoaded = 0;
var scientist;
var sc;
var speed = 8;
var moveLeft = false;
var moveRight = false;
var moveUp = false;
var moveDown = false;
var BULLET_SPEED = 15;
var SCREEN_WIDTH = 800;
var SCREEN_HEIGHT = 480;
var CURRENT_WEAPON = 1;

var AMMO2_LEFT = 9;
var AMMO3_LEFT = 6;
var AMMO4_LEFT = 4;
var LIFE = 3;

var MUSIC = 1;
var FX = 1;

var f1 = new Image();
var f2 = new Image();
var f3 = new Image();
var f4 = new Image();
var h = new Image();
var sound = new Image();
var fx = new Image();
var bullets = new Array();
var score;
var myContext;
var player_x;
var player_y;
var fxUpUrl = "sounds/flame.ogg";

function init() {

//INIT FIOLES
f1.src = ("images/fiole1.png");
f2.src = ("images/fiole2.png");
f3.src = ("images/fiole3.png");
f4.src = ("images/fiole4.png");
h.src = ("images/heart.png");
sound.src = ("images/music.png");
fx.src = ("images/fx.png");
// SOUNDS
myAudio = new Audio('sounds/main.ogg');
myAudio.addEventListener('ended', function() {
	this.currentTime = 0;
	this.play();
}, false);
//myAudio.play();

canvas = document.getElementById("canvas");
myContext = (canvas.getContext("2d"));

//TIMER

var timer = self.setInterval("tick()", 1000/30);

//BACKGROUND
bg = new Image();
bg.src = 'images/bg.png';


//SCIENTIST
sc = new Image();

sc.src  = "images/scientist.png";
player_x = 50; //placement en X
player_y = SCREEN_HEIGHT - 150; //placement en Y

score = 0;

//KEYBOARD
document.onkeydown = onKeyDown;
document.onkeyup = onKeyUp;
}

function onKeyDown(e) {
	if(!e){ var e = window.event; }
	console.log("key" + e.keyCode);
	switch(e.keyCode) {
        // left
        case 37: moveLeft = true; moveRight = false;
        break;
        // up
        case 38: moveUp = true; moveDown = false;
        propulse();
        soundPropulse();
        break;
        // right
        case 39: moveRight = true; moveLeft = false;
        break;
        // down
        case 40: moveDown = true; moveUp = false;
        break;
        //fire
        // case 32: fire();
        // break;
        case 49: CURRENT_WEAPON = 1;
        break;
        case 50: CURRENT_WEAPON = 2;
        break;
        case 51: CURRENT_WEAPON = 3;
        break;
        case 52: CURRENT_WEAPON = 4;
        break;

    }
}

function onKeyUp(e) {
	if(!e){ var e = window.event; }
	console.log(e.keyCode);
	switch(e.keyCode) {
        // left
        case 37: moveLeft = false;
        break;
        // up
        case 38: moveUp = false;
        break;
        // right
        case 39: moveRight = false;
        break;
        // down
        case 40: moveDown = false;
        break;
        case 32:
        fire();
        break;
    }
}

function propulse(){
	f = new Image();
	f.src  = "images/fire1.png";
	myContext.drawImage(f,player_x - 5, player_y + 55);
}
function soundPropulse(){
	var fxUp = new Audio(fxUpUrl);
	fxUp.play();

}

function checkMovement() {
	if(moveLeft)
	{
		player_x -= speed;
		if(player_x < 10)
			player_x = 10;
	}
	else if(moveRight)
	{
		player_x += speed;
		if(player_x > SCREEN_WIDTH - 60)
			player_x = SCREEN_WIDTH - 60;
	}

	if(moveUp)
	{
		if(player_y - speed > 24)
			player_y -= speed * 2;
	}
	else if(moveDown)
	{
		if(player_y + speed < SCREEN_HEIGHT - 150)
			player_y += speed;
	}
}

function fire(){
	var damage = 0;
	f = new Image();
	switch (CURRENT_WEAPON) {
		case 1:
		f.src  = "images/fiole1.png";
		damage = 10;
		break;
		case 2:
		damage = 20;
		if (AMMO2_LEFT === 0) {
			CURRENT_WEAPON = 1;
			f.src  = "images/fiole1.png";
		}
		else {
			f.src  = "images/fiole2.png";
			AMMO2_LEFT -= 1;
		}
		break;
		case 3:
		damage = 30;
		if (AMMO3_LEFT === 0) {
			CURRENT_WEAPON = 1;
			f.src  = "images/fiole1.png";
		}
		else {
			f.src  = "images/fiole3.png";
			AMMO3_LEFT -= 1;
		}
		break;
		case 4:
		damage = 40;
		if (AMMO4_LEFT === 0) {
			CURRENT_WEAPON = 1;
			f.src  = "images/fiole1.png";
		}
		else {
			f.src  = "images/fiole4.png";
			AMMO4_LEFT -= 1;
		}
		break;
	}

	//PLAY FX  IF FX ENABLED
	if (FX == 1){
		myLaser = new Audio('sounds/Laser.ogg');
		myLaser.play();
	}
	var b = new Bullet();
	b.setBullet(player_x + 50, player_y + 20, damage, f);
	bullets.push(b);

	console.log(b.getX());
	myContext.drawImage(f, b.getX(),  b.getY());
}

function updateBullets() {
	var i;
	//console.log(bullets[0].getX);
	var limit = bullets.length;
	for (i=0; i < limit; i++)
	{

		bullets[i].setX(bullets[i].getX() + BULLET_SPEED);
		myContext.drawImage(bullets[i].getImg(), bullets[i].getX() - 30, bullets[i].getY());
		if (bullets[i].getX() > SCREEN_WIDTH - 20){
			//stage.removeChild(bullets[i]);
			bullets.shift();
		}
	}
}

function updateScientist() {
	fireUp = new Image();
	if(player_y + speed / 4 < SCREEN_HEIGHT - 150)
	{
		player_y += speed / 4;
		fireUp.src  = "images/fire2.png";

		myContext.drawImage(fireUp, player_x - 5, player_y + 55);
	}

}

function clearScreen ()
{
	myContext.drawImage(bg, 0, 0);

}
function draw() {
	myContext.drawImage(sc, player_x, player_y);
}
function draw_menu() {
	myContext.font = "bold 16px sans-serif";
	myContext.fillStyle = "orange";
	myContext.fillText("Score : 9999999" + score, 10, SCREEN_HEIGHT - 10);

	//Images menu
	myContext.drawImage(f1, 150, SCREEN_HEIGHT - 40);
	myContext.drawImage(f2, 220, SCREEN_HEIGHT - 40);
	myContext.drawImage(f3, 300, SCREEN_HEIGHT - 40);
	myContext.drawImage(f4, 360, SCREEN_HEIGHT - 40);
	myContext.drawImage(h, 440, SCREEN_HEIGHT - 40);
	myContext.drawImage(sound, 720, SCREEN_HEIGHT - 40);
	myContext.drawImage(fx, 755, SCREEN_HEIGHT - 40);
	//Textes menu
	myContext.font = "bold 28px sans-serif";
	myContext.fillText("∞", 190, SCREEN_HEIGHT - 10);
	myContext.fillText(AMMO2_LEFT, 260, SCREEN_HEIGHT - 10);
	myContext.fillText(AMMO3_LEFT, 330, SCREEN_HEIGHT - 10);
	myContext.fillText(AMMO4_LEFT, 400, SCREEN_HEIGHT - 10);
	myContext.fillText(LIFE, 480, SCREEN_HEIGHT - 10);
}
function tick() {

	clearScreen();
	checkMovement();
	updateScientist();
	updateBullets();
	draw();
	draw_menu();
}

//JQUERY

$(document).ready(function(){
	function checkCoordinates(x, y){
		//CHECK IF CLICKED ON SOUND
		if((x >= 720 && x <= 752) && (y <= SCREEN_HEIGHT - 10 && y >= SCREEN_HEIGHT - 42)){
			if (MUSIC == 1){
				MUSIC = 0;
				sound.src = "images/music-off.png";
				myAudio.pause();
			}
			else {
				MUSIC = 1;
				sound.src = "images/music.png";
				myAudio.play();
			}
		}
		//CHECK IF CLICKED ON FX
		if((x >= 755 && x <= 787) && (y <= SCREEN_HEIGHT - 10 && y >= SCREEN_HEIGHT - 42)){
			if (FX == 1){
				FX = 0;
				fx.src = "images/fx-off.png";
			}
			else {
				FX = 1;
				fx.src = "images/fx.png";
			}
		}
	}

	function getPosition(e) {

		var targ;
		if (!e)
			e = window.event;
		if (e.target)
			targ = e.target;
		else if (e.srcElement)
			targ = e.srcElement;
    if (targ.nodeType == 3) // defeat Safari bug
    	targ = targ.parentNode;

    // jQuery normalizes the pageX and pageY
    // pageX,Y are the mouse positions relative to the document
    // offset() returns the position of the element relative to the document
    var x = e.pageX - $(targ).offset().left;
    var y = e.pageY - $(targ).offset().top;

    return {"x": x, "y": y};
};


$("#canvas").click(function(event) {
	// jQuery would normalize the event
	position = getPosition(event);
	checkCoordinates(position.x, position.y);
	//alert("X: " + position.x + " Y: " + position.y);
});
});