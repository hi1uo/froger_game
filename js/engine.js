var Engine = (function(global) {
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    function main() {
      //get constant time
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;
        update(dt);
        render();
        lastTime = now;
        //game over, pause the page
        if (life.remainLife === 0){
          gameOver();
          setTimeout(function(){
            win.requestAnimationFrame(main);
          },50000);
        }
        else {
          win.requestAnimationFrame(main);
        }
    }

    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    function update(dt) {
        updateEntities(dt);
        updateGem();
        checkCollisions();
        if (player.score >= 200){
          e1.speed += 5;
        }

        if (player.score >= 400) {
          e2.speed += 10;
        }
        if (player.score >= 600) {
          e3.speed += 20;
        }
    }

    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        if (player.y == -10) {
          player.score += 20;
          player.reset();
          gem.reset();
        }
    }

    function updateGem(){
      if(gem.gemNum > 0){
        if (player.x == gem.x && player.y >= gem.y && player.y <=gem.y+83){
          player.score += 70;
          gem.update();
        }
      }
      else {
        gem.x =-100;
        gem.y =-200;
      }
    }

    function checkCollisions(){
      allEnemies.forEach(function(enemy){
        if(enemy.y == player.y){
          if(player.x <= (enemy.x+60) && player.x>= (enemy.x -40)){
            life.loseLife();
            player.score -= 50;
            player.reset();
            gem.reset();
          }
        }
      });
    }


    function render() {
        var rowImages = [
                'images/water-block.png',   // Top row is water
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;

        // Draw the "grid"
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        renderEntities();
    }


    function renderEntities() {
        // draw all enemies for the firstime
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });
        Score();
        player.render();
        life.render();
        gem.render();
    }


    function reset() {
      // alert("Hello");
        // noop
    }

    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/Gem-Blue.png',
        'images/Gem-Green.png',
        'images/Gem-Orange.png',
        'images/Heart.png',
        'images/Heart-small.png'

    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
})(this);
