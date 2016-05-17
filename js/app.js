// Enemies our player must avoid
var Enemy = function() {
    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
    this.startX = -101;
    this.endX = 505;
    this.lanes = [73, 156, 239]; //three lanes
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

// Now instantiate your objects. allEnemies and player
var e1 = new Enemy();
var e2 = new Enemy();
var e3 = new Enemy();
var allEnemies = [e1,e2,e3];
var player = new Player();


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
