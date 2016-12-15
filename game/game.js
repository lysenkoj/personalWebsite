var utils = {
  //get cell status
  getCellStatus: function(cell){
    return cell.getAttribute('data-status');
  },
  //set cell status
  setCellStatus: function(cell, status) {
    cell.setAttribute('data-status', status)
    cell.className = status;
  },
  //toggle cell
  // toggleStatus: function(cell) {
  //   if(utils.getCellStatus(cell) === 'dead') {
  //     utils.setCellStatus(cell, 'alive');
  //   } else {
  //     utils.setCellStatus(cell, 'dead');
  //   }
  // },
  getCell: function(col,row) {
    return document.getElementById(col + '-' + row);
  }

}

var gameOfSnake = {
  width: 12,
  height: 12,
  stepInterval: null,
  direction: 'right',
  snake:[],

  createAndShowBoard: function () {
    // create <table> element
    var goltable = document.createElement("tbody");

    // build Table HTML
    var tablehtml = '';
    for (var h=0; h<this.height; h++) {
      tablehtml += "<tr id='row+" + h + "'>";
      for (var w=0; w<this.width; w++) {
        tablehtml += "<td data-status='empty' id='" + w + "-" + h + "'></td>";
      }
      tablehtml += "</tr>";
    }
    goltable.innerHTML = tablehtml;

    // add table to the #board element
    var board = document.getElementById('board');

    board.appendChild(goltable);

    // create snake
    var allCells = [].slice.call(document.getElementsByTagName('td'));

    var head = allCells[62];
    utils.setCellStatus(head, 'snake');
    gameOfSnake.snake.push(head);

    var foodStart = allCells[69];
    utils.setCellStatus(foodStart, 'food');



    // once html elements are added to the page, attach events to them
    this.setupBoardEvents();
  },

  forEachCell: function (iteratorFunc) {
    /*
      Write forEachCell here. You will have to visit
      each cell on the board, call the "iteratorFunc" function,
      and pass into func, the cell and the cell's x & y
      coordinates. For example: iteratorFunc(cell, x, y)
    */
    var allCells = [].slice.call(document.getElementsByTagName('td'));

    allCells.forEach(function(cell) {
      var splitId = cell.id.split('-');
      iteratorFunc(cell, splitId[0], splitId[1])
    })
  },

  setupBoardEvents: function() {
    window.onkeydown = function (e) {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code === 38) { //up key
        gameOfSnake.direction = 'up';
    } else if (code === 40) { //down key
        gameOfSnake.direction = 'down';
    } else if (code === 37) { //left key
        gameOfSnake.direction = 'left';
    } else if (code === 39) { //right key
        gameOfSnake.direction = 'right';
    }
};

  },

  spawnFood: function() {
    let col = Math.floor(Math.random() * this.height)
    let row = Math.floor(Math.random() * this.width)

    let newFood = utils.getCell(col, row)
    if(this.snake.indexOf(newFood) < 0) {
      utils.setCellStatus(newFood, 'food')
    } else {
      console.log('REROLL YOU FOOLLLL!!!!')
      this.spawnFood();
    }
  },

  step: function () {
    const head = this.snake[0];
    const tail = this.snake[this.snake.length - 1];

    if(this.direction === 'right'){
      let splitId = head.id.split('-').map(Number);
      let col = splitId[0] + 1;
      let row = splitId[1];
      let newHead = utils.getCell(col, row);

      if(col > this.width - 1 || this.snake.indexOf(newHead) >= 0){
        this.stop();
      } else {
        // consume food
        if(newHead.getAttribute('data-status') === 'food'){
          utils.setCellStatus(newHead, 'snake')
          this.snake.unshift(newHead);
          this.spawnFood()
        } else {
          utils.setCellStatus(newHead, 'snake')
          this.snake.unshift(newHead);
          utils.setCellStatus(tail, 'empty');
          this.snake.pop();
        }
      }
    } else if(this.direction === 'left'){
        let splitId = head.id.split('-').map(Number);
        let col = splitId[0] - 1;
        let row = splitId[1];
        let newHead = utils.getCell(col, row);

      if(col < 0 || this.snake.indexOf(newHead) >= 0){
          this.stop();
        } else {
        // consume food
          if(newHead.getAttribute('data-status') === 'food'){
            utils.setCellStatus(newHead, 'snake')
            this.snake.unshift(newHead);
            this.spawnFood()
          } else {
            utils.setCellStatus(newHead, 'snake')
            this.snake.unshift(newHead);
            utils.setCellStatus(tail, 'empty');
            this.snake.pop();
          }
        }
    } else if(this.direction === 'up') {
        let splitId = head.id.split('-').map(Number);
        let col = splitId[0];
        let row = splitId[1] - 1;
        let newHead = utils.getCell(col, row);

        if(row < 0 || this.snake.indexOf(newHead) >= 0){
          this.stop();
        } else {
          // consume food
          if(newHead.getAttribute('data-status') === 'food'){
            utils.setCellStatus(newHead, 'snake')
            this.snake.unshift(newHead);
            this.spawnFood()
          } else {
            utils.setCellStatus(newHead, 'snake')
            this.snake.unshift(newHead);
            utils.setCellStatus(tail, 'empty');
            this.snake.pop();
          }
        }
    } else {
        let splitId = head.id.split('-').map(Number);
        let col = splitId[0];
        let row = splitId[1] + 1;
        let newHead = utils.getCell(col, row);

        if(row > this.height - 1 || this.snake.indexOf(newHead) >= 0){
          this.stop();
        } else {
          // consume food
          if(newHead.getAttribute('data-status') === 'food'){
            utils.setCellStatus(newHead, 'snake')
            this.snake.unshift(newHead);
            this.spawnFood()
          } else {
            utils.setCellStatus(newHead, 'snake')
            this.snake.unshift(newHead);
            utils.setCellStatus(tail, 'empty');
            this.snake.pop();
          }
        }
    }
  },

  play: function () {
    // Start Auto-Play by running the 'step' function
    // automatically repeatedly every fixed time interval
   if(this.stepInterval === null && this.snake.length) {
    this.stepInterval = setInterval(this.step.bind(this), 300)
   } else {
    //stop
    this.stop();
   }

  },
  stop : function() {
    clearInterval(this.stepInterval);
    this.stepInterval = null;
  },
  // clear : function() {
  //   this.stop();
  //   this.forEachCell(function(cell){
  //     utils.setCellStatus(cell, 'dead');
  //   })
  // },
  // reset : function() {
  //   this.stop();
  //   this.clear();
  //   this.forEachCell(function(cell){
  //     if(Math.random() > 0.5) {
  //       utils.setCellStatus(cell, 'alive')
  //     } else {
  //       utils.setCellStatus(cell, 'dead');
  //     }
  //   })
  // }
};

export {utils, gameOfSnake};