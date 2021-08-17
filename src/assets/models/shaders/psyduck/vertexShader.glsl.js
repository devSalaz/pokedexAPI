export default `
varying vec3 vPositionW;
varying vec3 vNormalW;
varying vec2 vUv;

varying vec3 vNormal2;

uniform float uTime;
uniform float uDistortion;

float PI = 3.141516;

void main()
{
  
  vec3 newPosition = position;
  newPosition.x +=  uDistortion*sin(newPosition.y * 3.0 * PI + (uTime * 3.0));
  newPosition.y +=  uDistortion*sin(newPosition.z * 3.0 * PI + (uTime * 3.0));

  vNormal2 = normal;

  vUv = uv;
  vPositionW = vec3( vec4( position, 1.0 ) * modelMatrix);
  vNormalW = normalize( vec3( vec4( normal, 0.0 ) * modelMatrix ));
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(newPosition, 1.0);
}
`;
