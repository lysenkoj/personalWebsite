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

  getCell: function(col,row) {
    return document.getElementById(col + '-' + row);
  }

}

var gameOfSnake = {
  width: 76,
  height: 36,
  stepInterval: null,
  direction: 'right',
  snake:[],


  createAndShowBoard: function () {
    // create <table> element
    let goltable = document.createElement("tbody");

    // build Table HTML
    let tablehtml = '';
    for (let h=0; h<this.height; h++) {
      tablehtml += "<tr id='row+" + h + "'>";
      for (let w=0; w<this.width; w++) {
        tablehtml += "<td data-status='empty' id='" + w + "-" + h + "'></td>";
      }
      tablehtml += "</tr>";
    }
    goltable.innerHTML = tablehtml;

    // add table to the #board element
    let board = document.getElementById('board');

    board.appendChild(goltable);

    // create snake
    let allCells = [].slice.call(document.getElementsByTagName('td'));
    console.log(allCells)
    let head = allCells[998];
    utils.setCellStatus(head, 'snake');
    gameOfSnake.snake.push(head);

    let foodStart = allCells[1046];
    utils.setCellStatus(foodStart, 'food');

    let logoArray = [allCells[337], allCells[338], allCells[339], allCells[340], allCells[2076], allCells[2077], allCells[2078], allCells[2079], allCells[2080], allCells[2081], allCells[2082], allCells[2083], allCells[2084], allCells[2085], allCells[2086], allCells[2087], allCells[2088], allCells[1848], allCells[1924], allCells[2000], allCells[2012], allCells[1936], allCells[1860], allCells[1784], allCells[1708], allCells[1632], allCells[1556], allCells[1480], allCells[1404], allCells[1328], allCells[1252], allCells[1176], allCells[1100], allCells[1024], allCells[948], allCells[872], allCells[796], allCells[720], allCells[644], allCells[568], allCells[492], allCells[416], allCells[344], allCells[420], allCells[496], allCells[572], allCells[648], allCells[724], allCells[800], allCells[876], allCells[952], allCells[1028], allCells[1104], allCells[1180], allCells[1256], allCells[1332], allCells[1408], allCells[1484], allCells[1560], allCells[1636], allCells[1712], allCells[1788], allCells[1864], allCells[344], allCells[344], allCells[344], allCells[344], allCells[344], allCells[344], allCells[344], allCells[1940], allCells[2016], allCells[2092], allCells[2093], allCells[2094], allCells[2095], allCells[2096], allCells[2097], allCells[2098], allCells[2099], allCells[2100], allCells[2101], allCells[2102], allCells[2103]]

    logoArray.forEach(cell => {
      utils.setCellStatus(cell, 'logo');
    })

    let linkArray = [allCells[2455], allCells[2465], allCells[2475], allCells[2485]];

    linkArray.forEach(cell => {
      utils.setCellStatus(cell, 'link');
    })




    // once html elements are added to the page, attach events to them
    this.setupBoardEvents();
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
    let row = Math.floor(Math.random() * this.height)
    let col = Math.floor(Math.random() * this.width)

    let newFood = utils.getCell(col, row)
    if(this.snake.indexOf(newFood) < 0) {
      utils.setCellStatus(newFood, 'food')
    } else {
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
    this.stepInterval = setInterval(this.step.bind(this), 150)
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