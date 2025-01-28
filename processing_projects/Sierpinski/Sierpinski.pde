int d = 1; // Initial fractal depth

void setup() {
  size(800, 800); // Set the canvas size
  stroke(127,0,0); // Set outline color to dark red
  background(255); // Set background to white
  drawSierpinski(width/2, 100, 700, d); // Draw the initial Sierpinski triangle
}

void draw() {
  // The draw loop is used to handle key presses and redraw the fractal
}

void keyPressed() {
  if (keyCode == UP && d < 10) { // Increase depth (up to a maximum of 10)
    d++;
  } else if (keyCode == DOWN && d > 1) { // Decrease depth (down to a minimum of 1)
    d--;
  }
  background(255); // Clear the canvas
  drawSierpinski(width/2, 100, 700, d); // Redraw the Sierpinski triangle with the new depth
}

void drawSierpinski(float x, float y, float size, int depth) {
  if (depth == 0) {
    // Base case: draw a single triangle
    triangle(x, y, x - size/2, y + size, x + size/2, y + size);
  } else {
    // Recursive case: draw three smaller Sierpinski triangles
    float newSize = size / 2;
    drawSierpinski(x, y, newSize, depth - 1); // Top triangle
    drawSierpinski(x - newSize/2, y + newSize, newSize, depth - 1); // Bottom-left triangle
    drawSierpinski(x + newSize/2, y + newSize, newSize, depth - 1); // Bottom-right triangle
  }
}
