let grid;
let score = 0;
let isOver = false;
let gridStates = [];
let scoreStates = [];
let x = 0;
let moved = true;
function checkGameOver() {
    // Verifica se la griglia è piena
    let emptyCells = 0;
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] === 0) {
          emptyCells++;
        }
      }
    }
    if (emptyCells === 0) {
      // Se la griglia è piena, verifica se ci sono mosse valide
      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
          if (i < grid.length - 1 && grid[i][j] === grid[i+1][j]) {
            return false; // Ci sono mosse valide orizzontali
          }
          if (j < grid[i].length - 1 && grid[i][j] === grid[i][j+1]) {
            return false; // Ci sono mosse valide verticali
          }
        }
    }
      // Se non ci sono mosse valide, mostra il Game Over sulla griglia
    fill(255, 0, 0, 200);
    rect(0, 100, width, height-100); // Disegna un rettangolo trasparente rosso
    fill(255);
    textSize(64);
    textAlign(CENTER, CENTER);
    text("Game Over", width/2, (height+100)/2);// stampo il game over
    button = createButton('NEW GAME'); // creo un bottone per iniziare una nuova partita se si vuole
    button.position(width/2 - button.width/2, (height+100)/2 + 100);
    button.mousePressed(function() {
        location.reload();
    });
    return true; // la griglia è piena
    }
    return false; // La griglia non è piena
  }
function setup() {
    createCanvas(400, 500);
    grid = createEmptyGrid();
    addNumber();
    addNumber();
    updateCanvas();
}

function draw() {
    updateCanvas();
}

function updateCanvas() {
    background(255);
    drawGrid();
    drawScore();
    checkGameOver();
    Buttons();
}
function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        moveLeft();
    } else if (keyCode === RIGHT_ARROW) {
        moveRight();
    } else if (keyCode === UP_ARROW) {
        moveUp();
    } else if (keyCode === DOWN_ARROW) {
        moveDown();
    }
}

function moveUp() {
    if (moved) {
        gridStates.push(JSON.parse(JSON.stringify(grid))); 
        scoreStates.push(score);  
    }
    moved = false;
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            if (grid[i][j] !== 0) {
            let k = j;
                while (k > 0 && grid[i][k - 1] === 0) {
                grid[i][k - 1] = grid[i][k];
                grid[i][k] = 0;
                k--;
                moved = true;
                }
                if (k > 0 && grid[i][k - 1] === grid[i][k]) {
                grid[i][k - 1] *= 2;
                grid[i][k] = 0;
                score += grid[i][k - 1];
                moved = true;
                }
            }
        }
    }
    if (moved) {
        addNumber();
        updateCanvas();
        x+=1;
    }
}

function moveDown() {
    if (moved) {
        gridStates.push(JSON.parse(JSON.stringify(grid))); 
        scoreStates.push(score);  
    }
    moved = false;
    for (let i = 0; i < 4; i++) {
            for (let j = 2; j >= 0; j--) {
                if (grid[i][j] !== 0) {
                let k = j;
                while (k < 3 && grid[i][k + 1] === 0) {
                grid[i][k + 1] = grid[i][k];
                grid[i][k] = 0;
                k++;
                moved = true;
                }
                if (k < 3 && grid[i][k + 1] === grid[i][k]) {
                grid[i][k + 1] *= 2;
                grid[i][k] = 0;
                score += grid[i][k + 1];
                moved = true;
                }
            }
        }
    }
    if (moved) {
    addNumber();
    updateCanvas();
    x+=1;
    }
}

function moveLeft() {
    if (moved) {
        gridStates.push(JSON.parse(JSON.stringify(grid))); 
        scoreStates.push(score);  
    }
    moved = false;
    for (let j = 0; j < 4; j++) {
        for (let i = 1; i < 4; i++) {
            if (grid[i][j] !== 0) {
            let k = i;
            while (k > 0 && grid[k - 1][j] === 0) {
            grid[k - 1][j] = grid[k][j];
            grid[k][j] = 0;
            k--;
            moved = true;
            }
            if (k > 0 && grid[k - 1][j] === grid[k][j]) {
            grid[k - 1][j] *= 2;
            grid[k][j] = 0;
            score += grid[k - 1][j];
            moved = true;
            }
        }
    }
    }
    if (moved) {
        addNumber();
        updateCanvas();
        x+=1;
    }
}


function moveRight() {
    if (moved) {
        gridStates.push(JSON.parse(JSON.stringify(grid))); 
        scoreStates.push(score);  
    }
    moved = false;
    for (let j = 0; j < 4; j++) {
        for (let i = 2; i >= 0; i--) {
                if (grid[i][j] !== 0) {
                let k = i;
                while (k < 3 && grid[k + 1][j] === 0) {
                grid[k + 1][j] = grid[k][j];
                grid[k][j] = 0;
                k++;
                moved = true;
                }
                if (k < 3 && grid[k + 1][j] === grid[k][j]) {
                grid[k + 1][j] *= 2;
                grid[k][j] = 0;
                score += grid[k + 1][j];
                moved = true;
                }
            }
        }
    }
    if (moved) {
        addNumber();
        updateCanvas();
        x+=1;
    }
}

function undoMove() { // mossa indietro
    if(x>0){
        grid = gridStates.pop();
        score = scoreStates.pop();
        updateCanvas();
        x--;
    }
}
function createEmptyGrid() { // creo la griglia 
    let grid = [];
    for (let i = 0; i < 4; i++) {
        grid[i] = [];
        for (let j = 0; j < 4; j++) {
            grid[i][j] = 0;
        }
    }
    return grid;
}
function addNumber() { //aggiungo un numero
    let options = []; //opzioni di caselle vuote nel quale si puo inserire un valore
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
        if (grid[i][j] === 0) {
            options.push({
                 x: i,
                y: j
            });
        }
    }
    }
    if (options.length > 0) { // se ci sono caselle libere allora aggiungo un numero in uno spazio vuoto
        let spot = random(options);
        let r = random(1);
        let nDaSpawnare = 2; // spawno sempre il 2 a parte per lo 0,05% delle volte che stampo il 4
        if (r>0.95) {
            nDaSpawnare=4;    
        }
    grid[spot.x][spot.y] = nDaSpawnare;
    }
}
function drawGrid() { // disegna la griglia
    let w = 100; // grandezza dei quadrati
    for (let i = 0; i < 4; i++) { // ciclo per creare il quadrato 4x4
        for (let j = 0; j < 4; j++) {
            let color;
            switch(grid[i][j]){ // imposto il colore in base al numero presente in casella
                case 0:
                    color = 255;
                    break;
                case 2:
                    color = "#EEE4DA";
                    break;
                case 4:
                    color = "#EDE0C8";
                    break;
                case 8:
                    color = "#F2B179";
                    break;
                case 16: 
                    color = "#F59563";
                    break;
                case 32:
                    color = "#F67C5F";
                    break;
                case 64:
                    color = "#F65E3B";
                    break;
                case 128:
                    color = "#EDCF72";
                    break;
                case 256: 
                    color = "#EDCC61";
                    break;
                case 512:
                    color = "#EDC850";
                    break;
                case 1024:
                    color = "#EDC53F";
                    break;
                case 2048:
                    color = "#EDC22E";
                    break;
                case 4096:
                    color = 0;
                    break;
            }
            fill(color); // riempo la casella
            strokeWeight(2);
            stroke(0);
            rect(i * w, (j * w) +100, w, w); // creo il quadrato
            let val = grid[i][j];
            if (val !== 0) { // se il valore e diverso da 0 lo metto in tabella
                textAlign(CENTER, CENTER);
                textSize(34);
                if(val<=4){
                    fill(0);
                } else {
                    fill(255);
                }
                strokeWeight(0);
                text(val, i * w + w / 2, (j * w + w / 2)+ 100); // inserisco il valore al centro della casella
            }
        }
    }
}
function drawScore() { //scrivo lo score
    textSize(32);
    strokeWeight(2);
    stroke(0);
    textStyle(BOLD);
    fill(0);
    textAlign(LEFT, LEFT);
    text('SCORE = ' + score, 10, 50);
}

function Buttons(){
    buttonBack = createButton('MOVE BACK'); // creo un bottone mossa indietro
    buttonBack.position(300, 25);
    buttonBack.mousePressed(undoMove);
    buttonN = createButton('NEW GAME'); // creo un bottone per iniziare una nuova partita se si vuole
    buttonN.position(300, 75);
    buttonN.mousePressed(function() {
        location.reload();
    });
}