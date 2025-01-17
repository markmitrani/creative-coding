const canvasSketch = require('canvas-sketch');

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
const rootsOfUnity= (n, r) => {
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

const sketch = () => {
  return ({ context, width, height }) => {
    // n = 22, r = 1000000
    
    n = 37
    r = 4000000
    
    // Off-white background
    context.fillStyle = 'hsl(0, 0%, 98%)';
    context.fillRect(0, 0, width, height);

    context.save();
    // Set the canvas origin (0,0) to center canvas
    // All coordinates to the left of center canvas are negative
    // All coordinates below center canvas are negative
    context.translate(width/2, height/2);
    
    // debugging: test roots of unity function
    //console.log(rootsOfUnity(6, 1))

    center = new Point(width/2, height/2)

    context.strokeStyle = 'black';
    context.lineWidth = width * 0.001;
    
    // draw circle in the center
    context.beginPath();
    //context.arc(0, 0, 25, 0, 2 * Math.PI);
    context.stroke();

    // make array containing circle points
    circlePoints = rootsOfUnity(n, r)
    
    // draw the points on the circle
    for (let i = 0; i < n; i++) {
        current = circlePoints[i]
        
        // debugging: log current point
        //console.log(current)

        context.beginPath();
        //context.arc(current.x, current.y, 10, 0, 2 * Math.PI);
        context.stroke();
    }

    // link points to others sequentially
    for (let i = 0; i < n; i++) {
        current = circlePoints[i]
        next = circlePoints[(i+1)%n]

        // debugging: log beginning and end
        //console.log(current)
        //console.log(next)
        
        context.beginPath();
        // define start and end points
        context.moveTo(current.x, current.y);
        context.lineTo(next.x, next.y);

        context.stroke();
    }
    
    o = 2
    // link each point to every other point
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - 2*o; j++) {
            current = circlePoints[i]
            next = circlePoints[(i+o+j)%n]

            // debugging: log beginning and end
            //console.log(current)
            //onsole.log(next)

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
