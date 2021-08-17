export default `


varying vec3 vPositionW;
varying vec3 vNormalW;
varying vec3 vNormal2;
varying vec2 vUv;
varying float noisePos;
uniform sampler2D uTexture;
uniform sampler2D uTextureShiny;
uniform float uTextureInterpolation;
uniform float uSteped;

void main()
{
  vec3 viewDirectionW = normalize(cameraPosition - vPositionW);
	float fresnelTerm = dot(viewDirectionW, vNormal2);
  fresnelTerm = clamp(0.58 - fresnelTerm, 0., 1.0);

  vec4 textureDitto = texture2D(uTexture, vUv);
  vec4 textureShiny = texture2D(uTextureShiny, vUv);

  

  vec4 colorWhite = vec4(0.6, 1, 0.976, 1.0); 


  vec4 fresnelBlack = vec4(0.850, 0.470, 0.788, 1.0);

  vec4 mixedTexture = mix(textureDitto, colorWhite, uTextureInterpolation);

  
  vec4 colorBlackEffect = mix(textureShiny, colorWhite, fresnelTerm);

  vec4 finalColor = mix(mixedTexture, fresnelBlack, fresnelTerm);

  //finalColor.a = noisePos;

  vec4 finalMix = mix(finalColor, colorBlackEffect, noisePos);

  gl_FragColor = finalMix;
}
`;
