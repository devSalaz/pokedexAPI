export default `

uniform float uPixelRatio;
uniform float uTime;
uniform float uScale;
attribute float aScale;


void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.z += sin(uTime + modelPosition.x * 100.0) * aScale * 0.2;
    modelPosition.y += sin(uTime + modelPosition.x * 100.0) * aScale * 0.2; 
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;
    gl_PointSize = uPixelRatio * aScale * 190.0 * uScale; 
    //gl_PointSize = 2000.0;
    gl_PointSize *= (1.0 / - viewPosition.z);
}
`;
