let myCamera; 
let webCam; 
let videoMesh;
let myShader;
let pumpkinTex;
let drawStoke = false;
let displaceAmt = 0.0;
let didExplode = false;
let explodeTime = 0.0;
let explodeDuration = 0.2;
let explodeFreeze = 1.0;
let returnTime = 3.0;
let explodeID = 0;
let displaceAmplitude = 1.0;

function preload() {
  
  //load a 3d model
  videoMesh = loadModel('Pumpkin.obj');
  //videoMesh = loadModel('VideoMesh.obj');
  
  // load our shader
  // note that shader names don't have to be the same
  // this is useful when multiple shaders use the same .vert or .frag file
  // you don't need to write code multiple times
  myShader = loadShader('displace.vert', 'default.frag');
  
  //capture = createCapture(VIDEO);
  //capture.size(640, 480);
  //capture.hide(); // hide it
  
  pumpkinTex = loadImage("textures/pumpkinL_Pumpkin_AlbedoTransparency.png");
}


function setup() {
   
  // 640 x 480 canvas
  createCanvas(640, 640, WEBGL);

  
  myCamera = createCamera()
  
  //displaceAmt = createSlider(0.0, 3.0, 1.0, 0);
  //displaceAmt.position(10, height + 5);
  //displaceAmt.style('width', '200px');
}

function doExplode(){

	if( !didExplode ) return;
	
	let elapsed = millis()/1000 - explodeTime;
	
	if( elapsed < explodeDuration )
	{
		let t = elapsed/explodeDuration;
		displaceAmt = cubicOut(t);	
	} 
	else if( elapsed < explodeDuration + explodeFreeze)
	{
		displaceAmt = 1.0;
	} 
	else if( elapsed < explodeDuration + explodeFreeze + returnTime){
		let t = (elapsed-explodeDuration - explodeFreeze )/returnTime;
		displaceAmt = smoothstep(0.0, 1.0, 1.0-t);	//(1.0-t);	
		
	} else 
	{
		didExplode = false;
		displaceAmt = 0.0;
	}
}

function smoothstep (min, max, value) {
  var x = Math.max(0, Math.min(1, (value-min)/(max-min)));
  return x*x*(3 - 2*x);
}

function cubicOut( t) {
  var f = t - 1.0;
  return f * f * f + 1.0;
}

function cubicIn( t) {
  return t * t * t;
}

function draw() {
  
  doExplode();
  
  background(220);
  
  // elapsed time in seconds
  let elapsedSeconds = millis()/1000;
  let rotationAngle = TWO_PI*elapsedSeconds*0.05;
  
  // set the camera position
  // we're rotating in a circular orbit around the center
  myCamera.setPosition(sin(rotationAngle)*200, 0, cos( rotationAngle) * 200);
  
  // always look at the center
  myCamera.lookAt(0, 0, 0);
  
  // set the camera perspective
  myCamera.perspective(radians(50), width / height, 0.1, 500);
  
  noStroke();
  
  push();
  
  // rotate and scale mesh
  // we scale it 50x to bring it to the dimensions of our 3D world
  // model/object space => world space

  scale(60, 60, 60);  
  rotateZ(radians(180));
  
  // begin the shader
  // send uniform data
  shader(myShader);
  myShader.setUniform("uTime", elapsedSeconds);
  myShader.setUniform("uTexture0", pumpkinTex);
  myShader.setUniform("uDisplacementAmt", displaceAmt*displaceAmplitude);
  myShader.setUniform("uExplodeID", explodeID);
  
  // draw the 3D model
  model(videoMesh);
  //\6rect(0, 0, 640, 480);
  
  pop();

}

function mousePressed(){

	//if( didExplode ) return;
	
	didExplode = true;
	explodeTime = millis()/1000;
	explodeID++;
	displaceAmplitude = random() * 4.0 + 1.0;
	
}

