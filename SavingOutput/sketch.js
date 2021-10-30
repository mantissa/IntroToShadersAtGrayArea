// define our shader
let theShader;
let isSaving = true;
let numFramesToSave = 100;
let numSavedFrames = 0;

var fps = 30;

var capturer= new CCapture({
  format: 'png',
  framerate: fps
});


function preload(){

  // load our shader
  theShader = loadShader('shader.vert', 'colorCycle.frag');
}

function setup() {
  
  // create our window
  createCanvas(400, 400, WEBGL);
  
  frameRate(fps);
  //capturer.start();
}

function draw() {
  
  background(0);
  
  // this is a hack for a known bug in CCapture
  // where it breaks if you call start() in setup()
  // so we call it 1x in draw() instead
  
  if( frameCount == 1) capturer.start();
  
  // 'bind' the shader; begin the program
  shader(theShader);
  
  // send the resolution
  theShader.setUniform('uResolution', [width, height]);
  
  // calculate & send the time (set as float)
  // take milliseconds & divide by 1000 => seconds
  let seconds = millis()/1000;
  
  // @note: since rendering can take longer than the duration between frames
  // you will likely need to change the current time 
  // the typical practice is to use the framecount
  seconds = numSavedFrames / frameCount;
  
  theShader.setUniform('uTime', seconds);
  
  // we can also just create a variable called phase or percentage and use
  // that in our shader
  let phase = numSavedFrames/numFramesToSave;
  theShader.setUniform('uPhase', phase);

  // draw a full screen rectangle 
  rect(-width/2,-height/2,width,height);
  
  // reset to default shader
  resetShader();
  
  // @note this didn't work in chrome but worked in firefox!
  // using FF, many frames were skipped due to some internal limit set by the browser
  // in other words, it does not allow you to download 100 files in 2 seconds
  
  /*
  if( isSaving ){
	 
	let fileName = 'frames/photo' + numSavedFrames.toString().padStart(3, '0') + '.png'
	
	print("saving" + fileName);
	
	saveCanvas(fileName, 'png'); 
	 
	numSavedFrames++;
	
	if( numSavedFrames >= numFramesToSave){
		isSaving = false;
	}
  }
  */
  
  // see https://stubborncode.com/posts/how-to-export-images-and-animations-from-p5-js/
  
  if( isSaving ){
	  
	print("saving frame "+numSavedFrames.toString().padStart(3, '0'));

	capturer.capture(document.getElementById('defaultCanvas0'));
	
	numSavedFrames++;

	if( numSavedFrames >= numFramesToSave){
		
		print("finished saving");
		
		isSaving = false;
		
		//noLoop();
		console.log('finished recording.');
		capturer.stop();
		capturer.save();
	}
  }
}

