export default `

uniform float uTime;
varying vec3 vPositionW;
varying vec3 vNormalW;
varying vec3 vNormal2;
varying vec2 vUv;
varying vec3 modelPos;


void main()
{

  
  vNormal2 = normal;
  vUv = uv;

  vPositionW = vec3( vec4( position, 1.0 ) * modelMatrix);
  vNormalW = normalize( vec3( vec4( normal, 0.0 ) * modelMatrix ));

  vec3 newPosition = position;

  newPosition.z += 0.65 * sin(newPosition.x  + (uTime * 3.5));

  

  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(newPosition, 1.0);

  modelPos = position;
}
`;
