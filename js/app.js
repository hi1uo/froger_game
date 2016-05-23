// Enemies our player must avoid
var Enemy = function() {
    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
    this.startX = -101;
    this.endX = 505;
    this.lanes = [73, 156, 239]; //three lanes，83each space
    this.reset();
};

Enemy.prototype.reset = function() {
    this.x = this.startX;
    this.y = this.lanes[Math.floor(Math.random()*3)];//get on random y
    this.speed = 100 + Math.ceil(Math.random()*300); //random speed at range 101 - 400
};

// Update the enemy's position using dt
Enemy.prototype.update = function(dt) {
  var maxPos = this.endX;
  //right-most
  if (this.x <= maxPos){
    this.x += this.speed * dt;
  }
  else{
    this.reset();
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// player class
// update(), render() and handleInput() method.

var Player = function() {
    this.xRange = [0, 404];
    this.yRange = [-10, 405];
    this.sprite = 'images/char-boy.png';
    this.score = 0;
    this.dead = false;
    this.reset();
};

Player.prototype.reset = function() {
    this.x = 202;
    this.y = 405; //start from -10,
};

Player.prototype.update = function() {
  //when reach to the water,
    if (this.y == -10) {
      // alert("Awsome"); Need prompt a succeed window.
      this.reset();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {

    if (key === 'left' && this.x>=101) {
        this.x -= 101;
    } else if (key === 'right' && this.x < 404) {
        this.x += 101;
    } else if (key === 'up' && this.y >= 73) {
        this.y -= 83;
    } else if (key === 'down' && this.y < 405) {
        this.y += 83;
    }
};

var Gem = function(){
  this.reset();
};

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//each round only 5 gems in total
Gem.prototype.update = function() {
  this.random();
  this.gemNum--;
};
Gem.prototype.random = function() {
  var gems = ['images/Gem-Blue.png','images/Gem-Green.png','images/Gem-Orange.png',''];
  this.sprite = gems[Math.floor(Math.random()*3)];
  this.x = 101 * Math.floor(Math.random()*5);
  this.y = 63 + 83* Math.floor(Math.random()*3);
};
Gem.prototype.reset = function() {
  this.random();
  this.gemNum = 5;
};


var Life = function() {
  this.remainLife = 3;
  this.sprite = 'images/Heart-small.png';
};

Life.prototype.render = function(){
  // if (this.remainLife === 0){
  //   gameOver();
  // }
  for(var i=0;i<this.remainLife;i++){
    ctx.drawImage(Resources.get(this.sprite),i*30,530);
  }
};

Life.prototype.loseLife = function(){
  if(this.remainLife > 0){
    this.remainLife--;
  }
};


function gameOver() {
  ctx.fillStyle = 'black';
  // ctx.clearRect(73,200, 350, 200);
  ctx.fillRect(73,200, 350, 200);
  ctx.fillStyle = 'white';
  ctx.font = "50px Roboto Condensed";
  ctx.fillText("Game Over!", 120, 315);
  ctx.font = "25px Roboto Condensed";
  ctx.fillText("Your Score: " +player.score, 120, 350);
}

function Score() {
  ctx.font = "30px Roboto Condensed";
  ctx.fillStyle = "#0000";
  ctx.fillText("Score: "+player.score,1,100);
}

var e1 = new Enemy();
var e2 = new Enemy();
var e3 = new Enemy();
var allEnemies = [e1,e2,e3];
var player = new Player();
var gem = new Gem();
var life = new Life();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
