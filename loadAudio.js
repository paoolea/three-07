
var listener;
var audio;
var mediaElement;


function loadAudio() {
    listener = new THREE.AudioListener();
    audio = new THREE.Audio(listener);

    // Audio playback requires user interaction
    mediaElement = new Audio('assets/track01.mp3');
    mediaElement.loop = true;
    mediaElement.play();

    audio.setMediaElementSource(mediaElement);
}