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
var SCREEN_WIDTH = 640;
var SCREEN_HEIGHT = 480;
var bullets = new Array();
var score;
var myContext;
var player_x;
var player_y;

function init() {
	canvas = document.getElementById("canvas");
	myContext = (canvas.getContext("2d")); 
	stage = new Stage(canvas);

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
		player_x -= speed;  
		if(player_x < 10)
			player_x = 10;  
	}  
	else if(moveRight)  
	{  
		player_x += speed;  
		if(player_x > SCREEN_WIDTH - 10)  
			player_x = SCREEN_WIDTH - 10;  
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
	fImg = new Image();   
	fImg.src  = "images/fiole-small.png";  
	f = new Bitmap(fImg);
	f.regX = f.image.width * 0.5; 
	f.regY = f.image.height * 0.5;
	f.x = player_x + 30; //placement en X du vaisseau
	f.y = player_y; //placement en Y
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
	if(player_y + speed / 4 < SCREEN_HEIGHT - 150)  
		player_y += speed / 4;  
}

function clearScreen ()
{
	myContext.drawImage(bg, 0, 0);
	
}
function draw() {
	myContext.drawImage(sc, player_x, player_y);
}
function tick() {  
	clearScreen();
	checkMovement(); 
	updateScientist();
	updateBullets(); 
	draw();
	myContext.font = "bold 12px sans-serif";
	myContext.fillStyle = "orange";
	myContext.fillText("Score : " + score, 10, 460);
} 