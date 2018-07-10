// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.sprite = 'images/enemy-bug.png';
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += this.speed * dt;

  if (this.x > 550) {
    this.x = -100;
    this.speed = 100 + Math.floor(Math.random() * 512);
  }
  // check if the player
  if (player.x < this.x + 60 && player.x + 37 > this.x && player.y < this.y + 25 && 110 + player.y > this.y) {
    player.x = 200;
    player.y = 380;
  }
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/char-boy.png';
};
Player.prototype.update = function() {
  // the player can not go out of canvas / previene que el jugador salga del cuadro
  if (this.y > 380) {
    this.y = 380;
  }
  if (this.x > 400) {
    this.x = 400;
  }
  if (this.x < 0) {
    this.x = 0;
  }
  // if the player win  reset the position / si el jugador  gana se vuelve la posicion
  if (this.y < 0) {
    this.x = 200;
    this.y = 380;
  }
};
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(arrow) {
  if (arrow == 'up' && this.y > 3) {
    this.y -= 50;
  }
  if (arrow == 'right' && this.x < 500) {
    this.x += 50;
  }
  if (arrow == 'left' && this.x > 0) {
    this.x -= 50;
  }
  if (arrow == 'down' && this.y < 500) {
    this.y += 50;
  }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
//enemy position  / posicion del enemigo
var enemyPosition = [55, 140, 215];
// player position / posicion del jugador
var player = new Player(200, 380);
var allEnemies = [];
var newEnemy;

enemyPosition.forEach(function(position) {
  newEnemy = new Enemy(0, position, 10 + Math.floor(Math.random() * 400));
  allEnemies.push(  newEnemy);
});
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
