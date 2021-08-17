export default `
varying vec3 vPositionW;
varying vec3 vNormalW;
uniform sampler2D textureBody;
uniform sampler2D uMask;
uniform float uValR;
varying vec2 vUv;
varying vec3 vNormal2;

void main()
{

  float fresnel = dot(cameraPosition, vNormal2);
  fresnel = fresnel * fresnel * fresnel * fresnel * fresnel * fresnel;
  fresnel = clamp(fresnel, 0.0, 1.0);
  vec4 textureAlbedo = texture2D(textureBody, vUv);

  vec4 textureMask = texture2D(uMask, vUv);

  vec4 textureEyes = textureAlbedo;
  textureEyes.r -= uValR;

  vec4 textureMix = mix(textureAlbedo, textureEyes, textureMask.r);

  //vec3 color = vec3(0.960, 0.686, 0.098);
  vec3 viewDirectionW = normalize(cameraPosition - vPositionW);
  float fresnelTerm = dot(viewDirectionW, vNormalW);
  fresnelTerm = 1.65 * (clamp(0.6 - fresnelTerm, 0., 1.));

  fresnel = abs(fresnel -1.0);

  fresnelTerm += fresnel * 0.5;

  //gl_FragColor = vec4( color * fresnelTerm, 1.);

  //vec3 color2 = vec3(0.945, 0.152, 0.066);

  //vec3 finalColor = mix(color, color2, fresnelTerm);

  //gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);

  vec4 colorWhite = vec4(1.0, 1.0, 1.0, 1.0);

  vec4 finalColor = mix( textureMix, colorWhite ,fresnelTerm * 1.0);
  
  //gl_FragColor = textureAlbedo;
  gl_FragColor = finalColor;
}
`;
