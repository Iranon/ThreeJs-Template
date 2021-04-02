//Shaders are stored in .js format in order to make possible to import them (thanks to "export default")
export default
`
precision mediump float;

uniform sampler2D uColorTexture;

varying vec2 vUV;
varying vec3 vNormal;

void main() {
    vec3 color = texture2D(uColorTexture, vUV).rgb;
    gl_FragColor = vec4(color, 1.0);
    }
`