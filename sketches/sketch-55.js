const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'crimson';
    context.fillRect(0, 0, width, height);
	  context.strokeStyle = 'black';
    context.lineWidth = width * 0.01;

    const w 	= width  * 0.10;
		const h 	= height * 0.10;
		const gap   = width  * 0.03;
		const ix 	= width  * 0.8 - w/2;
		const iy 	= height * 0.8;

		const off = width  * 0.57;
    const coef = 0.75;

		let x, y;

		for (let i = 0; i < 13; i++) {
			
				x = ix + (w + gap) * i;
				y = iy-h/2;

				context.beginPath();
				context.rect(x, y, w, h);
				context.stroke();

        if (Math.random() > 0.5) {
					context.beginPath();
					context.rect(x + off / 2, y + off / 2, w - off, h - off);
					context.stroke();
				}

        context.rotate(2*Math.PI/64);
        context.scale(coef, coef);
			
		}

    
  };

  
};

canvasSketch(sketch, settings);
