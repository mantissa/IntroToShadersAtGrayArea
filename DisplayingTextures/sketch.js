let catImg;
let myShader;

// preload items that we want to be available
// in our sketch when it starts
// we want our canvas to be the size of the image
// so we load our image then set the canvas to be the same size
function preload() {
  
  // 1. preload the image we're going to use
  catImg = loadImage('cute-cat.jpg');
  
  // 2. preload our vertex & fragment shaders
  myShader = loadShader('displayTexture.vert', 'displayTexture.frag');
}

function setup() {
  
  // create our window, use webgl for drawing
  // uses image width and height for size
  createCanvas(catImg.width, catImg.height, WEBGL);
}

function draw(){
  
  // 'bind' the shader
  // it will be applied to all shapes/meshes 
  // drawn afterwards
  shader(myShader);
  myShader.setUniform("uTexture0", catImg);
  myShader.setUniform("uMousePressed", mouseIsPressed);
  myShader.setUniform("uTime", millis()/1000);
  //myShader.setUniform("uBrightness", mouseX/width * 4);
  
  // draw a rectangle mesh
  // that takes up the whole screen
  rect(0,0,width,height);
}