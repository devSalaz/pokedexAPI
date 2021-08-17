export default `

uniform float uTime;
varying vec3 vPositionW;
varying vec3 vNormalW;
varying vec3 vNormal2;
varying vec2 vUv;


void main()
{


  vNormal2 = normal;
  vUv = uv;

  vPositionW = vec3( vec4( position, 1.0 ) * modelMatrix);
  vNormalW = normalize( vec3( vec4( normal, 0.0 ) * modelMatrix ));

  vec3 newPos = position;

  newPos.x += 0.007 * sin(newPos.x * 10.0 + uTime);
  newPos.x += 0.01 * sin(newPos.z * 10.0 + uTime); 

  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(newPos, 1.0);
}
`;
