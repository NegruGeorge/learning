let snake;
let rez = 20;
let food;
let w; 
let h;
let punctaj = 0;
let ok=0;
let playerScore = 0;
let paddle;
let ball;
let bricks;
let gameState;
let st ='start';
let ok1=0;

// codul pentru start 
var font;
var vehicles = [];

function setup() {
    createCanvas(400, 400);
  ok=0; playerScore = 0; punctaj = 0;

  w = floor(width / rez);//imi setez inaltimea si lungimea maxima in care sa apara mancarea floor mi l face intreg
  h = floor(height / rez);
 
  snake = new Snake(); 
  foodLocation(); 
  textSize(1); 


   let colors = createColors() ;
  gameState = 'playing';
  paddle = new Paddle();
  ball = new Ball(paddle);

  bricks = createBricks(colors)
  /////////////////////////////////////////
  // codul pentru textul start
  var points = font.textToPoints('DATA', 60, 200, 100, { // unde sa se afle textul  si ce dimensinui sa aiba
    sampleFactor: 0.15 // cantitatea de bile 
  });

  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);

  }
  /// sfasrit cod pentru start
  var button = createButton("restart");
button.mousePressed(restartSketch);
}




function draw() { 

  if(ok==0) 
  { // codul pentru start
    background(0);
   
  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    v.behaviors();
    v.update();
    v.show();
    // codul pentru start
   
 
    
  }
     fill(255);
    rect (150,290,100,80);
    fill(0, 100, 153);
   textSize(32);
text('start', 168, 340);

    noStroke();
  
     if(mouseIsPressed && mouseX >150 && mouseX <250 &&
        mouseY >290 && mouseY)
   { restartSketch();
     ok=1;
   }
    
  }
  if(ok==1){ 
   
 
   frameRate(5);// cu cate cadre pe secunda sa se miste imaginea
    scale(rez);// pun pixelii de cate 10 nu 1 cum e noraml (10 pixeli devin 1)
  background(225);
  if (snake.eat(food)) {
    punctaj=punctaj+1;
     foodLocation();
 
  }
  snake.update();
  snake.show();
  
  if (snake.endGame()) {
  	//print("END GAME");
   background(255, 0, 0);
  
  // noLoop();
  }
  
  noStroke();
  fill(255, 0, 0);
  rect(food.x, food.y, 1, 1);
  text(punctaj,0.1,1);
  
  } 
  
 text('2',19,1);
 
 if (punctaj == 2)
    { 
      text("Press 2", 7, 2);
      frameRate(1)
    
    }
  
  
  
 
  if(ok==2){
if(gameState === 'playing') { // cat timp gameState e 'playing' atunci jocul merge daca e win castigi daca e lose incepi de la nivelul 1
  frameRate(60);
  background(0)

    ball.bounceEdge()
    ball.bouncePaddle()
    
    ball.update()

    if (keyIsDown(LEFT_ARROW)) {
      paddle.move('left') // verific directiile paletei
    } else if (keyIsDown(RIGHT_ARROW)) {
      paddle.move('right')
    }

    for (let i = bricks.length - 1; i >= 0; i--) { // afisez toate caramizile  
      const brick = bricks[i]
      if (brick.isColliding(ball)) {  // verific daca bila loveste caramida 
        ball.reverse('y')
        bricks.splice(i, 1)
        playerScore += brick.points // daca bila loveste caramida cresc scorul
      } else {
        brick.display()
      }
    }

    paddle.display()
    ball.display()
// afisez bilele si paleta
    textSize(32)
    fill(255)
    text(`Score:${playerScore}`, width - 150, 50) // afisez scorul in colt stanga sus

    if (ball.belowBottom()) {
      gameState = 'Lose'  // daca bila cade jos, sub paleta pierd jocul gameState salveaza Lose pe care il verific mai jos
    }

    if (bricks.length === 0) { // daca lungimea vectorului bricks este 0 adica daca nu mai ai nici o  caramida atunci ai castigat
     
      gameState = 'Win'
      
    }
  } else {
   
    if(gameState ==='Lose')
    {textSize(30) // daca am pierdut trebuie sa dau restart si sa incep de la 1
      text("restart, game over :(", width / 2 - 120, height / 2);
    
    }
    else if(gameState ==='Win')
    {textSize(30) //daca castigi iti afiseaza un mesaj
      text("Bravo,ai castigat :) ", width / 2 - 120, height / 2);
    

     
    }
    
  }
  }
}

  
  
  
  /////////////////////////////////////////////////////////////////////////////////
// FUNCTII FUNCTII FUNCTII  FUNCTII FUNCTII FUNCTII  FUNCTII FUNCTII FUNCTII  FUNCTII FUNCTII FUNCTII  FUNCTII FUNCTII FUNCTII  FUNCTII FUNCTII FUNCTII  FUNCTII FUNCTII FUNCTII  FUNCTII FUNCTII FUNCTII  FUNCTII FUNCTII FUNCTII  FUNCTII FUNCTII FUNCTII  FUNCTII FUNCTII FUNCTII  FUNCTII FUNCTII FUNCTII  FUNCTII FUNCTII FUNCTII 
  
function foodLocation() {
  let x = floor(random(w));
  let y = floor(random(h));
  food = createVector(x, y);
//  creaza un vector v cu coordonate random x si y;
  

  
  
}




  
function preload()

{
  // setez font ul START
 font = loadFont(' AvenirNextLTPro-Demi.otf');
}

  
function createColors() {
  const colors = []
  colors.push(color(265, 165, 0)) // imi pune culori intr un vector dupa care le ia random si le pune in  caramizi
  colors.push(color(135, 206, 250))
  colors.push(color(147, 112, 219))
  for (let i = 0; i < 10; i++) {
    colors.push(color(random(0, 255), random(0, 255), random(0, 255)))
  }
  return colors
}

function createBricks(colors) {
  const bricks = []
  const rows = 1 // randurile de caramizi
  const bricksPerRow = 10
  const brickWidth = width / bricksPerRow
  for (let row = 0; row < rows; row++) { // creez randurile de caramizi
    for (let i = 0; i < bricksPerRow; i++) {
      brick = new Brick(createVector(brickWidth * i, 25 * row), brickWidth, 25, colors[floor(random(0, colors.length))])  // creez caramizile un obiect
      bricks.push(brick) // fiecare obiect il bag in matrice pe cate o pozitie cu functia push
    }
  }
  return bricks
}

function keyPressed() {
  
  // aici verific ce taste am apasat 
  if (keyCode === LEFT_ARROW) {
    
    snake.setDir(-1, 0);

  } else if (keyCode === RIGHT_ARROW) {
    
    snake.setDir(1, 0);
  } else if (keyCode === DOWN_ARROW) {
    snake.setDir(0, 1);
  } else if (keyCode === UP_ARROW) {
    snake.setDir(0, -1);
  } else if (key == ' ') {
    snake.grow();
  }else if (key == '2') { // aici schimb nivelul
    ok=2;
  }
  

}


 function restartSketch()
{  ok=1; playerScore = 0; punctaj = 0;
   createCanvas(400, 400);
  w = floor(width / rez);//imi setez inaltimea si lungimea maxima in care sa apara mancarea floor mi l face intreg
  h = floor(height / rez);
 
  snake = new Snake();
  foodLocation();
  textSize(1);


  let colors = createColors()
  gameState = 'playing';
  paddle = new Paddle()
  ball = new Ball(paddle)

  bricks = createBricks(colors)

}



