let mediaRecorder = null;
let recordedChunks = [];

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'startRecording') {
    startRecording();
  } else if (request.action === 'stopRecording') {
    stopRecording();
  }
});

function startRecording() {
  chrome.desktopCapture.chooseDesktopMedia(['screen', 'window'], null, function(streamId) {
    if (!streamId) {
      console.error('Error: Could not get stream ID.');
      return;
    }

    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: streamId,
          maxWidth: 1920,
          maxHeight: 1080,
        },
      },
    }).then(function(stream) {
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = handleDataAvailable;
      mediaRecorder.start();

      console.log('Screen recording started.');
    }).catch(function(error) {
      console.error('Error starting recording:', error);
    });
  });
}

function stopRecording() {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
    console.log('Screen recording stopped.');
  }
}

function handleDataAvailable(event) {
  if (event.data.size > 0) {
    recordedChunks.push(event.data);
  }
}
