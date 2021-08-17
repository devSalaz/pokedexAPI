import React, { useEffect, useRef, useState, useCallBack } from "react";

import * as THREE from "three";
import gsap from "gsap";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";

import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass.js";

import PsyduckModel from "../assets/models/psyduck/psyduckPainted.glb";
import SignModel from "../assets/models/psyduck/sign.glb";

import TextuBase from "../assets/models/textures/diffuse/firstPainted.jpg";
import TextuMatSignos from "../assets/models/textures/matcaps/MatCap-White4.jpg";
import TextuMatSoftIce from "../assets/models/textures/matcaps/MatCap-White6.jpg";
import TextureMaskPsy from "../assets/models/textures/diffuse/mask-psy.jpg";

/*Import Shaders*/

import ShaderVertex from "../assets/models/shaders/psyduck/vertexShader.glsl.js";
import ShaderFragment from "../assets/models/shaders/psyduck/fragmentShader.glsl.js";

import FragmentParticles from "../assets/models/shaders/particlesPsyduck/fragmentShader.glsl.js";
import VertexParticles from "../assets/models/shaders/particlesPsyduck/vertexShader.glsl.js";

import DizziEmoji from "../assets/images/emojis/dizzi-aple.png";

import "../assets/styles/errorPageStyles.css";

const ErrorPage = () => {
  useEffect(() => {
    let camera, renderer, scene;
    let controls;
    let canvasParent;

    document.body.style.overflow = "hidden";

    //Models
    let Ball;

    /**
     * Loaders
     */

    const loadingContent = document.querySelector(".loader-div");
    const loadingBarElement = document.querySelector(
      ".bar-loading-error .bar-error"
    );
    const loadingManager = new THREE.LoadingManager(
      //Loaded
      () => {
        window.setTimeout(() => {
          gsap.to(tintPass.material.uniforms.uSteped, {
            duration: 30.0,
            value: 0.85,
            delay: 1,
          });

          loadingContent.classList.add("ended");
        }, 1500);
      },

      //Progress
      (itemUrl, itemsLoaded, itemsTotal) => {
        const progressRatio = itemsLoaded / itemsTotal;
        loadingBarElement.style.transform = `scaleX(${progressRatio})`;
      }
    );

    const gltfLoader = new GLTFLoader(loadingManager);
    const textureLoader = new THREE.TextureLoader(loadingManager);

    /**
     * Sizes
     */
    const sizes = {
      width: 0,
      height: 0,
    };

    /*Mouse Variables*/
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    let groupObjects = [];
    let currentIntersect = null;

    /**
     * Scene
     */
    scene = new THREE.Scene();

    /**
     * Canvas
     */
    canvasParent = document.querySelector(".errorPage-container");
    sizes.width = canvasParent.offsetWidth;
    sizes.height = canvasParent.offsetHeight;
    const canvas = document.querySelector("#threeCanvas");

    /*Textures Creation*/

    const textureMatBody = textureLoader.load(TextuBase);
    textureMatBody.encoding = THREE.sRGBEncoding;
    textureMatBody.flipY = false;

    const textureMatSigns = textureLoader.load(TextuMatSignos);
    const textureMask = textureLoader.load(TextureMaskPsy);
    textureMask.flipY = false;

    const textureSoftIce = textureLoader.load(TextuMatSoftIce);

    const matshaderPrueba = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        textureBody: { value: textureMatBody },
        uDistortion: { value: 0.1 },
        uMask: { value: textureMask },
        uValR: { value: 0.0 },
      },
      vertexShader: ShaderVertex,
      fragmentShader: ShaderFragment,
    });

    const firefliesMaterial = new THREE.ShaderMaterial({
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      uniforms: {
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uTime: { value: 0.0 },
        uScale: { value: 1.0 },
        uColor: { value: new THREE.Vector3(1.0, 1.0, 1.0) },
      },

      vertexShader: VertexParticles,
      fragmentShader: FragmentParticles,
    });

    const customUniforms = {
      uTime: { value: 0 },
      uTextureMatcap: { value: textureSoftIce },
    };

    const matcapSigns = new THREE.MeshMatcapMaterial();
    matcapSigns.matcap = textureMatSigns;
    matcapSigns.transparent = true;

    matcapSigns.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = customUniforms.uTime;
      shader.uniforms.uTexture2 = customUniforms.uTextureMatcap;

      shader.vertexShader = shader.vertexShader.replace(
        "#include <common>",
        `
        #include <common>
        uniform float uTime;
        varying vec3 vNormal2;
        varying vec3 vPositionW;
		    varying vec3 vNormalW;
        `
      );

      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        `
        #include <begin_vertex>
        transformed.y += 1.0 * sin(5.0 + (uTime * 1.0));

        transformed.y += 0.1*sin(transformed.x * 4.0 * 3.141525 + (uTime * 5.0));
        vNormal2 = normal;
        vPositionW = vec3( vec4( position, 1.0 ) * modelMatrix);
        vNormalW = normalize( vec3( vec4( normal, 0.0 ) * modelMatrix ));
        `
      );

      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <common>",
        `
        #include <common>
        uniform float uTime;
        uniform sampler2D uTexture2;
        varying vec3 vNormal2;
        varying vec3 vPositionW;
		    varying vec3 vNormalW;
        `
      );

      shader.fragmentShader = shader.fragmentShader.replace(
        `matcapColor = matcapTexelToLinear( matcapColor );`,
        `
        matcapColor = matcapTexelToLinear( matcapColor );
        `
      );

      shader.fragmentShader = shader.fragmentShader.replace(
        `#include <color_fragment>`,
        `
        #include <color_fragment>
        `
      );
    };

    gltfLoader.load(PsyduckModel, (gltf) => {
      Ball = gltf.scene;
      Ball.scale.set(0.15, 0.15, 0.15);

      Ball.traverse(function (object) {
        if (object.isMesh) {
          object.material = matshaderPrueba;
          if (object.name === "ModelPsy") {
            groupObjects.push(object);
          }
        }
      });

      scene.add(Ball);
    });

    let sign;

    gltfLoader.load(SignModel, (gltf) => {
      sign = gltf.scene;
      sign.scale.set(0.12, 0.12, 0.12);
      sign.position.set(-3, 0, 1);

      sign.traverse(function (object) {
        if (object.isMesh) {
          object.material = matcapSigns;
          if (object.name === "Sign") {
            groupObjects.push(object);
          }
        }
      });

      const sign2 = sign.clone();

      sign2.traverse(function (object) {
        if (object.isMesh) {
          if (object.name === "Sign") {
            groupObjects.push(object);
          }
        }
      });

      sign2.position.set(2.7, 0, 1.9);
      sign2.scale.set(0.05, 0.05, 0.05);

      const sign3 = sign.clone();
      sign3.traverse(function (object) {
        if (object.isMesh) {
          if (object.name === "Sign") {
            groupObjects.push(object);
          }
        }
      });

      sign3.position.set(1.15, 2.1, 0.5);
      sign3.scale.set(0.07, 0.07, 0.07);

      const sign4 = sign.clone();
      sign4.traverse(function (object) {
        if (object.isMesh) {
          if (object.name === "Sign") {
            groupObjects.push(object);
          }
        }
      });
      sign4.position.set(-1.95, -0.25, -2);
      sign4.scale.set(0.07, 0.07, 0.07);

      const sign5 = sign.clone();
      sign5.traverse(function (object) {
        if (object.isMesh) {
          if (object.name === "Sign") {
            groupObjects.push(object);
          }
        }
      });
      sign5.position.set(3, -1.85, -3);
      sign5.scale.set(0.165, 0.165, 0.165);

      const sign6 = sign.clone();
      sign6.traverse(function (object) {
        if (object.isMesh) {
          if (object.name === "Sign") {
            groupObjects.push(object);
          }
        }
      });
      sign6.position.set(-3.4, 2.6, -3);
      sign6.scale.set(0.15, 0.15, 0.15);

      scene.add(sign, sign2, sign3, sign4, sign5, sign6);
    });

    /*Create Particles*/
    const firefliesGeometry = new THREE.BufferGeometry();
    const firefliesCount = 120;
    const positionArray = new Float32Array(firefliesCount * 3);

    for (let i = 0; i < firefliesCount; i++) {
      positionArray[i * 3 + 0] = (Math.random() - 0.5) * 10;
      positionArray[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positionArray[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }

    firefliesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positionArray, 3)
    );

    const scaleArray = new Float32Array(firefliesCount);

    for (let i = 0; i < firefliesCount; i++) {
      // ...

      scaleArray[i] = Math.random();
    }

    // ...
    firefliesGeometry.setAttribute(
      "aScale",
      new THREE.BufferAttribute(scaleArray, 1)
    );

    const fireflies = new THREE.Points(firefliesGeometry, firefliesMaterial);
    scene.add(fireflies);

    /**
     * Camera
     */

    camera = new THREE.PerspectiveCamera(55, sizes.width / sizes.height);
    camera.position.z = 6;

    const windowWidth = window.innerWidth;
    if (windowWidth <= 1026) {
      camera.fov = 75;
    }

    /**
     * Orbit Controls
     */
    controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enabled = false;

    /**
     * Renderer
     */

    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
    });
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    /**
     * Post processing
     */
    let RenderTargetClass = null;

    if (renderer.getPixelRatio() === 1 && renderer.capabilities.isWebGL2) {
      RenderTargetClass = THREE.WebGLMultisampleRenderTarget;
    } else {
      RenderTargetClass = THREE.WebGLRenderTarget;
    }

    const renderTarget = new RenderTargetClass(800, 600, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      encoding: THREE.sRGBEncoding,
    });

    const effectComposer = new EffectComposer(renderer, renderTarget);
    effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    effectComposer.setSize(sizes.width, sizes.height);

    const renderPass = new RenderPass(scene, camera);
    effectComposer.addPass(renderPass);

    // Tin pass
    const TintShader = {
      uniforms: {
        tDiffuse: { value: null },
        uTint: { value: null },
        uValX: { value: null },
        uValY: { value: null },
        uSteped: { value: null },
        uTime: { value: null },
      },
      vertexShader: `
      varying vec2 vUv;

      void main()
      {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

          vUv = uv;
      }
  `,
      fragmentShader: `

      vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
      vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
      vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

      float cnoise(vec3 P){
      vec3 Pi0 = floor(P); // Integer part for indexing
      vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
      Pi0 = mod(Pi0, 289.0);
      Pi1 = mod(Pi1, 289.0);
      vec3 Pf0 = fract(P); // Fractional part for interpolation
      vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
      vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
      vec4 iy = vec4(Pi0.yy, Pi1.yy);
      vec4 iz0 = Pi0.zzzz;
      vec4 iz1 = Pi1.zzzz;

      vec4 ixy = permute(permute(ix) + iy);
      vec4 ixy0 = permute(ixy + iz0);
      vec4 ixy1 = permute(ixy + iz1);

      vec4 gx0 = ixy0 / 7.0;
      vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
      gx0 = fract(gx0);
      vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
      vec4 sz0 = step(gz0, vec4(0.0));
      gx0 -= sz0 * (step(0.0, gx0) - 0.5);
      gy0 -= sz0 * (step(0.0, gy0) - 0.5);

      vec4 gx1 = ixy1 / 7.0;
      vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
      gx1 = fract(gx1);
      vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
      vec4 sz1 = step(gz1, vec4(0.0));
      gx1 -= sz1 * (step(0.0, gx1) - 0.5);
      gy1 -= sz1 * (step(0.0, gy1) - 0.5);

      vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
      vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
      vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
      vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
      vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
      vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
      vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
      vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

      vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
      g000 *= norm0.x;
      g010 *= norm0.y;
      g100 *= norm0.z;
      g110 *= norm0.w;
      vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
      g001 *= norm1.x;
      g011 *= norm1.y;
      g101 *= norm1.z;
      g111 *= norm1.w;

      float n000 = dot(g000, Pf0);
      float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
      float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
      float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
      float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
      float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
      float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
      float n111 = dot(g111, Pf1);

      vec3 fade_xyz = fade(Pf0);
      vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
      vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
      float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
      return 2.2 * n_xyz;
    }

      uniform sampler2D tDiffuse;
      uniform vec3 uTint;
      uniform float uValX;
      uniform float uValY;
      uniform float uSteped;
      uniform float uTime;

      varying vec2 vUv;

      void main()
      {

          float vNoise = cnoise(vec3(vUv.x * 15.0 , vUv.y * 10.0 , uTime));

          float absNoise = abs(vNoise);

          float stepNoise = step(uSteped, absNoise);

          vec2 newUV = vUv;

          float PI = 3.1415926;

          newUV.y += uValY * 0.008 * sin(newUV.x * 16.0 * PI);
          newUV.x +=  uValX * 0.004 * sin(newUV.y * 16.0 * PI);

          vec4 color = texture2D(tDiffuse, newUV);
          color.r += 0.075;

          //vec4 colorBG = vec4(0.172, 0.745, 0.949, 1.0);
          vec4 colorBG = vec4(1.0, 1.0, 1.0, 1.0);

          vec4 mixColor = mix(color, colorBG, stepNoise);

          gl_FragColor = color;
          gl_FragColor = vec4(mixColor);
      }
  `,
    };

    const tintPass = new ShaderPass(TintShader);
    tintPass.material.uniforms.uTint.value = new THREE.Vector3();
    tintPass.material.uniforms.uValX.value = 0.0;
    tintPass.material.uniforms.uValY.value = 0.0;
    tintPass.material.uniforms.uSteped.value = 0.0;
    tintPass.material.uniforms.uTime.value = 0.0;
    effectComposer.addPass(tintPass);

    // Antialias pass
    if (renderer.getPixelRatio() === 1 && !renderer.capabilities.isWebGL2) {
      const smaaPass = new SMAAPass();
      effectComposer.addPass(smaaPass);
    }

    //Call tick function

    /**
     * Listeners
     */
    window.addEventListener("resize", () => {
      ResizeWindow();
    });

    let posX = 0;
    let posY = 0;
    let posMultiplier = 1.0;
    const multiplier = {
      value: 1.0,
    };

    canvas.addEventListener("mousemove", (event) => {
      let canvasBounds = canvas.getBoundingClientRect();

      mouse.x =
        ((event.clientX - canvasBounds.left) /
          (canvasBounds.right - canvasBounds.left)) *
          2 -
        1;
      mouse.y =
        -(
          (event.clientY - canvasBounds.top) /
          (canvasBounds.bottom - canvasBounds.top)
        ) *
          2 +
        1;
    });

    canvas.addEventListener("touchmove", (event) => {
      let canvasBounds = canvas.getBoundingClientRect();

      mouse.x =
        ((event.changedTouches[0].clientX - canvasBounds.left) /
          (canvasBounds.right - canvasBounds.left)) *
          2 -
        1;
      mouse.y =
        -(
          (event.changedTouches[0].clientY - canvasBounds.top) /
          (canvasBounds.bottom - canvasBounds.top)
        ) *
          2 +
        1;
    });

    canvas.addEventListener("mouseleave", () => {
      gsap.to(multiplier, { value: 0.0 });
    });

    canvas.addEventListener("mouseenter", () => {
      gsap.to(multiplier, { value: 1.0 });
    });

    /**
     * Resize Function
     */
    function ResizeWindow() {
      // Update sizes
      sizes.width = canvasParent.offsetWidth;
      sizes.height = canvasParent.offsetHeight;
      // Update camera
      const windowWidth = window.innerWidth;
      if (windowWidth <= 1026) {
        camera.fov = 75;
      } else {
        camera.fov = 55;
      }

      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      effectComposer.setSize(sizes.width, sizes.height);
      effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    /**
     * Animate
     */
    const clock = new THREE.Clock();

    const tick = () => {
      camera.updateMatrixWorld();

      posX = multiplier.value * mouse.x * 0.08;
      posY = multiplier.value * mouse.y * 0.12;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(groupObjects);

      if (intersects.length) {
        let intersectedName = intersects[0].object.name;
        if (!currentIntersect) {
          document.body.style.cursor = "pointer";

          if (intersectedName === "Sign") {
            gsap.to(intersects[0].object.scale, {
              x: 1.17,
              y: 1.17,
              z: 1.17,
            });
          }

          if (intersectedName === "ModelPsy") {
            gsap.to(matshaderPrueba.uniforms.uValR, {
              value: 0.65,
              duration: 1.5,
            });
          }
        }

        currentIntersect = intersects[0];
      } else {
        if (currentIntersect) {
          document.body.style.cursor = "auto";
          let currentLeave = currentIntersect.object.name;

          if (currentLeave === "Sign") {
            gsap.to(currentIntersect.object.scale, {
              x: 1.0,
              y: 1.0,
              z: 1.0,
            });
          }

          if (currentLeave === "ModelPsy") {
            gsap.to(matshaderPrueba.uniforms.uValR, {
              value: 0.0,
              duration: 1.5,
            });
          }
        }

        currentIntersect = null;
      }

      camera.lookAt(posX, posY, 0);

      // Update controls

      const elapsedTime = clock.getElapsedTime();

      tintPass.material.uniforms.uValX.value = mouse.x;
      tintPass.material.uniforms.uValY.value = mouse.y;
      tintPass.material.uniforms.uTime.value = elapsedTime;

      matshaderPrueba.uniforms.uTime.value = elapsedTime;
      firefliesMaterial.uniforms.uTime.value = elapsedTime;

      customUniforms.uTime.value = elapsedTime;

      // Render
      effectComposer.render();

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };
    tick();
    window.requestAnimationFrame(ResizeWindow);
  }, []);

  return (
    <div className="errorPage-container">
      <div className="loader-div ">
        <div className="loader-content">
          <h3>
            <span>
              <img src={DizziEmoji} alt="dizzi-emoji" />
            </span>
            &nbsp;PAGE NOT FOUND&nbsp;
            <span>
              <img src={DizziEmoji} alt="dizzi-emoji" />
            </span>
          </h3>
          <div className="bar-loading-error">
            <div className="bar-error"></div>
            <div className="bar-front"></div>
          </div>
        </div>
      </div>
      <canvas id="threeCanvas"></canvas>
    </div>
  );
};

export default ErrorPage;
