// define our shader
let theShader;
let isFullscreen = false;

function preload(){

  // load our shader
  theShader = loadShader('shader.vert', 'shader.frag');
}

function setup() {
  
  // create our window, make sure to use WEBGL!
  createCanvas(600, 600, WEBGL);
}

function draw() {
  
  background(255);
  noStroke();
  
  // 'bind' the shader; begin the program
  shader(theShader);
  
  // set the shader uniform values:
  // 1. send the mouse position (in absolute pixels)
  // note that we invert y because 0 is at the bottom in glsl coordinates
  theShader.setUniform('uMouse', [mouseX, mouseY]);
  
  // 2. send the resolution
  theShader.setUniform('uResolution', [width, height]);
  
  // 3. calculate & send the time (set as float)
  // take milliseconds & divide by 1000 => seconds
  let seconds = millis()/1000;
  theShader.setUniform('uTime', seconds);
  
  // 4. send the blue value
  // this is something i made up and added by myself
  // there are so many possibilities for what you
  // can send to your shader!
  theShader.setUniform('uBlue', sin(seconds*2.)*0.5+0.5);
  
  // 5. other types
  //theShader.setUniform("uMyVec2", [0, 1]);
  //theShader.setUniform("uMyVec3", [0, 1, 2]);
  //theShader.setUniform("uMyArray", [0, 1, 2, 3, 4, 5]);

  // 6. draw a full screen rectangle 
  // because the shader is bound, the shader
  // sets the pixels for the rectangle
  // what happens when you comment out line 23 and refresh?
  // can you explain what's going on?
  rect(0,0,width,height);
  
  // 7. try other types
  //rect(mouseX,mouseY,width,height);
  //ellipse(mouseX, mouseY, width, height, 50);
  //ellipse(250, 0, width/2, height/2, 50);
  
  // reset to default shader
  resetShader();
  
  //fill(0);
  //rect(0, 0, 200, 200);
}

/*
function mousePressed() {

  if (mouseX > 0 && mouseX < windowWidth && mouseY > 0 && mouseY < windowHeight) {
    isFullscreen = fullscreen();
    fullscreen(!isFullscreen);
    isFullscreen = !isFullscreen;
    
  }
  
}

function windowResized() {
  if( isFullscreen){
    resizeCanvas(windowWidth, windowHeight);

  }else{
    resizeCanvas(600, 400);
  }
}*/