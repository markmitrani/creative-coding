const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 4096, 4096 ]
};

function Point(x, y) {
    this.x = x;
    this.y = y;
}

/*
Used to calculate the roots of unity given n and r (radius).
Results are stored as x and y coordinates of Point.
(n, r) => Array[Point()]
*/
const rootsOfUnity = (n, r) => {
    // Initialize points array
    let points = new Array(n)

    for (let k = 0; k < n; k++) {
        // Find a and b values for all n roots
        argument = 2*Math.PI*k/n
        a = Math.cos(argument)*Math.sqrt(r) // x coordinate
        b = Math.sin(argument)*Math.sqrt(r) // y coordinate
        
        // Create points from coordinates
        let kthPoint = new Point(a, b)

        // Store at kth point in array
        points[k] = kthPoint
    }

    return points;
}

const distortPoints = (circlePoints, dx, dy, deviationFactor) => {
    // const newPoints = circlePoints.array.map(element => {
    //     const randomX = random.range(-dx * deviationFactor, dx * deviationFactor);
    //     const randomY = random.range(-dy * deviationFactor, dy * deviationFactor);
    //     return new Point(element.x + randomX, element.y + randomY);
    // });

    // return newPoints;
    // Prepare an empty array to store results
  const newPoints = [];

  // Standard for loop to iterate over every element in circlePoints
  for (let i = 0; i < circlePoints.length; i++) {
    let originalPoint = circlePoints[i];

    // Create random offsets of ±dx * deviationFactor and ±dy * deviationFactor
    let randomX = random.range(-dx * deviationFactor, dx * deviationFactor);
    let randomY = random.range(-dy * deviationFactor, dy * deviationFactor);

    // Create a new slightly shifted point
    let newPoint = new Point(
      originalPoint.x + randomX,
      originalPoint.y + randomY
    );

    // Push into the array
    newPoints.push(newPoint);
  }

  // Return the new array of shifted points
  return newPoints;
};


  

const sketch = () => {
  return ({ context, width, height }) => {
    // n = 37, r = 4000000
    
    n = 37
    r = 3500000
    
    // Off-white background
    context.fillStyle = 'hsl(0, 0.00%, 0.00%)';
    context.fillRect(0, 0, width, height);

    context.save();
    // Set the canvas origin (0,0) to center canvas
    // All coordinates to the left of center canvas are negative
    // All coordinates below center canvas are negative
    context.translate(width/2, height/2);
    
    // debugging: test roots of unity function
    //console.log(rootsOfUnity(6, 1))
    let dx = 0.3;
    let dy = 1;
    let deviationFactor = 1000;

    context.strokeStyle = 'hsl(0, 46.70%, 47.80%)';
    context.lineWidth = width * 0.001;
    
    // draw circle in the center
    context.beginPath();
    context.arc(0, 0, 25, 0, 2 * Math.PI);
    context.stroke();

    // make array containing circle points
    circlePoints = rootsOfUnity(n, r);

    circlePointsDist = distortPoints(circlePoints, dx, dy, deviationFactor);
    
    // draw the points on the circle
    for (let i = 0; i < n; i++) {
        current = circlePointsDist[i]
        
        // debugging: log current point
        //console.log(current)

        context.lineWidth = width * 0.01;
        context.beginPath();
        // context.arc(current.x, current.y, 100, 0, 2 * Math.PI);
        context.stroke();
        context.lineWidth = width * 0.001;
    }

    // link points to others sequentially
    for (let i = 0; i < n; i++) {
        current = circlePointsDist[i]
        next = circlePointsDist[(i+1)%n]

        // debugging: log beginning and end
        //console.log(current)
        //console.log(next)
        
        context.beginPath();
        // define start and end points
        context.moveTo(current.x, current.y);
        context.lineTo(next.x, next.y);

        context.stroke();
    }
    
    o = 15 // offset (how many adjacent points to skip before linking)
    // link each point to every other point
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - 2*o; j++) {
            current = circlePointsDist[i]
            next = circlePointsDist[(i+o+j)%n]

            // debugging: log beginning and end
            //console.log(current)
            //console.log(next)

            context.beginPath();
            // define start and end points
            context.moveTo(current.x, current.y);
            context.lineTo(next.x, next.y);
            
            context.stroke();
        }
    }

    context.restore()

  };

  
};

canvasSketch(sketch, settings);
