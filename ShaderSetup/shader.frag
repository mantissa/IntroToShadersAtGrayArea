#ifdef GL_ES
precision mediump float;
#endif
  
// most of these are the same as the Book of Shaders uniforms 
// (but without underscores!)
// reminder: uniforms are sent from the program that runs the shaders
// could be p5.js, processing, openFrameworks, Unity, etc.
  
uniform float uTime;
uniform vec2 uResolution;
  
varying vec2 vTexCoord;

void main() {

    // this is our st/uv
    vec2 uv = vTexCoord;
    
    // create a color using the shapes uv coordinates
    vec3 color = vec3(vTexCoord.xy, 0.0);

    // send the colors to the GPU
    gl_FragColor = vec4(color, 1.0);
}