#ifdef GL_ES
precision mediump float;
#endif
  
// most of these are the same as the Book of Shaders uniforms 
// (but without underscores!)
// reminder: uniforms are sent from the program that runs the shaders
// could be p5.js, processing, openFrameworks, Unity, etc.
  
uniform float uTime;
uniform float uPhase;
uniform vec2 uResolution;
varying vec2 vTexCoord;

//  Function from Iñigo Quiles
//  https://www.shadertoy.com/view/MsS3Wc
vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix(vec3(1.0), rgb, c.y);
}

void main() {

    // this is our st/uv
    vec2 uv = vTexCoord;
    
    // create a color using the shapes uv coordinates
    vec3 color = hsb2rgb(vec3(uPhase, uv));

    // send the colors to the GPU
    gl_FragColor = vec4(color, 1.0);
}