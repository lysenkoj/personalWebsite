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
  logoArray: null,


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

    gameOfSnake.logoArray = [allCells[333], allCells[334], allCells[335], allCells[336], allCells[337], allCells[338], allCells[339], allCells[340], allCells[341], allCells[342], allCells[343], allCells[344], allCells[345], allCells[346], allCells[347], allCells[348], allCells[349], allCells[350], allCells[351], allCells[409], allCells[485], allCells[561], allCells[637], allCells[713], allCells[789], allCells[865], allCells[941], allCells[1017], allCells[1093], allCells[1169], allCells[1245], allCells[1321], allCells[1397], allCells[1473], allCells[1549], allCells[1625], allCells[1701], allCells[1702], allCells[1703], allCells[1704], allCells[1705], allCells[1706], allCells[1707], allCells[1708], allCells[1709], allCells[1710], allCells[1711], allCells[1712], allCells[1713], allCells[1714], allCells[1715], allCells[1716], allCells[1717], allCells[1718], allCells[427], allCells[503], allCells[579], allCells[655], allCells[731], allCells[807], allCells[883], allCells[959], allCells[1035], allCells[1111], allCells[1187], allCells[1263], allCells[1339], allCells[1415], allCells[1491], allCells[1567], allCells[1643], allCells[1719], allCells[569], allCells[645], allCells[721], allCells[797], allCells[873], allCells[949], allCells[1025], allCells[1101], allCells[1177], allCells[1253], allCells[1329], allCells[1405], allCells[1481], allCells[1476], allCells[1477], allCells[1478], allCells[1479], allCells[1480], allCells[1483], allCells[1484], allCells[1485], allCells[1486], allCells[1487], allCells[1488], allCells[1324], allCells[1400], allCells[571], allCells[647], allCells[723], allCells[799], allCells[875], allCells[951], allCells[1027], allCells[1103], allCells[1179], allCells[1255], allCells[1331], allCells[1407], allCells[1483]]

    gameOfSnake.logoArray.forEach(cell => {
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
        } else if(newHead.getAttribute('data-status') === 'logo') {
          utils.setCellStatus(newHead, 'snake')
          this.snake.unshift(newHead);
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
          } else if(newHead.getAttribute('data-status') === 'logo') {
            utils.setCellStatus(newHead, 'snake')
            this.snake.unshift(newHead);
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
          } else if(newHead.getAttribute('data-status') === 'logo') {
            utils.setCellStatus(newHead, 'snake')
            this.snake.unshift(newHead);
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
          } else if(newHead.getAttribute('data-status') === 'logo') {
            utils.setCellStatus(newHead, 'snake')
            this.snake.unshift(newHead);
          } else {
            utils.setCellStatus(newHead, 'snake')
            this.snake.unshift(newHead);
            utils.setCellStatus(tail, 'empty');
            this.snake.pop();
          }
        }
    }

    gameOfSnake.logoArray.forEach(cell => {
      if(cell.getAttribute('data-status') === 'empty'){
        utils.setCellStatus(cell, 'consumed');
      }
    })
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