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
  <button id="zoomIn">+</button>
  <button id="zoomOut">-</button>
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

document.getElementById('zoomIn').addEventListener('click', () => {
	zoomLevel = Math.min(zoomLevel + 0.1, 3);
	video.style.transform = `scale(${zoomLevel})`;
});

document.getElementById('zoomOut').addEventListener('click', () => {
	zoomLevel = Math.max(zoomLevel - 0.1, 1);
	video.style.transform = `scale(${zoomLevel})`;
});
