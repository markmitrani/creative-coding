const canvasSketch = require('canvas-sketch');
const math = require('mathjs');

const settings = {
  dimensions: [ 2048, 2048 ]
};

const drawMatrix = (context, width, height, m, colormap) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
	context.strokeStyle = 'white';
    context.lineWidth = width * 0.005;
    
    let n = m.size()[0]
    let n_colors = colormap.length
    console.log(n)

    const w 	= width  * 1/n * 0.9;
    const h 	= height * 1/n * 0.9;
    const gap   = 0//width  * 0.003;
    const ix 	= width  * 1/n * 0.9;
    const iy 	= height * 1/n * 0.9;

    const off = width * 0.02;

    let x, y;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            x = ix + (w + gap) * i;
            y = iy + (h + gap) * j;

            current_val = m.get([j, i])

            current_color = colormap[Math.ceil(current_val*n_colors)]
            
            context.fillStyle = current_color
            context.fillRect(x, y, w, h);
            console.log("triggered at "+x+", "+y)
        }
    }
};

const sketch = () => {
  return ({ context, width, height }) => {
    let n = 20
    let m = math.zeros(n, n);

    for (let i = 0; i < n; i++){
        if (i !== 0) {
            m.set([i, i-1], 1/7*6)
            m.set([i-1, i], 1/7*6)
        }
    }
    // set special values
    m.set([0, 0], 1/7*6);
    m.set([n-1, n-1], 1/7*5);
    m.set([3,4], 1/7*5);
    m.set([6,7], 1/7*5);
    m.set([12,13], 1/7*5);
    m.set([14,13], 1/7*5);
    
    // cmap = ['lightgrey', 'mediumseagreen', 'steelblue', 'mediumpurple', 'lavenderblush', 'coral', 'gold'];
    cmap = ['lightgrey', 'gold', 'coral', 'lavenderblush', 'mediumpurple', 'steelblue', 'mediumseagreen'];

    // m = math.multiply(m,m)
    
    drawMatrix(context, width, height, m, cmap);

    console.log(m)
  };
  
};

canvasSketch(sketch, settings);
