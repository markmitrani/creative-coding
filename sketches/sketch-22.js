const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ]
};


// Utility functions, redundant if using the canvas-sketch-util library
const degToRad = (degrees) => {
  return degrees / 180 * Math.PI;
}

const randomRange = (minimum, maximum) => {
  return Math.random()*(maximum-minimum)+minimum;
}

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "hsl(0,50%,50%)";
    context.fillRect(0, 0, width, height);

    const cx = width*0.5;
    const cy = width*0.5;

    const w = width*0.01;
    const h = height*0.1;
    let x, y;

    const num = 32;
    const radius = width*0.27;

    
    for (let i = 0; i<num; i++) {
      const slice = math.degToRad(360/num);
      const angle = slice * i;

      x = cx + radius * Math.sin(angle);
      y = cx + radius * Math.cos(angle);

      context.save();
      context.translate(cx, cy);
      context.rotate(-angle);
      context.scale(0.2, 5);
      context.lineWidth = random.range(5,  20);
      
      context.lineStyle = "hsl(0,50%, 10%)";
      context.beginPath();
      context.arc(0, 0, radius, slice *-2, slice * 1);
      context.stroke();

      context.restore();
    }


  };
};

canvasSketch(sketch, settings);
