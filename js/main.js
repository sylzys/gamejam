var stage;
var canvas;
var bg;
var bgSrc = new Image();
var gfxLoaded = 0; 
var scientist;
var sc;
var speed = 8;  
var moveLeft = false;  
var moveRight = false;  
var moveUp = false;  
var moveDown = false;
var BULLET_SPEED = 15;
var SCREEN_WIDTH = 640;
var SCREEN_HEIGHT = 480;
var bullets = new Array();
var score;
function init() {
	canvas = document.getElementById("canvas");
	stage = new Stage(canvas);
//KEYBOARD



//BACKGROUND
bgSrc.src = 'images/bg.png';
bgSrc.name = 'bg';
bgSrc.onload = loadGfx;  

//SCIENTIST
scImg = new Image();  
scImg.onload = onScLoaded;  
scImg.src  = "images/scientist.png";  
sc = new Bitmap(scImg);

//CONTAINER
icon = new Container();
	icon.x = 10;
	icon.y = 460;
	stage.addChildAt(icon, 0);
score = new Text("Score: 0", "20px Arial", "orange");
//score.color("#ff0000");
icon.Zindex=-1000;
icon.addChild(score);
stage.update();

Ticker.setFPS(30);
Ticker.addListener(window);
//tick();
document.onkeydown = onKeyDown;
document.onkeyup = onKeyUp;

}

function loadGfx(e)
{
	if(e.target.name = 'bg'){bg = new Bitmap(bgSrc);}
	buildInterface(bg);
}
function buildInterface(bmp)
{

	
	stage.addChild(bmp);
	stage.update(); // Very Important
	
	/* Add button listener */
	
	
}

function onScLoaded() {
	
	sc.regX = sc.image.width * 0.5; 
	sc.regY = sc.image.height * 0.5;
	sc.x = 50; //placement en X
	sc.y = SCREEN_HEIGHT - 100; //placement en Y
	buildInterface(sc);
}

function onKeyDown(e) {       
	if(!e){ var e = window.event; }  
	console.log(e.keyCode);
	switch(e.keyCode) {  
        // left  
        case 37: moveLeft = true; moveRight = false;      
        break;                    
        // up  
        case 38: moveUp = true; moveDown = false;  
        break;                    
        // right  
        case 39: moveRight = true; moveLeft = false;  
        break;                                        
        // down  
        case 40: moveDown = true; moveUp = false;  
        break;  
        //fire
        case 32: fire();  
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
    }  
}  

function checkMovement() {  
	if(moveLeft)  
	{  
		sc.x -= speed;  
		if(sc.x < 10)
			sc.x = 10;  
	}  
	else if(moveRight)  
	{  
		sc.x += speed;  
		if(sc.x > SCREEN_WIDTH - 10)  
			sc.x = SCREEN_WIDTH - 10;  
	}  

	if(moveUp)  
	{  
		if(sc.y - speed > 24)  
			sc.y -= speed * 2;  
	}  
	else if(moveDown)  
	{  
		if(sc.y + speed < SCREEN_HEIGHT - 100)  
			sc.y += speed;  
	}  
}  

function fire(){
	fImg = new Image();   
	fImg.src  = "images/fiole-small.png";  
	f = new Bitmap(fImg);
	f.regX = f.image.width * 0.5; 
	f.regY = f.image.height * 0.5;
	f.x = sc.x + 30; //placement en X du vaisseau
	f.y = sc.y; //placement en Y
	bullets.push(f);
	stage.addChild(f);
	buildInterface(f);


}

function updateBullets() {
	var i;
	var limit = bullets.length;
	for (i=0; i < limit; i++)
	{
		bullets[i].x += BULLET_SPEED;
		if (bullets[i].x > SCREEN_WIDTH - 20){
			stage.removeChild(bullets[i]);
			bullets.splice(i, 1);
		}
	}
}

function updateScientist() {
	if(sc.y + speed / 4 < SCREEN_HEIGHT - 100)  
		sc.y += speed / 4;  
}

function tick() {  
	checkMovement(); 
	updateScientist();
	updateBullets(); 
	stage.update();  
} 