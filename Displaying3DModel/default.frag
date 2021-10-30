#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D uTexture0;

varying vec2 vTexCoord;

void main() {
  
  vec3 color = texture2D( uTexture0, vec2(vTexCoord.x, 1.0-vTexCoord.y)).rgb;
  
  gl_FragColor = vec4(color, 1.0);
}