// Crystallize Program in Processing

int N = 10; // Number of initial lines
float p = 0.05; // Probability of branching
float growth_rate = 1; // Growth rate of lines per frame
float T = 10; // Threshold to forgive collision for small lines
ArrayList<Line> lines = new ArrayList<Line>(); // List to store all active lines
ArrayList<Line> branches = new ArrayList<Line>(); // List to store fractal branches

void setup() {
  size(800, 800); // Set canvas size
  background(255); // White background
  stroke(0); // Black lines
  //noFill(); // No fill for shapes

  // Initialize N random lines radiating from the center
  for (int i = 0; i < N; i++) {
    float angle = random(TWO_PI); // Random angle in radians
    lines.add(new Line(new PVector(0, 0), angle));
  }
}

void draw() {
  translate(width / 2, height / 2); // Move origin to the center of the canvas
  background(255); // Clear the canvas each frame

  // Grow and render all active lines
  for (Line line : lines) {
    if (line.growing) {
      line.grow();
      line.spawnBranches();
      checkIntersections(line);
    }
    line.display();
  }

  // Add new branches to the main lines list
  lines.addAll(branches);
  branches.clear();
}

void checkIntersections(Line line) {
  for (Line otherLine : lines) {
    if (otherLine != line && otherLine.growing) {
      if (doLinesIntersect(line, otherLine) && linesAboveThreshold(line, otherLine)) {
        if (line.length > otherLine.length){
          otherLine.growing = false;
        } else {
          line.growing = false;
        }
      }
    }
  }
}

boolean doLinesIntersect(Line line1, Line line2) {
  // Get the end points of both lines
  PVector p1 = line1.start;
  PVector p2 = line1.getEnd();
  PVector p3 = line2.start;
  PVector p4 = line2.getEnd();

  // Calculate the intersection using the line-line intersection formula
  float denom = (p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y);
  if (denom == 0) return false; // Lines are parallel

  float ua = ((p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x)) / denom;
  float ub = ((p2.x - p1.x) * (p1.y - p3.y) - (p2.y - p1.y) * (p1.x - p3.x)) / denom;

  // Check if the intersection point lies within both line segments
  if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
    return true;
  }
  return false;
}

boolean linesAboveThreshold(Line line1, Line line2){
  return (line1.length >= T && line2.length >= T);
}

class Line {
  PVector start; // Starting point of the line
  float angle; // Angle in radians
  float length; // Length of the line
  boolean growing; // Whether the line is still growing
  boolean alive; // Whether the line is alive (visible)

  Line(PVector start, float angle) {
    this.start = start;
    this.angle = angle;
    this.length = 0;
    this.growing = true;
    this.alive = true;
  }

  void grow() {
    if (growing) {
      length += growth_rate;
      //println(length);
    }
  }

  PVector getEnd() {
    // Calculate the end point of the line
    float endX = start.x + length * cos(angle);
    float endY = start.y + length * sin(angle);
    return new PVector(endX, endY);
  }

  void spawnBranches() {
    if (random(1) < p) {
      // Spawn left branch (60% perpendicular)
      float leftAngle = angle + 0.6 * HALF_PI;
      branches.add(new Line(this.getEnd().mult(0.95), leftAngle-0.1));

      // Spawn right branch (60% perpendicular)
      float rightAngle = angle - 0.6 * HALF_PI;
      branches.add(new Line(this.getEnd().mult(0.95), rightAngle+0.1));
    }
  }

  void display() {
    if (alive) {
      PVector end = getEnd();
      line(start.x, start.y, end.x, end.y);
    }
  }
}
