class Ball {
  constructor(paddle) {
    this.radius = 10
    this.size = this.radius * 2
    this.location = createVector(paddle.location.x + (paddle.width / 2), (paddle.location.y - this.radius - 5))
    this.color = color(147, 112, 219)
    this.velocity = createVector(5, -5) // directia i care merge bila
    this.paddle = paddle
  }

  bouncePaddle() {
    // fcem ca bila sa sara de cate ori atinge orice parte a paletei
    if (this.location.x + this.radius >= this.paddle.location.x &&
        this.location.x - this.radius <= this.paddle.location.x + this.paddle.width) {          
          if (this.location.y + this.radius > this.paddle.location.y) {
            this.reverse('y');
            this.location.y = this.paddle.location.y - this.radius - 1;
          }
        }
  }

  bounceEdge() {
    if (this.location.x + this.radius >= width) { // verifica peretele din dreapta, intoarce bila, o inmulteste cu -1 in reverse
      this.reverse('x')
    } else if(this.location.x - this.radius <= 0) { // verifica peretele din stanga, intoarce bila, o inmulteste cu -1 in reverse
      this.reverse('x')
    } else if(this.location.y - this.radius <= 0) { // verifica tavanul si intoarce bila, o inmulteste cu -1 in reverse
      this.reverse('y')
    }
  }

  display() {
    fill(this.color)
    ellipse(this.location.x, this.location.y, this.size, this.size)
  }

  update() {
    this.location.add(this.velocity)
  }

  reverse(coord) {
    this.velocity[coord] *= -1 // o folosesc pentru a schimba directia bilei
  }

  belowBottom() {
    return this.location.y - this.radius > height
  }
}

class Brick {
  constructor(location, width, height, color) {
    this.location = location
    this.width = width
    this.height = height
    this.color = color
    this.points = 1
  }

  display() {
    fill(this.color)
    rect(this.location.x, this.location.y, this.width, this.height)
  }

  isColliding(ball) {
    // setez ce se intampla cand bila loveste caramida
  
    if(ball.location.y - ball.radius <= this.location.y + this.height &&
        ball.location.y + ball.radius >= this.location.y &&
        ball.location.x + ball.radius >= this.location.x &&
        ball.location.x - ball.radius <= this.location.x + this.width) {
          return true
        }
  }
}

class Paddle {
  constructor() {
    this.width = 100
    this.height = 20
    this.color = color(255)
    this.location = createVector((width / 2) - (this.width / 2), height - 25) // un vector de coordonate x si y care imi seteaza paleta jos in mijloc
    const speed = 5 
    this.speed = { //aici setez cum sa se deplaseze paleta pe cati pixeli si in ce parte
      right: createVector(speed, 0),
      left: createVector(speed * -1, 0)
    }
  }

  display() {
    fill(this.color)
    rect(this.location.x, this.location.y, this.width, this.height) // afisez paleta
  }

  move(direction) {
    this.location.add(this.speed[direction])
//aici imi misc paleta
    if(this.location.x < 0) {
      this.location.x = 0
    } else if(this.location.x + this.width > width) {
      this.location.x = width - this.width   
    }
  }
}



