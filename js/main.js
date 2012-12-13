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
var ENEMY_LAUNCHED = 0;
var AMMO2_LEFT = 9;
var AMMO3_LEFT = 6;
var AMMO4_LEFT = 4;
var END_WAVE = 0;
var BOSS = 0;
var LIFE = 10;
var WAVE = 1;
var MUSIC = 1;
var FX = 1;
var FRAME_TIMEOUT = 0;
var LAUNCH_RATE = 100;
var f1 = new Image();
var f2 = new Image();
var f3 = new Image();
var f4 = new Image();
var h = new Image();
var sound = new Image();
var fx = new Image();
var bullets = new Array();
var enemies = new Array();
var explosions = new Array();
var images = new Array();
var score;
var myContext;
var player_x;
var player_y;
var fxUpUrl = "sounds/flame.ogg";

function init() {
	l1 = new Image();
	l1.src = "images/level1.png";
	canvas = document.getElementById("canvas");
	myContext = (canvas.getContext("2d"));
	setTimeout (function() {
		//console.log("using " +l.src);
		myContext.drawImage(l1, SCREEN_WIDTH / 4, SCREEN_HEIGHT / 4);
	}, 100);
	setTimeout (function() {
		start();
	}, 3000);

}
function start() {
//INIT FIOLES

f1.src = ("images/fiole1.png");
f2.src = ("images/fiole2.png");
f3.src = ("images/fiole3.png");
f4.src = ("images/fiole4.png");
h.src = ("images/heart.png");
sound.src = ("images/music.png");
fx.src = ("images/fx.png");
l1 = new Image();
l2 = new Image();
l3 = new Image();
l4 = new Image();
l5 = new Image();
lgo = new Image();
l1.src = "images/level1.png";
l2.src = "images/level2.png";
l3.src = "images/level3.png";
l4.src = "images/level4.png";
l5.src = "images/level5.png";
lgo.src = "images/game-over.png";
images.push(l1);
images.push(l2);
images.push(l3);
images.push(l4);
images.push(l5);
images.push(lgo);
// SOUNDS
myAudio = new Audio('sounds/main.ogg');
myAudio.addEventListener('ended', function() {
	this.currentTime = 0;
	this.play();
}, false);
//myAudio.play();



//TIMER
END_WAVE = 0;
var timer = self.setInterval("tick()", 1000/30);

//clean bullet tab
var timer_tab = self.setInterval("clean_tabs()", 10000);

//launch_wave
// setInterval(launch_wave, 3000);
// window.setInterval( function() {
//   launch_wave;
// }, 3000)
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
	//console.log("key" + e.keyCode);
	switch(e.keyCode) {
        // left
        case 37: moveLeft = true; moveRight = false;
        break;
        // up
        case 38: moveUp = true; moveDown = false;
        propulse();
        if (FX == 1)
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
	//console.log(e.keyCode);
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
        //test purpose to launch ennemy
        case 69: //'E'
        //launch_ennemy();
    }
}

function launch_ennemy(){
	var x;
	var side;
	var randomnumber;
	var time;
	var speed;
	var e;
	var NB;
	var SIDE;
	var MAX_DAMAGE;

	switch (WAVE){
		case 1:
		NB = 12;
		SIDE = "left";
		MAX_DAMAGE = 3;
		MIN_DAMAGE = 1;
		break;

		case 2:
		NB = 14;
		SIDE = "right";
		MIN_DAMAGE = 2;
		MAX_DAMAGE = 5;
		break;

		case 3:
		NB = 16;
		SIDE = "both";
		MIN_DAMAGE = 2;
		MAX_DAMAGE = 5;
		break;

		case 4:
		NB = 18;
		SIDE = "both";
		MIN_DAMAGE = 3;
		MAX_DAMAGE = 7;
		break;

		case 5:
		NB = 20;
		SIDE = "both";
		MIN_DAMAGE = 4;
		MAX_DAMAGE = 7;
		break;
	}
	//console.log("launch -> "+ENEMY_LAUNCHED + " // " + enemies.length);
	if (ENEMY_LAUNCHED < NB){
		speed = Math.floor(Math.random()*10)+1;
	life = Math.round((Math.random()*(MAX_DAMAGE * 10-MIN_DAMAGE * 10)+MIN_DAMAGE * 10)/10)*10;//Math.floor(Math.random()*MAX_DAMAGE * 10) + MIN_DAMAGE * 10;
		//console.log("random is "+life);
		randomnumber=Math.floor(Math.random()*300);

		if (SIDE == "both"){
			if (randomnumber % 2 == 0)
				side = "left";
			else
				side = "right";
		}
		else
			side = SIDE;
		f = new Image();
		f.src = "images/snake"+(life / 10)+"-"+SIDE+".png";
		//console.log ("spawning "+f.src);
		e = new Enemy();
	//function(x, y , damage, img, speed, life, side)
	if (side == "left")
		x = 0;
	else x = SCREEN_WIDTH;
	
	e.setEnemy(x, randomnumber, 30, f, speed, life, side);
	enemies.push(e);

	//console.log("eX "+ e.getX());
	myContext.drawImage(f, e.getX(), e.getY());
	ENEMY_LAUNCHED++;
	console.log(ENEMY_LAUNCHED);
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
		if(player_y - speed > 10)
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

	//console.log(b.getX());
	myContext.drawImage(f, b.getX(),  b.getY());
}

function updateBullets() {
	var i;

	var limit = bullets.length;
	for (i=0; i < limit; i++)
	{
		//console.log(bullets[i].getActive());
		if (bullets[i].getActive()){
			bullets[i].setX(bullets[i].getX() + BULLET_SPEED);
			myContext.drawImage(bullets[i].getImg(), bullets[i].getX() - 30, bullets[i].getY());
		}
		if (bullets[i].getX() > SCREEN_WIDTH - 20){
			//stage.removeChild(bullets[i]);
			bullets[i].setActive(false);
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

function updateEnemies() {
	var i;
	//console.log(bullets[0].getX);
	var limit = enemies.length;
	//console.log("limits :" +enemies.length);
	for (i=0; i < limit; i++)
	{
		//console.log("sidqsde : "+enemies[0].getY() + enemies[0].getSide());
		if (enemies[i].getSide() == "left" && enemies[i].getLife() > 0) {
			enemies[i].setX(enemies[i].getX() - enemies[i].getSpeed());
			myContext.drawImage(enemies[i].getImg(), enemies[i].getX(), enemies[i].getY());
			if (enemies[i].getX() <  20){
			//stage.removeChild(bullets[i]);
			enemies[i].changeSide();
		}
	}
	else if (enemies[i].getSide() == "right" && enemies[i].getLife() > 0) {
		enemies[i].setX(enemies[i].getX() + enemies[i].getSpeed());
		myContext.drawImage(enemies[i].getImg(), enemies[i].getX(), enemies[i].getY());
		if (enemies[i].getX() >  750){
			//stage.removeChild(bullets[i]);
			enemies[i].changeSide();
		}
	}
}
}

function checkExplosions()
{
	var limit = explosions.length;
	var time = new Date().getTime();
	for (i = 0; i < limit; i++) {
		//console.log("explo: "+time - explosions[i].getTime()+"/n");
		if (time - explosions[i].getTime() < 300)
			myContext.drawImage(explosions[i].getImg(), explosions[i].getX(), explosions[i].getY());
		else
			explosions.splice(i, 1);
	}

}

function checkCollide(){
	var i;

	var limit = enemies.length;
	var b_limit = bullets.length;

	//COLLISION PLAYER / ENEMY
	for (i=0; i < limit; i++)
	{

		if (Math.abs(player_x - enemies[i].getX()) < 40 && Math.abs(player_y - enemies[i].getY()) < 40){
			myDeath = new Audio("sounds/explosion.ogg");
			myDeath.play();
			t = new Image();
			t.src = "images/explosion.png";
			myContext.drawImage(t, 100, 100);
			decrease_life();
		}
	}
	//COLLISION BULLET / ENEMY
	for (i=0; i < limit; i++) //enemey
	{
		for (j = 0; j <b_limit; j++) {

			if (Math.abs(bullets[j].getX() - enemies[i].getX()) < 40 && Math.abs(bullets[j].getY() - enemies[i].getY()) < 40 && bullets[j].getActive()){
				bullets[j].setActive(false);
				y = bullets[j].getY() - enemies[i].getY();
				x =bullets[j].getX() - enemies[i].getX()
				//console.log("i : "+i + " j : "+j+" --> "+x+ "// "+ y+"\n");
				if (FX == 1){
					myDeath = new Audio("sounds/explosion.ogg");
					myDeath.play();
				}
				t = new Image();
				//console.log("damB : "+bullets[j].getDamage() + " // Life"+ + enemies[i].getLife())
				if (enemies[i].getLife() - bullets[j].getDamage() < 1){
					console.log("killed !");
					enemies.splice(i, 1);
					t.src = "images/explosion.png";
					score += 100;
					console.log("LAUNCHED "+ENEMY_LAUNCHED + " on "+(WAVE * 2 + 10));
					if (ENEMY_LAUNCHED == (WAVE * 2 + 10) && enemies.length == 0) {
						BOSS = 1;
						console.log("time for THE boss");
						b = new Audio("sounds/suspense.ogg");
						b.play();
						t = new Image();
						s = Math.floor(Math.random()*2)+1;
						//net(s == 1) ? 
						t.src = "images/boss"+WAVE+"-"+SIDE+".png";

						randomnumber=Math.floor(Math.random()*300);
						e = new Enemy();
						e.setEnemy(500, randomnumber, 30, t, 5, 150, "left");
						enemies.push(e);

						ENEMY_LAUNCHED++;
					}
					if (BOSS == 1)
						BOSS = 0;
				}
				else {
					t.src = "images/explosion-small.png";
					enemies[i].setLife(enemies[i].getLife() - bullets[j].getDamage());
					score += 10;
				}
				ex = new Explosion();
				ex.setExplosion(bullets[j].getX(), bullets[j].getY(), new Date().getTime(), t);
				//myContext.drawImage(t, 100, 100);
				explosions.push(ex);
				//console.log("splicing "+i);
				// if (enemies[i].getLife() - bullets[i].getDamage() < 1)
				// 	enemies.splice(i, 1);
			}
		}
	}
}

function decrease_life()
{
	//console.log("decrease_life");
	LIFE -= 1;
	if (LIFE === 0){
		// alert("YOU'VE LOST !!");
		endGame(0);
	}
	else {
		player_x = 50; //placement en X
		player_y = SCREEN_HEIGHT - 150; //placement en Y
	}
}
function endGame(n){
	if (n == 0){ //YOU'VE LOST
		END_WAVE = 1;
	setTimeout (function() {

		myContext.drawImage(images[5], 0, 0);
	}, 100);

	ENEMY_LAUNCHED = 0;
	setTimeout (function() {
		clearScreen();
		init();
	}, 3000);
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
	myContext.fillText("Score : " + score, 10, SCREEN_HEIGHT - 10);

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
function clean_tabs(){
	var tmp = Array();
	//var tmp2 = Array();
	if (bullets.length > 10){
		for (i = 0; i < 11; i++){
			tmp.push(bullets[i]);
		}
		bullets = tmp;
	}
	//console.log("tabs cleaned");
}

function check_win(){

	if (enemies.length == 0 && BOSS == 0 && ENEMY_LAUNCHED >= WAVE * 2 + 10){

		END_WAVE = 1;
		if (WAVE + 1 < 6){
			setTimeout (function() {

				l = images[WAVE];
				console.log("using " +l.src);
				myContext.drawImage(images[WAVE], SCREEN_WIDTH / 4, SCREEN_HEIGHT / 4);
			}, 100);

			ENEMY_LAUNCHED = 0;
			setTimeout (function() {
				END_WAVE = 0;
				BOSS = 0;
				WAVE += 1;
			}, 3000);
		}
		else {
			endGame(1);}
		}
	}


	function tick() {
		if (END_WAVE == 0){
			clearScreen();
			checkMovement();
			updateScientist();
			updateEnemies();
			checkExplosions();
			updateBullets();
			checkCollide();
			draw();
			draw_menu();
	//console.log(FRAME_TIMEOUT);
	if (FRAME_TIMEOUT % LAUNCH_RATE == 0){
		launch_ennemy ();
		LAUNCH_RATE= Math.floor(Math.random()*200);
	}

	FRAME_TIMEOUT++;
}
check_win();
}

//JQUERY

$(document).ready(function(){
	//setTimeout(launch_wave, 3000);
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