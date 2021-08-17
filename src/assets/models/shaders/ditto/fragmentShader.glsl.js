export default `
varying vec3 vPositionW;
varying vec3 vNormalW;
varying vec3 vNormal2;
varying vec2 vUv;
uniform sampler2D uTexture;
uniform sampler2D uTextureShiny;
uniform float uTextureInterpolation;

void main()
{
  vec3 viewDirectionW = normalize(cameraPosition - vPositionW);
	float fresnelTerm = dot(viewDirectionW, vNormal2);
  fresnelTerm = clamp(0.9 - fresnelTerm, 0., 1.);

  vec4 textureDitto = texture2D(uTexture, vUv);
  vec4 textureShiny = texture2D(uTextureShiny, vUv); 
  

  vec4 colorWhite = vec4(1.0, 1.0, 1.0, 1.0); 


  vec4 mixedTexture = mix(textureDitto, textureShiny, uTextureInterpolation);


  vec4 finalColor = mix(mixedTexture, colorWhite, fresnelTerm);

  gl_FragColor = finalColor;
}
`;
