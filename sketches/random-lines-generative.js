// random-choice-artwork.js

// import canvas-sketch framework and random
const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

// set stroke thickness (percent of min dimension)
let strokeThickness = 3;

// 3. Choose a two-digit ratio approximating the provided screenshot.
//    For example, 43:100 is roughly 0.43, similar to 316:730.
const ratioWidth  = 42;
const ratioHeight = 100;
const pixelRatio = 20;

const settings = {
  // Change ratioWidth/Height and pixelRatio to increase/decrease ratio.
  // e.g rw 42, rh 100, pr 10 = 420px x 1000px.
  dimensions: [ ratioWidth*pixelRatio, ratioHeight*pixelRatio ],
};

function Point(x, y) {
    this.x = x;
    this.y = y;
}

// keep a list of lines
let lines = [];
// track current point
let currentPoint;
let lineCount = 0;
const numberOfTurns = 100

// Main sketch function
const sketch = ({ context, width, height }) => {
  // 4. Initialize the starting point near the top, slightly left of center
  currentPoint = new Point(width * 0.45, height * 0.92);

  for (let i = 0; i < numberOfTurns; i++) {
    lineCount = i;  
    // Decide whether to move horizontally or vertically (alternate each time)
    let nextPoint;
    if (lineCount % 2 === 0) {
      // Horizontal line: share y, random x
      nextPoint = new Point(random.range(0, width), currentPoint.y)
    } else {
      // Vertical line: share x, random y
      nextPoint = new Point(currentPoint.x, random.range(0, height))
    }

    if (lineCount === numberOfTurns-1){
      nextPoint = new Point(width * 0.57, height * 0.95)
    }

    // Push this line into the list so we can keep redrawing it
    lines.push({
      from: new Point(currentPoint.x, currentPoint.y),
      to: new Point(nextPoint.x, nextPoint.y)
    });

    // Update for next iteration
    currentPoint = nextPoint;
    lineCount++;
    console.log("Event captured. Line count:"+lineCount);
  }

  // The returned function is called on every frame to do the drawing
  return ({ context, width, height }) => {
    // Off-white background
    context.fillStyle = 'hsl(0, 0%, 98%)';
    context.fillRect(0, 0, width, height);    
    console.log("Beginning drawing.")
    // Set line styles
    context.lineWidth = strokeThickness * 1;
    context.strokeStyle = 'black';

    // Draw all lines in our lines array
    lines.forEach(({ from, to }) => {
      context.beginPath();
      context.moveTo(from.x, from.y);
      context.lineTo(to.x, to.y);
      context.stroke();
      console.log("Drew a line from "+from.x+","+from.y+", to "+to.x+","+to.y);
    });

    context.beginPath();
    context.arc(width * 0.78, height * 0.17, 50, 0, 2 * Math.PI);
    context.stroke();
  };
};

// 6. Run the sketch with the defined settings
canvasSketch(sketch, settings);