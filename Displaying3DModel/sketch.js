
let pumpkinMesh;
let myShader;
let pumpkinTex;
let virtualCamera;

function preload() {
  
  //load a 3d model
  pumpkinMesh = loadModel('Pumpkin.obj');
  
  // load our shader
  // note that shader names don't have to be the same
  // this is useful when multiple shaders use the same .vert or .frag file
  // you don't need to write code multiple times
  myShader = loadShader('default.vert', 'default.frag');
  
  // load our texture
  pumpkinTex = loadImage("textures/pumpkinL_Pumpkin_AlbedoTransparency.png");
}

function setup() {
  
  // 640 x 480 canvas
  createCanvas(640, 640, WEBGL);
  
  // our 3D camera, not a video camera
  virtualCamera = createCamera();
}


function draw() {
  
  background(220);
  
  // elapsed time in seconds
  let elapsedSeconds = millis()/1000;
  let rotationAngle = TWO_PI*elapsedSeconds*0.05;
  
  // set the camera position
  // we're rotating in a circular orbit around the center
  virtualCamera.setPosition(sin(rotationAngle)*200, 0, cos( rotationAngle) * 200);
  
  // always look at the center
  virtualCamera.lookAt(0, 0, 0);
  
  // set the camera perspective
  // 50 degrees FOV
  // aspect ratio
  // near clipping plane
  // far clipping plane
  virtualCamera.perspective(radians(50), width / height, 0.1, 500);

  // disable stroke
  noStroke();

  // store the current transformation
  // position is { 0, 0, 0 }
  // scale is { 1, 1, 1 }
  // rotate is { 0, 0, 0 }
  
  push();
  
  // rotate and scale mesh
  // model/object space => world space
  
  // we scale it 100x to bring it to the dimensions of our 3D world
  // rotate in z to display model upright

  scale(100, 100, 100);  
  rotateZ(radians(180));
  
  // begin the shader
  // send uniform data
  shader(myShader);
  myShader.setUniform("uTime", elapsedSeconds);
  myShader.setUniform("uTexture0", pumpkinTex);
 
  // draw the 3D model
  model(pumpkinMesh);
  
  // recall the previous transformation (saved with previous push())
  pop();
}

