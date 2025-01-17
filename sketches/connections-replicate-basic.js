const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 2048, 2048 ]
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
    n = 13
    r = 900000
    
    // Off-white background
    context.fillStyle = 'hsl(0, 0%, 98%)';
    context.fillRect(0, 0, width, height);
    
    //console.log(rootsOfUnity(6, 1))
    center = new Point(width/2, height/2);

    context.strokeStyle = 'black';
    context.lineWidth = width * 0.01;
    
    context.beginPath();
    context.arc(2048, 2, 50, 0, 2 * Math.PI);
    context.stroke();

    context.beginPath();
    context.arc(center.x, center.y, 50, 0, 2 * Math.PI);
    context.stroke();

    // make array containing circle points
    circlePoints = rootsOfUnity(n, r)
    
    // draw the points on the circle
    for (let i = 0; i < n; i++) {
        current = circlePoints[i]
        console.log(current)
        context.beginPath();
        context.arc(center.x+current.x, center.y+current.y, 50, 0, 2 * Math.PI);
        context.stroke();
    }

    // connect points to others
    for (let i = 0; i < n; i++) {
        current = circlePoints[i]
        console.log(current)
        context.beginPath();
        // define starting point
        context.moveTo(center.x+current.x, center.y+current.y)

        context.lineTo(center.x+current.x, center.y+current.y, 50, 0, 2 * Math.PI);
        context.stroke();
    }

  };

  
};

canvasSketch(sketch, settings);
