/*================================================================================================
    -- Imports --
    ________________________________________________________________*/
    import * as THREE from "../build/three.module.js"
    //- Utility import
    import { OrbitControls } from "../jsm/controls/OrbitControls.js"
    //import { GLTFLoader } from '../jsm/loaders/GLTFLoader.js'
    //import { OBJLoader } from '../jsm/loaders/OBJLoader.js'
    //- Shaders import
    import {vertexShader as vertShader, fragmentShader as fragShader} from "../shaders/shader.js"
    //=============================================================================================

    //- Canvas
    const canvas = document.querySelector(".webglCanvas");

    //- Size
    const size = {width: 700, height: 500};

    //- Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x323232 );

    /*
    //- Loader
    //glTF Loader
    const glLoader = new GLTFLoader();
    //Load a glTF resource
    glLoader.load('./models/cube.glb',
        //called when the resource is loaded
        function ( object ) {
            //console.log(object.scene.children[0])

            object.scene.scale.set(4, 4, 4)
            scene.add(object.scene)
            console.log(object.scene)

        },
        //called while loading is progressing
        function ( xhr ) {

            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

        },
        //called when loading has errors
        function ( error ) {

            console.log( error );

        }
    );
    */

    /*
    //OBJ Loader
    // instantiate a loader
    const loader = new OBJLoader();

    //load a resource
    loader.load(
        //resource URL
        'models/cube.obj',
        // called when resource is loaded
        function ( object ) {

            scene.add( object );

        },
        //called when loading is in progresses
        function ( xhr ) {

            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

        },
        //called when loading has errors
        function ( error ) {

            console.log( 'An error happened' );

        }
    );
    */

    //- Object (plane)
    const geometry = new THREE.PlaneGeometry(16, 16, 256, 256);
    //Textures
    const textureLoader = new THREE.TextureLoader();
    const colorTexture = textureLoader.load("./textures/ColorTexture.png");
    colorTexture.minFilter = THREE.NearestFilter;
    colorTexture.magFilter = THREE.NearestFilter;
    colorTexture.wrapS = THREE.RepeatWrapping;
    colorTexture.wrapT = THREE.RepeatWrapping;
    const displaceTexture = textureLoader.load("./textures/DisplaceTexture.png");
    displaceTexture.minFilter = THREE.NearestFilter;
    displaceTexture.magFilter = THREE.NearestFilter;
    displaceTexture.wrapS = THREE.RepeatWrapping;
    displaceTexture.wrapT = THREE.RepeatWrapping;

    //Shader & Uniforms
    const uniforms = {
        uColorTexture: { value: colorTexture },
        uDisplaceTexture: { value: displaceTexture },
        uDisplaceStrength: { value: 0.3 },
    };

    const materialShader = new THREE.RawShaderMaterial( {
        uniforms: uniforms,
        vertexShader: vertShader,
        fragmentShader: fragShader,
        wireframe: false,
    } );

    const planeMesh = new THREE.Mesh(geometry, materialShader);
    scene.add(planeMesh);

    //- Ambient Light
    const ambLight = new THREE.AmbientLight(0x404040, 3);
    scene.add(ambLight);

    //- Directional Light
    const dirLight = new THREE.DirectionalLight(0x808080, 2);
    dirLight.position.set(-8, 2, 6);
    scene.add(dirLight);

    //- Camera
    const camera = new THREE.PerspectiveCamera(60, size.width/size.height);
    camera.position.set(0, 0, 20);
    scene.add(camera);

    //- Controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;

    //- Render
    const renderer = new THREE.WebGLRenderer( { canvas: canvas }, { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(size.width, size.height);
    animate();

    function animate() {

        requestAnimationFrame(animate);
        //Animate controls
        controls.update();  //required if controls.enableDamping = true, or if controls.autoRotate = true
        //Render each frame
        renderer.render(scene, camera);
    }

// |===| End Of ThreeJs Script |===| \\

//_ Exporting _
export {animate}; //this function contains the render and it calls itself
