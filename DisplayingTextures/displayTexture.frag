#ifdef GL_ES
precision mediump float;
#endif
  
uniform sampler2D uTexture0;
uniform bool uMousePressed;
uniform float uTime;
uniform float uBrightness;
  
varying vec2 vTexCoord;

void main() {
  
  // get the color from texture0's pixels
  // texture2D takes 2 arguments:
  // 1. the texture
  // 2. the uv coordinates (st)
  // uv coordinates are normalized
  vec2 uv = vec2(vTexCoord.x, 1.0-vTexCoord.y);
  vec4 color = texture2D(uTexture0,uv);
  
  // invert the color when uMousePressed is true
  if(uMousePressed) color.rgb = vec3(1.0) - color.rgb;
  
  //color.rgb *= uBrightness;
  
  //color.rgb = vec3( vTexCoord, 0.);
  
  //gl_FragColor = vec4(vec3(fract(uTime)),1.);
  gl_FragColor = vec4(color);
}