#ifdef GL_ES
precision mediump float;
#endif
  
// most of these are the same as the Book of Shaders uniforms 
// (but without underscores!)
// reminder: uniforms are sent from the program that runs the shaders
// could be p5.js, processing, openFrameworks, Unity, etc.
  
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform float uBlue;
  
varying vec2 vTexCoord;

void main() {

    // calculate the normalized mouse position
    vec2 mouseXY = uMouse/uResolution;
    
    // this is our st/uv
    vec2 uv = vTexCoord;
    
    // calculate aspect ratio 
    // this is important for non square windows
    // multiply uv.x and mouse.x by the aspect ratio
    // to make the values 'even'
    float aspect = uResolution.x/uResolution.y;
    uv.x *= uResolution.x/uResolution.y;
    mouseXY.x *= uResolution.x/uResolution.y;
  mouseXY.y = 1.0 -mouseXY.y;
  
    // our color is our uv with a blue value coming from p5.js
    vec3 color = vec3(vTexCoord.xy, uBlue);
  
    /*
    // if pixel is close to mouse, inverse the colors
    if( distance(uv, mouseXY)<0.15){
      color = vec3(1.0, vTexCoord.xy);
    }
    */

    // send the colors to the GPU
    gl_FragColor = vec4(color, 1.0);
}