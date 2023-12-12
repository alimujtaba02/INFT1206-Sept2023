// set up canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random RGB color value

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}
//creating a shape superclass which doesnt take the size and colour constructors
class Shape{
   constructor(x, y, velX, velY){
      this.x= x;
      this.y= y;
      this.velX= velX;
      this.velY= velY;
   }
}

//making ball inherit from shape
class Ball extends Shape{

   constructor(x, y, velX, velY, color, size) {
      //passing the same arguements from shape into ball
      super(x,y,velX,velY)
      //adding the color and size
      this.color = color;
      this.size = size;
      //a property to make sure the ball actually exists (hasnt been eaten)
      this.exists= true;
   }

   draw() {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      ctx.fill();
   }

   update() {
      if ((this.x + this.size) >= width) {
         this.velX = -(Math.abs(this.velX));
      }

      if ((this.x - this.size) <= 0) {
         this.velX = Math.abs(this.velX);
      }

      if ((this.y + this.size) >= height) {
         this.velY = -(Math.abs(this.velY));
      }

      if ((this.y - this.size) <= 0) {
         this.velY = Math.abs(this.velY);
      }

      this.x += this.velX;
      this.y += this.velY;
   }

   collisionDetect() {
      //updating this to make sure the ball exists
      for (const ball of balls) {
         if (this !== ball && ball.exists) {
            const dx = this.x - ball.x;
            const dy = this.y - ball.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + ball.size) {
              ball.color = this.color = randomRGB();
            }
         }
      }
   }
}

//creating the evil circle, which will eat the balls
//also inherits from shape
class EvilCircle extends Shape{
   //only values to be passed are x and y. the velocity will be hardcoded to 20
   constructor(x,y){
      super(x,y,20,20)
      //setting color and size to the hardcoded value
      this.color='white';
      this.size=10;

      
      // Bind the event listener function
      this.handleKeyDown = this.handleKeyDown.bind(this);
      window.addEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(e) {
      switch (e.key) {
          case "a":
              this.x -= this.velX;
              break;
          case "d":
              this.x += this.velX;
              break;
          case "w":
              this.y -= this.velY;
              break;
          case "s":
              this.y += this.velY;
              break;
      }
  }
   //adding a method to draw the evil circle
   draw() {
      ctx.beginPath();
      //making the stroke thick for visibility 
      ctx.lineWidth = 3;
      //the only difference is the use of strokestyle and stroke, since we don't want to fill the circle.
      ctx.strokeStyle = this.color;
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      ctx.stroke();
   }
   //checking the bounds, this is similar to update
   checkBounds() {
      //the reason we add or subtract from the size is so we can bounce the circle back to the screen, instead of updating the velocity
      if ((this.x + this.size) >= width) {
          this.x -= this.size;
      }

      if ((this.x - this.size) <= 0) {
          this.x += this.size;
      }

      if ((this.y + this.size) >= height) {
          this.y -= this.size;
      }

      if ((this.y - this.size) <= 0) {
          this.y += this.size;
      }
      //removed the automatic updating, since we want to rely on the key reader to move the circle
  }
  //collision detect method, to eat the balls
  collisionDetect() {
   //just need to make sure the ball exists for this
   for (const ball of balls) {
      if (ball.exists) {
         //algorithm to check
         const dx = this.x - ball.x;
         const dy = this.y - ball.y;
         const distance = Math.sqrt(dx * dx + dy * dy);

         //deleting the ball on collision
         if (distance < this.size + ball.size) {
            ball.exists = false;
         }
      }
   }
} 
}

//creating the evil circle
const evilCircle = new EvilCircle(random(0, width), random(0, height));
const balls = [];

while (balls.length < 25) {
   const size = random(10,20);
   const ball = new Ball(
      // ball position always drawn at least one ball width
      // away from the edge of the canvas, to avoid drawing errors
      random(0 + size,width - size),
      random(0 + size,height - size),
      random(-7,7),
      random(-7,7),
      randomRGB(),
      size
   );

  balls.push(ball);
}


// Reference to the paragraph for ball count
const ballCountPara = document.querySelector('p');

// Function to update ball count in the paragraph
function updateBallCount() {
    ballCountPara.textContent = 'Ball count: ' + balls.filter(ball => ball.exists).length;
}

// Initial call to update the ball count
updateBallCount();

function loop() {
   ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
   ctx.fillRect(0, 0,  width, height);

   for (const ball of balls) {
   //making sure this only happens if the ball exists
      if (ball.exists){
         ball.draw();
         ball.update();
         ball.collisionDetect();
      }   
   }
   //drawing the circle
   evilCircle.draw();
   //checking the evil circle is within bounds
   evilCircle.checkBounds();
   //giving the circle the ability to eat balls
   evilCircle.collisionDetect();

   //update the ball count every frame
   updateBallCount();
   requestAnimationFrame(loop);
}

loop();
