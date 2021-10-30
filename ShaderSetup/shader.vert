#ifdef GL_ES
precision mediump float;
#endif

// position & text coordinate attributes
attribute vec3 aPosition;
attribute vec2 aTexCoord;

// 'varying' variable used to send data
// from .vert shader to .frag shader
// here we pass along the texture coordinate
// that is sent to the shader
varying vec2 vTexCoord;

uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;

void main() {

  // take our position vec3 and convert to vec4
  // we usually do a lot more math on this 
  vec4 positionVec4 = vec4(aPosition, 1.0);

  // scale the rect by two, and move it to the center of the screen
  // in our gl context
  // x: -1 is left, and +1 is right
  // y -1 is bottom, +1 is top
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
  
  // just copy the texture coordinate
  vTexCoord = aTexCoord;

  // send the position to this GPU
  // this is like gl_FragColor but for vertices
  gl_Position = positionVec4;
}