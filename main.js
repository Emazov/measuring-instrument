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

const measurementContainer = document.createElement('div');
measurementContainer.className = 'measurement-container';
measurementContainer.innerHTML = `
  <button id="startMeasurement">Start Measurement</button>
  <p id="heightOutput">Height: -- m</p>
`;
container.appendChild(measurementContainer);

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

// Measurement Logic
let firstAngle = null;
let secondAngle = null;
let baseDistance = 1.5; // Estimated eye-level height in meters

document.getElementById('startMeasurement').addEventListener('click', () => {
	firstAngle = null;
	secondAngle = null;
	document.getElementById('heightOutput').textContent = 'Measuring...';
});

window.addEventListener('deviceorientation', (event) => {
	const tilt = event.beta; // Beta is the front-to-back tilt
	if (tilt !== null) {
		if (firstAngle === null) {
			firstAngle = tilt;
		} else if (secondAngle === null && Math.abs(tilt - firstAngle) > 10) {
			secondAngle = tilt;
			const angleDifference = (secondAngle - firstAngle) * (Math.PI / 180);
			const height = baseDistance * Math.tan(angleDifference);
			document.getElementById(
				'heightOutput'
			).textContent = `Height: ${height.toFixed(2)} m`;
		}
	}
});
