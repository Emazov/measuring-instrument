// index.html

const container = document.createElement('div');
container.className = 'container';
document.body.appendChild(container);

const videoContainer = document.createElement('div');
videoContainer.className = 'video-container';
container.appendChild(videoContainer);

const video = document.createElement('video');
video.setAttribute('autoplay', '');
video.setAttribute('playsinline', '');
video.className = 'video-feed';
videoContainer.appendChild(video);

const zoomControls = document.createElement('div');
zoomControls.className = 'zoom-controls';
zoomControls.innerHTML = `
  <input type="range" id="zoomSlider" min="1" max="3" step="0.1" value="1">
`;
container.appendChild(zoomControls);

let zoomLevel = 1;
const constraints = {
	video: {
		facingMode: 'environment',
	},
};

navigator.mediaDevices
	.getUserMedia(constraints)
	.then((stream) => {
		video.srcObject = stream;
	})
	.catch((error) => console.error('Error accessing camera:', error));

document.getElementById('zoomSlider').addEventListener('input', (event) => {
	zoomLevel = event.target.value;
	video.style.transform = `scale(${zoomLevel})`;
});
