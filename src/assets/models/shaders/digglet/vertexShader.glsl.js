export default `

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

  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}
`;
