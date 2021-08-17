import React, { useEffect } from "react";

import * as THREE from "three";
import gsap from "gsap";
import { useInView } from "react-intersection-observer";

import { CgPokemon } from "react-icons/cg";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";

import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass.js";

import PrimaryShinyTexture from "../assets/models/textures/diffuse/texPokemonsShiny.jpg";

import SecondTexture from "../assets/models/textures/diffuse/koffingTex.jpg";
import SecondShinyTexture from "../assets/models/textures/diffuse/koffingTexShiny.jpg";

import GengarModel from "../assets/models/gengar/gengarModel.glb";
import GengarTexture from "../assets/models/textures/diffuse/gengarTexture.jpg";
import GengarTextureShiny from "../assets/models/textures/diffuse/gengarTexShiny.jpg";
import GengarVertexshader from "../assets/models/shaders/gengar/vertexShader.glsl";
import GengarFragmentShader from "../assets/models/shaders/gengar/fragmentShader.glsl";

import DittoModel from "../assets/models/ditto/dittoModel.glb";
import DittoFragmentShader from "../assets/models/shaders/ditto/fragmentShader.glsl";
import DittoVertexShader from "../assets/models/shaders/ditto/vertexShader.glsl";
import DittoTexture from "../assets/models/textures/diffuse/texPokemons.jpg";

import DiggletModel from "../assets/models/digglet/diggletModel.glb";
import DiggletFragmentShader from "../assets/models/shaders/digglet/fragmentShader.glsl";
import DiggletVertexShader from "../assets/models/shaders/digglet/vertexShader.glsl";

import WeepinbellModel from "../assets/models/weepinbell/weepinbellModel.glb";
import WeepinbellFragmentShader from "../assets/models/shaders/weepinbell/fragmentShader.glsl";
import WeepinbellVertexShader from "../assets/models/shaders/weepinbell/vertexShader.glsl";

import KoffingModel from "../assets/models/koffing/koffingModel.glb";
import KoffingFragmentShader from "../assets/models/shaders/koffing/fragmentshader.glsl";
import KoffingVertexShader from "../assets/models/shaders/koffing/vertexShader.glsl";

import FragmentParticles from "../assets/models/shaders/particlesPsyduck/fragmentShader.glsl.js";
import VertexParticles from "../assets/models/shaders/particlesPsyduck/vertexShader.glsl.js";

//import components
import HeroSection from "../components/HeroSection";
import PokeWatching from "../components/PokeWatching";
import SoundToggle from "../components/SoundToggle";
import PokemonList from "../components/PokemonList";
import Accordion from "../components/Accordion";
import Footer from "../components/Footer";

//Importing CSS
import "../assets/styles/homepageStyles.css";
import { sRGBEncoding, TextureLoader } from "three";

const Homepage = () => {
  const [element, view] = useInView();

  useEffect(() => {
    document.body.style.overflowY = "hidden";

    let renderer;
    //Check if loaded variables
    let isAssetsLoaded = false;
    let diggletClicked = false;
    const loadingContainer = document.querySelector(".loading-screen");

    //Loading Manager
    const loadingManager = new THREE.LoadingManager(
      //Loaded
      () => {
        isAssetsLoaded = true;
        window.setTimeout(() => {
          loadingContainer.classList.add("loaded");
          document.body.style.overflowY = "auto";
        }, 1500);
      }
    );

    //Loaders
    const gltfLoader = new GLTFLoader(loadingManager);
    const textureLoader = new THREE.TextureLoader(loadingManager);

    //Creating mouse variables
    const mousePos = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    let groupObjects = [];
    let currentIntersect = null;

    // Canvas
    const canvasParent = document.querySelector(".three-container");
    const canvas = document.querySelector("#canvas-three");

    // Scene
    const scene = new THREE.Scene();
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    /**
     * Object
     */
    const geometry = new THREE.BoxBufferGeometry(1, 1, 1, 12, 12, 12);

    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    //Box mesh is for object position reference
    let windowScrollPos = window.scrollY;

    let GengarReference = document.querySelector(".gengar-container");
    let DittoReference = document.querySelector(".ditto-container");
    let DiggletReference = document.querySelector(".digglet-container");
    let WeepinbellReference = document.querySelector(".weepinbell-container");
    let KoofinReference = document.querySelector(".koffing-container");

    let imageStore = null;

    function setImage() {
      let bounds = DittoReference.getBoundingClientRect();

      mesh.scale.x = bounds.width;
      mesh.scale.y = bounds.width;
      mesh.scale.z = bounds.width;
      mesh.position.y =
        windowScrollPos - bounds.top + sizes.height / 2 - bounds.height / 2;
      mesh.position.x = bounds.left - sizes.width / 2 + bounds.width / 2;
      mesh.position.z = -mesh.scale.z / 2;
    }

    const geometryD = new THREE.BoxBufferGeometry(1, 1, 1, 12, 12, 12);

    const texturePokemon_01 = textureLoader.load(DittoTexture);
    texturePokemon_01.encoding = THREE.sRGBEncoding;
    texturePokemon_01.flipY = false;
    const primaryShinyTexture = textureLoader.load(PrimaryShinyTexture);
    primaryShinyTexture.encoding = THREE.sRGBEncoding;
    primaryShinyTexture.flipY = false;
    const secondTexture = textureLoader.load(SecondTexture);
    secondTexture.encoding = THREE.sRGBEncoding;
    secondTexture.flipY = false;
    const secondShinyTexture = textureLoader.load(SecondShinyTexture);
    secondShinyTexture.encoding = THREE.sRGBEncoding;
    secondShinyTexture.flipY = false;
    const gengarTexture = textureLoader.load(GengarTexture);
    gengarTexture.flipY = false;
    gengarTexture.encoding = THREE.sRGBEncoding;
    const gengarShinyTexture = textureLoader.load(GengarTextureShiny);
    gengarShinyTexture.flipY = false;
    gengarShinyTexture.encoding = THREE.sRGBEncoding;

    const materialD = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true,
    });

    //Adding a cube reference for gengar position(is a trick i found for an easy way to set gengar model position)
    const gengarCube = new THREE.Mesh(geometryD, materialD);
    scene.add(gengarCube);

    const gengarMaterial = new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.FrontSide,
      vertexShader: GengarVertexshader,
      fragmentShader: GengarFragmentShader,
      uniforms: {
        uTime: { value: 0.0 },
        uTexture: { value: gengarTexture },
        uTextureShiny: { value: gengarShinyTexture },
        uTextureInterpolation: { value: 0.0 },
        uSteped: { value: 1.0 },
      },
    });

    let ditto;

    let gengar;
    gltfLoader.load(GengarModel, (gltf) => {
      gengar = gltf.scene;
      gengar.scale.set(1, 1, 1);

      gengar.traverse(function (object) {
        if (object.isMesh) {
          object.material = gengarMaterial;
          if (object.name === "GengarModel") {
            groupObjects.push(object);
          }
        }
      });

      let bounds = GengarReference.getBoundingClientRect();

      gengar.scale.x = bounds.width / 0.7;
      gengar.scale.y = bounds.width / 0.7;
      gengar.scale.z = bounds.width / 0.7;

      gengarCube.scale.x = bounds.width / 1;
      gengarCube.scale.y = bounds.width / 1;
      gengarCube.scale.z = bounds.width / 1;

      gengarCube.position.y =
        0.0 - bounds.top + sizes.height / 2 - bounds.height / 2;
      gengarCube.position.x = bounds.left - sizes.width / 2 + bounds.width / 2;
      gengarCube.position.z = -gengarCube.scale.z / 2;
      gengar.lookAt(new THREE.Vector3(0, 0, 600));

      gengar.position.x = gengarCube.position.x;
      gengar.position.y = 0;
      gengar.position.z = gengarCube.position.z;

      gengarCube.visible = false;
      scene.add(gengar);
    });

    const dittoMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0.0 },
        uTexture: { value: texturePokemon_01 },
        uTextureShiny: { value: primaryShinyTexture },
        uTextureInterpolation: { value: 0.0 },
        uPosX: { value: 1.0 },
        uPosY: { value: 1.0 },
      },
      vertexShader: DittoVertexShader,
      fragmentShader: DittoFragmentShader,
      wireframe: false,
    });

    gltfLoader.load(DittoModel, (gltf) => {
      ditto = gltf.scene;

      ditto.traverse(function (object) {
        if (object.isMesh) {
          object.material = dittoMaterial;
          if (object.name === "Ditto_ModelG") {
            groupObjects.push(object);
          }
        }
      });
      let bounds = DittoReference.getBoundingClientRect();

      ditto.scale.x = bounds.width / 0.85;
      ditto.scale.y = bounds.width / 0.85;
      ditto.scale.z = bounds.width / 0.85;
      ditto.position.y = 0;
      ditto.position.x = bounds.left - sizes.width / 2 + bounds.width / 6;
      ditto.position.z = -mesh.scale.z / 2;
      ditto.rotation.y = Math.PI / 5;
      ditto.rotation.x = Math.PI / 12;

      // Update camera
      const windowWidth = window.innerWidth;
      if (windowWidth <= 1026) {
        ditto.rotation.y = Math.PI / 9;
        ditto.rotation.x = Math.PI / 12;
      }

      scene.add(ditto);
    });

    let digglet;

    const diggletMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: texturePokemon_01 },
        uTextureShiny: { value: primaryShinyTexture },
        uTextureInterpolation: { value: 0.0 },
      },
      vertexShader: DiggletVertexShader,
      fragmentShader: DiggletFragmentShader,
      wireframe: false,
    });

    const boxGeo = new THREE.BoxBufferGeometry(1, 1, 1, 12, 12, 12);
    const boxMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      wireframe: true,
    });
    const boxMesh = new THREE.Mesh(boxGeo, boxMat);
    scene.add(boxMesh);

    gltfLoader.load(DiggletModel, (gltf) => {
      digglet = gltf.scene;
      digglet.scale.set(1, 1, 1);

      digglet.traverse(function (object) {
        if (object.isMesh) {
          object.material = diggletMaterial;
          if (object.name === "Digglet_Model") {
            groupObjects.push(object);
          }
        }
      });

      let bounds = DiggletReference.getBoundingClientRect();

      digglet.scale.x = bounds.width / 0.85;
      digglet.scale.y = bounds.width / 0.85;
      digglet.scale.z = bounds.width / 0.85;

      digglet.position.x = bounds.left - sizes.width / 1.95 + bounds.width / 2;
      digglet.position.z = -boxMesh.scale.z / 2;

      digglet.position.y = 0;

      let targetD = new THREE.Vector3();
      targetD.x = 0;
      targetD.y = digglet.position.y;
      targetD.z = 600;
      digglet.lookAt(targetD);

      scene.add(digglet);
    });

    let weepinbell;
    let weepinEyeLeft;

    const weepinbellMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: texturePokemon_01 },
        uTextureShiny: { value: primaryShinyTexture },
        uTextureInterpolation: { value: 0.0 },
        uTime: { value: 0.0 },
      },
      vertexShader: WeepinbellVertexShader,
      fragmentShader: WeepinbellFragmentShader,
    });

    gltfLoader.load(WeepinbellModel, (gltf) => {
      weepinbell = gltf.scene;
      weepinbell.scale.set(350, 350, 350);

      weepinbell.traverse(function (object) {
        if (object.isMesh) {
          object.material = weepinbellMaterial;
          if (object.name === "WeepinBody") {
            groupObjects.push(object);
            object.material = weepinbellMaterial;
          }
        }
      });

      let bounds = WeepinbellReference.getBoundingClientRect();
      weepinbell.scale.x = bounds.width;
      weepinbell.scale.y = bounds.width;
      weepinbell.scale.z = bounds.width;

      weepinbell.position.y = 0;
      weepinbell.position.x = bounds.left - sizes.width / 2 + bounds.width / 2;
      weepinbell.position.z = -mesh.scale.z / 2;
      weepinbell.rotation.y = 0;

      scene.add(weepinbell);
    });

    let koffing;

    const koffingMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0.0 },
        uTexture: { value: secondTexture },
        uTextureShiny: { value: secondShinyTexture },
        uTextureInterpolation: { value: 0.0 },
      },
      vertexShader: KoffingVertexShader,
      fragmentShader: KoffingFragmentShader,
      wireframe: false,
    });

    gltfLoader.load(KoffingModel, (gltf) => {
      koffing = gltf.scene;
      koffing.scale.set(300, 300, 300);
      koffing.traverse(function (object) {
        if (object.isMesh) {
          object.material = koffingMaterial;

          if (object.name === "KoffingBody") {
            groupObjects.push(object);

            object.material = koffingMaterial;
          }
        }
      });

      let bounds = KoofinReference.getBoundingClientRect();

      boxMesh.scale.x = bounds.width / 1;
      boxMesh.scale.y = bounds.width / 1;
      boxMesh.scale.z = bounds.width / 1;

      boxMesh.position.x = bounds.left - sizes.width / 2 + bounds.width / 2;
      boxMesh.position.z = -boxMesh.scale.z / 2;
      boxMesh.position.y =
        0.0 - bounds.top + sizes.height / 2 - bounds.height / 2;

      boxMesh.visible = false;

      koffing.scale.x = bounds.width;
      koffing.scale.y = bounds.width;
      koffing.scale.z = bounds.width;

      koffing.position.y = 0;

      koffing.position.x = bounds.left - sizes.width / 2 + bounds.width / 1.5;
      koffing.position.z = -mesh.scale.z;

      scene.add(koffing);
    });

    /*Adding Fireflies Particles*/
    const firefliesMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: true,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uTime: { value: 0.0 },
        uColor: { value: new THREE.Vector3(0.29, 0, 0.878) },
        uScale: { value: 1.0 },
      },

      vertexShader: VertexParticles,
      fragmentShader: FragmentParticles,
    });

    /*Create Particles*/
    const firefliesGeometry = new THREE.BufferGeometry();
    const firefliesCount = 40;
    const positionArray = new Float32Array(firefliesCount * 3);

    for (let i = 0; i < firefliesCount; i++) {
      positionArray[i * 3 + 0] = (Math.random() - 0.5) * 1;
      positionArray[i * 3 + 1] = (Math.random() - 0.5) * 1;
      positionArray[i * 3 + 2] = 200;
    }

    firefliesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positionArray, 3)
    );

    const scaleArray = new Float32Array(firefliesCount);

    for (let i = 0; i < firefliesCount; i++) {
      // ...

      scaleArray[i] = Math.random() * 100;
    }

    // ...
    firefliesGeometry.setAttribute(
      "aScale",
      new THREE.BufferAttribute(scaleArray, 1)
    );

    const fireflies = new THREE.Points(firefliesGeometry, firefliesMaterial);
    fireflies.scale.x = sizes.width;
    fireflies.scale.y = sizes.height;
    scene.add(fireflies);

    const planeD = new THREE.PlaneBufferGeometry(100, 100);
    const meshD = new THREE.Mesh(planeD, materialD);
    meshD.position.x = 100;
    //scene.add(meshD);

    window.addEventListener("scroll", () => {
      setImage();
    });

    setImage();

    function lerp(start, end, amt) {
      return (1 - amt) * start + amt * end;
    }

    /**
     * Sizes
     */

    function updatePosition() {
      if (isAssetsLoaded) {
        //Gengar Position
        let boundsGengar = GengarReference.getBoundingClientRect();

        let genggarLerpedY =
          0.0 - boundsGengar.top + sizes.height / 2 - boundsGengar.height / 2;

        gengarCube.position.y = lerp(
          gengarCube.position.y,
          genggarLerpedY,
          0.1
        );
        gengar.position.y = gengarCube.position.y;
        gengar.lookAt(new THREE.Vector3(0, 0, 600));

        //Ditto Position
        let boundsDitto = DittoReference.getBoundingClientRect();

        let dittoLerpedY =
          0.0 - boundsDitto.top + sizes.height / 2 - boundsDitto.height / 2;

        ditto.position.y = lerp(ditto.position.y, dittoLerpedY, 0.05);

        let boundsDigglet = DiggletReference.getBoundingClientRect();

        let diggletLerpedY =
          0.0 - boundsDigglet.top + sizes.height / 2 - boundsDigglet.height / 2;

        digglet.position.y = lerp(digglet.position.y, diggletLerpedY, 0.05);

        let boundsWeepinbell = WeepinbellReference.getBoundingClientRect();

        let weepinLerpedY =
          0.0 -
          boundsWeepinbell.top +
          sizes.height / 2 -
          boundsWeepinbell.height / 2;

        weepinbell.position.y = lerp(
          weepinbell.position.y,
          weepinLerpedY,
          0.05
        );

        let boundsKoffing = KoofinReference.getBoundingClientRect();

        let koffingLerpedY =
          0.0 - boundsKoffing.top + sizes.height / 2 - boundsKoffing.height / 2;

        koffing.position.y = lerp(koffing.position.y, koffingLerpedY, 0.08);

        boxMesh.position.y = lerp(boxMesh.position.y, koffingLerpedY, 0.05);
      }
    }

    window.addEventListener("resize", () => {
      // Update sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      // Update camera
      camera.position.z = 600;
      camera.aspect = sizes.width / sizes.height;

      camera.fov =
        2 * Math.atan(sizes.height / 2 / camera.position.z) * (180 / Math.PI);
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      effectComposer.setSize(sizes.width, sizes.height);
      effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      if (isAssetsLoaded) {
        onResize3D();
      }
    });

    window.addEventListener("click", (event) => {
      mousePos.x = (event.clientX / sizes.width) * 2 - 1;
      mousePos.y = -(event.clientY / sizes.height) * 2 + 1;
      //Raycaster Code
      raycaster.setFromCamera(mousePos, camera);
      const intersects = raycaster.intersectObjects(groupObjects);

      if (intersects.length) {
        let intersectedName = intersects[0].object.name;

        if (intersectedName === "Digglet_Model") {
          if (!diggletClicked) {
            gsap.to(diggletMaterial.uniforms.uTextureInterpolation, {
              value: 1.0,
              duration: 1.5,
            });
            diggletClicked = true;
          } else {
            gsap.to(diggletMaterial.uniforms.uTextureInterpolation, {
              value: 0.0,
              duration: 1.5,
            });
            diggletClicked = false;
          }
        }
      }
    });

    function mouseEventFunc(event) {
      mousePos.x = (event.clientX / sizes.width) * 2 - 1;
      mousePos.y = -(event.clientY / sizes.height) * 2 + 1;

      let posX = 0.5 + (mousePos.x + 1.0) / 2;
      let posY = 0.5 + (mousePos.y + 1.0) / 2;

      dittoMaterial.uniforms.uPosX.value = posX;
      dittoMaterial.uniforms.uPosY.value = posY;

      if (isAssetsLoaded) {
        let dittoCord = new THREE.Vector2();
        dittoCord.x = ditto.position.x;
        dittoCord.y = ditto.position.y;

        let vecNew3 = new THREE.Vector3();
        vecNew3.x = mousePos.x;
        vecNew3.y = mousePos.y;
        vecNew3.z = ditto.position.z;

        let distance = vecNew3.distanceTo(ditto.position);

        let target = new THREE.Vector3();

        target.x = mousePos.x * (sizes.width / 6);

        target.y = mousePos.y * (sizes.height / 6);

        target.z = 600;

        weepinbell.lookAt(target);
        weepinbell.rotation.x = Math.max(
          -0.3,
          Math.min(weepinbell.rotation.x, 0.3)
        );

        koffing.lookAt(target);
        koffing.rotation.x = Math.max(
          -0.3,
          Math.min(weepinbell.rotation.x, 0.3)
        );
      }
    }

    function mouseEventFuncMobile(event) {
      mousePos.x = (event.changedTouches[0].clientX / sizes.width) * 2 - 1;
      mousePos.y = -(event.changedTouches[0].clientY / sizes.height) * 2 + 1;

      let posX = 0.5 + (mousePos.x + 1.0) / 2;
      let posY = 0.5 + (mousePos.y + 1.0) / 2;

      dittoMaterial.uniforms.uPosX.value = posX;
      dittoMaterial.uniforms.uPosY.value = posY;

      if (isAssetsLoaded) {
        let dittoCord = new THREE.Vector2();
        dittoCord.x = ditto.position.x;
        dittoCord.y = ditto.position.y;

        let vecNew3 = new THREE.Vector3();
        vecNew3.x = mousePos.x;
        vecNew3.y = mousePos.y;
        vecNew3.z = ditto.position.z;

        let distance = vecNew3.distanceTo(ditto.position);

        let target = new THREE.Vector3();

        target.x = mousePos.x * (sizes.width / 6);

        target.y = mousePos.y * (sizes.height / 6);

        target.z = 600;

        weepinbell.lookAt(target);
        weepinbell.rotation.x = Math.max(
          -0.3,
          Math.min(weepinbell.rotation.x, 0.3)
        );

        koffing.lookAt(target);
        koffing.rotation.x = Math.max(
          -0.3,
          Math.min(weepinbell.rotation.x, 0.3)
        );
      }
    }

    function onResize3D() {
      let gengarBounds = GengarReference.getBoundingClientRect();
      let dittoBounds = DittoReference.getBoundingClientRect();
      let diggletBounds = DiggletReference.getBoundingClientRect();
      let weepinbellBounds = WeepinbellReference.getBoundingClientRect();
      let koofingBounds = KoofinReference.getBoundingClientRect();

      /*Gengar*/
      gengar.scale.x = gengarBounds.width / 0.7;
      gengar.scale.y = gengarBounds.width / 0.7;
      gengar.scale.z = gengarBounds.width / 0.7;

      gengarCube.scale.x = gengarBounds.width / 1;
      gengarCube.scale.y = gengarBounds.width / 1;
      gengarCube.scale.z = gengarBounds.width / 1;

      gengarCube.position.x =
        gengarBounds.left - sizes.width / 2 + gengarBounds.width / 2;
      gengarCube.position.z = -gengarCube.scale.z / 2;
      gengar.position.x = gengarCube.position.x;
      gengar.position.z = gengarCube.position.z;

      /*Ditto*/
      ditto.scale.x = dittoBounds.width / 0.85;
      ditto.scale.y = dittoBounds.width / 0.85;
      ditto.scale.z = dittoBounds.width / 0.85;
      ditto.position.x =
        dittoBounds.left - sizes.width / 2 + dittoBounds.width / 6;
      ditto.position.z = -ditto.scale.z / 2;

      const windowWidth = window.innerWidth;
      if (windowWidth <= 1026) {
        ditto.rotation.y = Math.PI / 9;
        ditto.rotation.x = Math.PI / 12;
      } else {
        ditto.rotation.y = Math.PI / 5;
        ditto.rotation.x = Math.PI / 12;
      }

      /*Digglet*/
      digglet.scale.x = diggletBounds.width / 0.85;
      digglet.scale.y = diggletBounds.width / 0.85;
      digglet.scale.z = diggletBounds.width / 0.85;

      digglet.position.x =
        diggletBounds.left - sizes.width / 1.95 + diggletBounds.width / 2;
      //digglet.position.z = -digglet.scale.z / 2;
      digglet.position.y =
        0.0 - diggletBounds.top + sizes.height / 2 - diggletBounds.height / 2;

      let targetD = new THREE.Vector3();
      targetD.x = 0;
      targetD.y = digglet.position.y;
      targetD.z = 600;
      digglet.lookAt(targetD);

      /*Weepibell*/
      weepinbell.scale.x = weepinbellBounds.width;
      weepinbell.scale.y = weepinbellBounds.width;
      weepinbell.scale.z = weepinbellBounds.width;
      weepinbell.position.x =
        weepinbellBounds.left - sizes.width / 2 + weepinbellBounds.width / 2;
      weepinbell.position.z = -weepinbell.scale.z / 2;

      /*Koffing*/
      koffing.scale.x = koofingBounds.width;
      koffing.scale.y = koofingBounds.width;
      koffing.scale.z = koofingBounds.width;
      koffing.position.x =
        koofingBounds.left - sizes.width / 2 + koofingBounds.width / 1.5;
      koffing.position.z = -koffing.scale.z;

      fireflies.scale.x = sizes.width;
      fireflies.scale.y = sizes.height;
    }

    window.addEventListener("mousemove", (event) => {
      mouseEventFunc(event);
    });

    window.addEventListener("touchmove", (event) => {
      mouseEventFuncMobile(event);
    });

    /**
     * Camera
     */
    // Base camera
    const camera = new THREE.PerspectiveCamera(
      70,
      sizes.width / sizes.height,
      100,
      2000
    );
    camera.position.z = 600;
    camera.aspect = sizes.width / sizes.height;
    camera.fov =
      2 * Math.atan(sizes.height / 2 / camera.position.z) * (180 / Math.PI);

    scene.add(camera);
    camera.updateProjectionMatrix();

    // Controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
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

      

      uniform sampler2D tDiffuse;

      varying vec2 vUv;

      void main()
      {

          

          vec2 newUV = vUv;

   
          

          vec4 color = texture2D(tDiffuse, newUV);
          color.r += 0.075;
          color.b += 0.025;

          gl_FragColor = color;
          //gl_FragColor = vec4(mixColor);
      }
  `,
    };

    function getYPosition() {
      var top = window.pageYOffset || document.documentElement.scrollTop;
      return top;
    }

    const tintPass = new ShaderPass(TintShader);
    tintPass.material.uniforms.uTime.value = 0.0;
    effectComposer.addPass(tintPass);

    // Antialias pass
    if (renderer.getPixelRatio() === 1 && !renderer.capabilities.isWebGL2) {
      const smaaPass = new SMAAPass();
      effectComposer.addPass(smaaPass);
    }

    /**
     * Animate
     */
    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();
      windowScrollPos = window.scrollY / 1.0;
      updatePosition();

      gengarMaterial.uniforms.uTime.value = elapsedTime;
      dittoMaterial.uniforms.uTime.value = elapsedTime;
      weepinbellMaterial.uniforms.uTime.value = elapsedTime;
      koffingMaterial.uniforms.uTime.value = elapsedTime;
      firefliesMaterial.uniforms.uTime.value = elapsedTime;

      mesh.rotation.x = elapsedTime / 2;
      mesh.rotation.y = elapsedTime / 2;

      //Raycaster Code
      raycaster.setFromCamera(mousePos, camera);
      const intersects = raycaster.intersectObjects(groupObjects);

      if (intersects.length) {
        let intersectedName = intersects[0].object.name;
        if (!currentIntersect) {
          document.body.style.cursor = "pointer";

          if (intersectedName === "GengarModel") {
            gsap.to(gengarMaterial.uniforms.uSteped, {
              value: 0.0,
              duration: 1.2,
            });
          }

          if (intersectedName === "Ditto_ModelG") {
            gsap.to(dittoMaterial.uniforms.uTextureInterpolation, {
              value: 1.0,
              duration: 1.5,
            });
          }

          if (intersectedName === "WeepinBody") {
            gsap.to(weepinbellMaterial.uniforms.uTextureInterpolation, {
              value: 1.0,
              duration: 1.5,
            });
          }

          if (intersectedName === "KoffingBody") {
            gsap.to(koffingMaterial.uniforms.uTextureInterpolation, {
              value: 1.0,
              duration: 1.5,
            });
          }

          if (intersectedName === "ModelPsy") {
          }
        }

        currentIntersect = intersects[0];
      } else {
        if (currentIntersect) {
          document.body.style.cursor = "auto";
          let currentLeave = currentIntersect.object.name;

          if (currentLeave === "GengarModel") {
            gsap.to(gengarMaterial.uniforms.uSteped, {
              value: 1.0,
              duration: 1.2,
            });
          }

          if (currentLeave === "Ditto_ModelG") {
            gsap.to(dittoMaterial.uniforms.uTextureInterpolation, {
              value: 0.0,
              duration: 1.5,
            });
          }

          if (currentLeave === "WeepinBody") {
            gsap.to(weepinbellMaterial.uniforms.uTextureInterpolation, {
              value: 0.0,
              duration: 1.5,
            });
          }

          if (currentLeave === "KoffingBody") {
            gsap.to(koffingMaterial.uniforms.uTextureInterpolation, {
              value: 0.0,
              duration: 1.5,
            });
          }

          if (currentLeave === "ModelPsy") {
          }
        }

        currentIntersect = null;
      }
      tintPass.material.uniforms.uValX.value = mousePos.x;
      tintPass.material.uniforms.uValY.value = mousePos.y;
      tintPass.material.uniforms.uTime.value = elapsedTime;

      // Update controls
      controls.update();

      // Render
      effectComposer.render();

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  }, []);

  return (
    <main>
      <div className="loading-screen">
        <div className="loader">
          <CgPokemon size="8.5rem" className="loaderSpin-icon" />
        </div>
      </div>
      <div className="three-container">
        <canvas id="canvas-three"></canvas>
        <div className="box-three"></div>
      </div>
      <div className="bg-section"></div>
      <HeroSection />
      <SoundToggle view={view} />
      <PokemonList />
      <PokeWatching />
      <Accordion />
      <div ref={element}>
        <Footer />
      </div>
    </main>
  );
};

export default Homepage;
