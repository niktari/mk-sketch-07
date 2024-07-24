let minSize = 2; // Minimum size of the box
let maxSize = 250; // Maximum size of the box

let palette = ["#EC4300", "#007A59", "#2A64AF", "#8A7752"];
let colors = [];

const PARAMS = {
  boxHeight: 1,
  boxDepth: 1,
  minScale: 2,
  maxScale: 250,
  boxSpacing: 250,
  boxAmount: 2
};

const pane = new Tweakpane.Pane();

function setup() { 
  createCanvas(1500, 800, WEBGL);
  noStroke();
  rectMode(CENTER);

  // Add parameters
  pane.addInput(PARAMS, "boxHeight", {
    min: 1,
    max: 5
  });

  pane.addInput(PARAMS, "boxDepth", {
    min: 0.5,
    max: 5
  });

  pane.addInput(PARAMS, "minScale", {
    min: 0.25,
    max: 5
  });

  pane.addInput(PARAMS, "maxScale", {
    min: 10,
    max: 300
  });

  pane.addInput(PARAMS, "boxSpacing", {
    min: 10,
    max: 800
  });

  // Initialize colors
  initializeColors();
}

function initializeColors() {
  for (var y = -2; y <= 2; y++) {
    colors[y + 2] = [];
    for (var x = -4; x <= 4; x++) { // Adjusted for 9 columns
      colors[y + 2][x + 4] = random(palette);
    }
  }
}

function draw() { 
  clear();
  background(255, 0);
  ambientLight(200);
  directionalLight(200, 200, 200, -1, -1, -1);

  let z = 2;

  for (var y = -2; y <= 2; y++) {
    for (var x = -4; x <= 4; x++) { // Adjusted for 9 columns
      let color = colors[y + 2][x + 4];
      
      // Adjust the noise parameters to ensure each cube has a unique scale
      let n = noise(x * 0.2 + frameCount * 0.001, y * 0.2 + frameCount * 0.001, z * 0.2);
      // Map the noise value to the desired size range
      let boxSize = map(n, 0, 1, PARAMS.minScale, PARAMS.maxScale);

      push();
      fill(color);
      translate(PARAMS.boxSpacing * x, PARAMS.boxSpacing * y, -PARAMS.boxSpacing * z);
      rotateX(frameCount * 0.002);
      rotateY(x * frameCount * 0.002);
      box(boxSize, boxSize * PARAMS.boxHeight, boxSize * PARAMS.boxDepth);
      pop();
    }
  }
}
