/**
 * Control GUI 
 */

var optionsGui;

function createGui() {
    /// GUI

    optionsGui = {
        positionX: 0,
        positionY: 0,
        positionZ: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,

        play: function() {
            onButtonClickPlay();
        },
        stop: function() {
            onButtonClickPausa();
        },

        reset: function() {
            onButtonClickReset();
        },
        background: "#dedede",
        hemi: "#bbbbbe",
        directional: "#b6b6b6",
        ground: "#b6b6b6"
        };

    var update = function () {
        var colorBack = new THREE.Color(optionsGui.background);
        var colorHemi = new THREE.Color(optionsGui.hemi);
        var colorDirectional = new THREE.Color(optionsGui.directional);
        var colorGround = new THREE.Color(optionsGui.ground);

        hemiLight.color = colorHemi;
        scene.fog.color = colorBack;
        scene.background =  colorBack;
        dirLight.color = colorDirectional;
        ground.material.color = colorGround;
    };

    optionsGuiAudio = {
        play: function() {
            loadAudio();
        },

        stop: function() {
            mediaElement.pause();
        },

    };

  
    var gui = new dat.GUI();
    //gui.close();
    let guiGroupAnimation, guiGroupColors, guiGroupDirectional, guiGroupHemi, guiGroupCamera, guiAudioGroup;

    guiGroupCamera = gui.addFolder('Camera');
    guiGroupCamera.add(camera.position, 'x', -100, 100).listen();
    guiGroupCamera.add(camera.position, 'y', -100, 100).listen();
    guiGroupCamera.add(camera.position, 'z', -100, 100).listen();

    guiGroupColors = gui.addFolder('General');
    guiGroupColors.addColor(optionsGui,'background').onChange(update);
    guiGroupColors.addColor(optionsGui,'ground').onChange(update);
    
    guiGroupHemi = gui.addFolder('Hemi Light');
    guiGroupHemi.addColor(optionsGui,'hemi').onChange(update);
    guiGroupHemi.add(hemiLight.position, 'x', -100, 100).listen();
    guiGroupHemi.add(hemiLight.position, 'y', -100, 100).listen();
    guiGroupHemi.add(hemiLight.position, 'z', -100, 100).listen();

    guiGroupDirectional = gui.addFolder('Directional Light');
    guiGroupDirectional.addColor(optionsGui,'directional').onChange(update);
    guiGroupDirectional.add(dirLight.position, 'x', -100, 100).listen();
    guiGroupDirectional.add(dirLight.position, 'y', -100, 100).listen();
    guiGroupDirectional.add(dirLight.position, 'z', -100, 100).listen();

    guiGroupAnimation = gui.addFolder('Animation');
    guiGroupAnimation.add(optionsGui, 'play');
    guiGroupAnimation.add(optionsGui, 'stop');
    guiGroupAnimation.add(optionsGui, 'reset');

    guiAudioGroup = gui.addFolder('Audio');
    guiAudioGroup.add(optionsGuiAudio, 'play');
    guiAudioGroup.add(optionsGuiAudio, 'stop');

}