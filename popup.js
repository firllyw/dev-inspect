document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('startRecordingBtn').addEventListener('click', function () {
        chrome.runtime.sendMessage({ action: 'startRecording' });
        // Optionally, update UI or show a message indicating recording has started
        // Example: document.getElementById('status').innerText = 'Recording...';
    });
});
