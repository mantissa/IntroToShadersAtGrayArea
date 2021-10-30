#ifdef GL_ES
precision mediump float;
#endif

// attributes (data from 3D model)
attribute vec3 aPosition;
attribute vec2 aTexCoord;
attribute vec3 aNormal;

// varying (send to .frag file)
varying vec2 vTexCoord;

// uProjectionMatrix 
// calculates perspective effect of the camera
// field of view, aspect ratio, viewing frustrum
// defined when calling perspective() or ortho() function in p5.js
uniform mat4 uProjectionMatrix;

// uModelViewMatrix
// a combination of the model & view matrices
// the view matrix defines the position/direction/orientation of the camera
// the model matrix defines the position/scale/rotation of the model
// together, model-view matrix converts the object coordinates into camera/eye coordinates
// multiplying uModelViewMatrix * vec4(aPosition, 1.0) moves the object into its position in front of the camera
uniform mat4 uModelViewMatrix;

// our texture
uniform sampler2D uTexture0;

// current time (seconds)
uniform float uTime;

// how much to displace 
uniform float uDisplacementAmt;
uniform float uExplodeID;

void main() {

  // model vertex/position as vec4
  vec4 positionVec4 = vec4(aPosition.xyz, 1.0);
    
  // send tex coord to .frag
  vTexCoord = aTexCoord;
  
  // get the texture & calculate brightness 
  vec3 color = texture2D( uTexture0,  vec2(aTexCoord.x, 1.0-aTexCoord.y)).rgb;
  float brightness = color.r * 0.7 + color.g * 0.2 + color.b * 0.1;
  
  // use the brightness to calculate the displacement amount
  float displaceAmt = brightness;
  displaceAmt -= 0.5;
  displaceAmt *= sin( aTexCoord.x * 2. + uTime * 3.14156 * 0.1 + aTexCoord.y * 4.3 + uExplodeID);
  displaceAmt *= uDisplacementAmt;
  
  // offset the vertex by the brightness (on z-axis)
  //positionVec4 += vec4(0., 0., displaceAmt, 0.);
  positionVec4 += vec4( aNormal * displaceAmt, 0.0);
  
  // we multiply the position by the model view & projection matrix (the order is important here)
  // send clip position to GPU
  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
}