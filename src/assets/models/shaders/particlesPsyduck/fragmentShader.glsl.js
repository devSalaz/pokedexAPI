export default `

uniform vec3 uColor;

void main()
{
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float strength = 0.1 / distanceToCenter - 0.2;

    float strength2 = 0.15 / (distance(vec2(gl_PointCoord.x, (gl_PointCoord.y - 0.5) * 5.0 + 0.5), vec2(0.5)));
    strength2 *= 0.15 / (distance(vec2(gl_PointCoord.y, (gl_PointCoord.x - 0.5) * 5.0 + 0.5), vec2(0.5)));
    strength2 -= 0.01;

    gl_FragColor = vec4(0.964, 0.941, 0.894, strength2);
    gl_FragColor = vec4(uColor.x, uColor.y, uColor.z, strength2); 
}`;
