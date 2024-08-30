// RHPBS - Random Home Page Background Selector
const list = ['arrow.mp4', 'earth.mp4'];

// Select a random video from the list
const randomVideo = list[Math.floor(Math.random() * list.length)];

// Set the source of the video element
const videoSource = document.getElementById('video-source');
videoSource.src = randomVideo;

// Load the selected video
const videoElement = document.getElementById('background-video');
videoElement.load();