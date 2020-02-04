var camera, scene, renderer;
var groupCamera;
var mixer;
var hemiLight, dirLight, lensFlareLight

// General
var controls;
var stats = new Stats();

// Geometry
var ground;

// Render
var clock = new THREE.Clock();
var mColorBackground = 0xdedede;
var mColorHemi = 0xbbbbbe;
var mColorDirectional = 0xb6b6b6;
var mColorGround= 0xb6b6b6;

// Start
init();
animate();


function init() {
    // ----------- SCENE & CAMERA ----------- //
    scene = new THREE.Scene();
    scene.background = new THREE.Color().setHex(mColorBackground);
	scene.fog = new THREE.Fog(scene.background, 1, 1000);
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.set(0, 0, 170);
    camera.lookAt(scene.position);
 
    // LIGHTS
    hemiLight = new THREE.HemisphereLight(mColorHemi, mColorHemi, 0.6);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);

    hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
    scene.add(hemiLightHelper);

    //
    dirLight = new THREE.DirectionalLight(mColorDirectional, 1);
    dirLight.position.set(-1, 1.75, 1);
    dirLight.position.multiplyScalar(30);
    scene.add(dirLight);

    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;

    var d = 100;

    dirLight.shadow.camera.left = - d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = - d;

    dirLight.shadow.camera.far = 3500;
    dirLight.shadow.bias = - 0.0001;

    dirLightHeper = new THREE.DirectionalLightHelper( dirLight, 10 );
    scene.add( dirLightHeper );


    // ----------- LENDS FLARE ----------- //
  /*  var textureLoader = new THREE.TextureLoader();

    var textureFlare0 = textureLoader.load( 'assets/lensflare/lensflare0.png' );
    var textureFlare3 = textureLoader.load( 'assets/lensflare/lensflare3.png' );

    addLight( 0.55, 0.9, 0.5, 5000, 0, - 1000 );
    addLight( 0.08, 0.8, 0.5, 0, 0, - 1000 );
    addLight( 0.995, 0.5, 0.9, 5000, 5000, - 1000 );

    function addLight( h, s, l, x, y, z ) {

        lensFlareLight = new THREE.PointLight( 0xffffff, 1.5, 2000 );
        lensFlareLight.color.setHSL( h, s, l );
        lensFlareLight.position.set( x, y, z );
        scene.add( lensFlareLight );

        var lensflare = new THREE.Lensflare();
        lensflare.addElement( new THREE.LensflareElement( textureFlare0, 700, 0, lensFlareLight.color ) );
        lensflare.addElement( new THREE.LensflareElement( textureFlare3, 60, 0.6 ) );
        lensflare.addElement( new THREE.LensflareElement( textureFlare3, 70, 0.7 ) );
        lensflare.addElement( new THREE.LensflareElement( textureFlare3, 120, 0.9 ) );
        lensflare.addElement( new THREE.LensflareElement( textureFlare3, 70, 1 ) );
        lensFlareLight.add( lensflare );

    }*/

    // ----------- GROUND  ----------- //
    var groundGeo = new THREE.PlaneBufferGeometry(10000, 10000);
    var groundMat = new THREE.MeshLambertMaterial({color: mColorGround});

    ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = -33;
    ground.rotation.x = - Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // ----------- GROUPS ----------- //
    groupCamera = new THREE.Group();
    groupCamera.position.set(0, 0, 0);
    scene.add(groupCamera);
    groupCamera.add(camera);


    // ----------- Cube ----------- //
    var geometry = new THREE.BoxGeometry(10 , 10, 10);
    var material = new THREE.MeshLambertMaterial({color: 0xF7F7F7});
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = 20;
    mesh.position.y = -28;
    mesh.position.z = 0;
    mesh.rotation.y = 45;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add( mesh );
    

    // ----------- LOAD GLB ----------- //
    var loader = new THREE.GLTFLoader();

    loader.load( 'assets/explote02.glb', function (gltf) {

        var mesh = gltf.scene.children[0];

        for(var i = 0; i < 150; i++){
            mesh.children[i].castShadow = true;
            mesh.children[i].receiveShadow = true;
        }

        var s = 0.09;
        mesh.scale.set(s, s, s);
        mesh.position.z = 0;
        mesh.position.y = -30;
    
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        scene.add( mesh );

        var myanimations = [];
        mixer  = new THREE.AnimationMixer(mesh);
        myanimations = gltf.animations;
        animation = mixer.clipAction(myanimations[0]);

    }, undefined, function ( error ) { 
        console.error( error ); 
    });

    

     // ----------- RENDERER ----------- //
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;

    createGui();
    

    document.getElementById("world").appendChild(renderer.domElement);
    //controls = new THREE.TrackballControls(camera, renderer.domElement);

    document.body.appendChild( stats.dom );

     // ----------- Resize ----------- //
    window.addEventListener( 'wheel', onMouseWheel, false );
    window.addEventListener( 'resize', onWindowResize, false );
}


//////////////////////////////////////////
// ----------------------------------- // Resize
function onWindowResize() {
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
}


//////////////////////////////////////////
// ----------------------------------- // Animate
function animate(){
    requestAnimationFrame(animate);

    stats.update();
    //controls.update();
    render();
}

//////////////////////////////////////////
// ----------------------------------- // Render
function render() {
    var delta = clock.getDelta();

    stats.begin();   
    if (mixer ) {   
        mixer.update(delta);
    }
    stats.end();

    camera.lookAt(scene.position);
    renderer.render(scene, camera);
}


      