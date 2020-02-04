/**
 * Buttons or animations 
 */
var timeAnim = 1;
 //////////////////////////////////////////
// ----------------------------------- // Buttons Click
function onButtonClickPlay() {
    animation.clampWhenFinished = true;
    animation.loop = THREE.LoopOnce;
    animation.play();
    animation.paused = false;

    var animBackground = new THREE.Color(0x2f2f2f);
    TweenLite.to(scene.background, timeAnim, { r: animBackground.r, g: animBackground.g, b: animBackground.b });
    TweenLite.to(scene.fog.color, timeAnim, { r: animBackground.r, g: animBackground.g, b: animBackground.b });

    var animHemi = new THREE.Color(0x464646);
    TweenLite.to(hemiLight.color, timeAnim, { r: animHemi.r, g: animHemi.g, b: animHemi.b });

    var animDirectional = new THREE.Color(0x252525);
    TweenLite.to(dirLight.color, timeAnim, { r: animDirectional.r, g: animDirectional.g, b: animDirectional.b });

    var animGround = new THREE.Color(0x161616);
    TweenLite.to(ground.material.color, timeAnim, { r: animGround.r, g: animGround.g, b: animGround.b });
};

function onButtonClickPausa() {
    animation.paused = true;
};

function onButtonClickReset() {
    animation.stop();
    animation.reset();

    var animBackground = new THREE.Color(0xdedede);
    TweenLite.to(scene.background, timeAnim, { r: animBackground.r, g: animBackground.g, b: animBackground.b });
    TweenLite.to(scene.fog.color, timeAnim, { r: animBackground.r, g: animBackground.g, b: animBackground.b });

    var animHemi = new THREE.Color(0xbbbbbe);
    TweenLite.to(hemiLight.color, timeAnim, { r: animHemi.r, g: animHemi.g, b: animHemi.b });

    var animDirectional = new THREE.Color(0xb6b6b6);
    TweenLite.to(dirLight.color, timeAnim, { r: animDirectional.r, g: animDirectional.g, b: animDirectional.b });

    var animGround = new THREE.Color(0xb6b6b6);
    TweenLite.to(ground.material.color, timeAnim, { r: animGround.r, g: animGround.g, b: animGround.b });
};


//////////////////////////////////////////
// ----------------------------------- // Mouse Wheel
let scrollY = 0;
var angle = 0;
var newRot = 0;

function onMouseWheel( event ) {
    const delta = Math.sign(event.deltaY);
    console.info(delta);

    event.preventDefault();
    scrollY += event.deltaY;
   
    if ( scrollY >= 5*(newRot+1) ) {
        newRot++;
        var es = TweenLite.to(groupCamera.rotation, 1, {y:Math.PI*(0.5*newRot), ease: "expo"});
        var newPos = Math.floor(Math.random() * (250 - 150 + 1) ) + 150;
        var tu = TweenLite.to(camera.position, 1, {z:newPos, ease: "expo"});
    }
}
