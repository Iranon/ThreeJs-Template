//Shaders are stored in .js format in order to make possible to import them into the main script
//Textures missing: only for example purpose

const vertexShader =
`
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

uniform sampler2D uDisplaceTexture;
uniform float uDisplaceStrength;

attribute vec3 position;
attribute vec2 uv;
attribute vec3 normal;

varying vec2 vUV;
varying vec3 vNormal;

void main() {
    vUV = uv;
    vNormal = normal;
    vec3 pPos = position;
    pPos.z += texture2D(uDisplaceTexture, uv).x * uDisplaceStrength;
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(pPos, 1.0);
    }

` ;

const fragmentShader =
`
precision mediump float;

uniform sampler2D uColorTexture;

varying vec2 vUV;
varying vec3 vNormal;

void main() {
    vec3 color = texture2D(uColorTexture, vUV).rgb;
    gl_FragColor = vec4(color, 1.0);
    }

`;

export { vertexShader, fragmentShader };
