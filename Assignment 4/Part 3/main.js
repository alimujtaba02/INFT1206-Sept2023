// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

//creating a constructor for our object(in this case, a ball)
class Ball{
  //defining a consructor (what the object has to contain)
  constructor(x, y, velX, velY, color, size){
    //the x and y co-ordinates of the ball
    this.x = x;
    this.y=y;

    //the horizontal and vertical velocity (how far they will move per frame)
    this.velX= velX;
    this.velY= velY;

    //the color and size of the ball
    this.color= color;
    this.size= size;
  }
    // adding a function to draw the ball on to the screen
    draw() {
      //creating a path for the ball
      ctx.beginPath();
      //filling it with the colour
      ctx.fillStyle = this.color;
      //drawing a circle
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      //filling it (actually creating the ball)
      ctx.fill();
    }
  
    //adding a function to update ball data
  update() {
    //makes sure the x co-ordinate isnt greater than the width of the window (right side)
    if ((this.x + this.size) >= width) {
      this.velX = -(this.velX);
    }
    //makes sure the x coordinate isnt below 0 (left side of window)
    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }
  //makes sure the y coordinate isnt greater than the height of the screen(bottom)
    if ((this.y + this.size) >= height) {
      this.velY = -(this.velY);
    }
  //makes sure the y coordinate isnt less than zero (not exceeding the top of windo)
    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }
    //making the ball move the desired amount per frame
    this.x += this.velX;
    this.y += this.velY;
  }
    
  //adding the collision detection function
  collisionDetect() {
    //compares our ball to every other ball in the array
    for (const ball of balls) {
      //making sure we are not comparing the same ball to itself, that would break the program
      if (this !== ball) {
        //algorithm to check collisions
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        //if a collision happens
        if (distance < this.size + ball.size) {
          //change the color of both balls
          ball.color = this.color = randomRGB();
        }
      }
    }
  }  
}

//adding some balls to our screen
const balls = [];
//to ensure we have a maximum of 25 balls
while (balls.length < 25) {
  //getting a big or small ball
  const size = random(10, 20);
  const ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    
    //x co-ordinate
    random(0 + size, width - size),
    //y co-ordinate
    random(0 + size, height - size),
    //x-velocity
    random(-7, 7),
    //y-velocity
    random(-7, 7),
    //randomly generated colour
    randomRGB(),
    //size as defined earlier
    size,
  );
  
  //pushing the created ball into the array
  balls.push(ball);
}

//defining the function to make this work
function loop() {
  //making the background black
  ctx.fillStyle = "rgb(0 0 0 / 25%)";
  //filling our site
  ctx.fillRect(0, 0, width, height);

  //drawing and updating balls, as well as checking for collisions every frame with the previous constraints
  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect();
  }
  //to keep rerunning the function
  requestAnimationFrame(loop);
}

//now call the function to see the animation in action!!
 loop();

