const handle = (mediaStream) => {
  const recorder = new MediaRecorder(mediaStream);
  const recording = [];

  const record = () => {
    recorder.start();
    setTimeout(() => recorder.stop(), 3 * 1000);
  };

  const makeURL = (recording) => {
    const blob = new Blob(recording, { type: 'audio/wav' });
    const url = URL.createObjectURL(blob);
    console.log(`The file can be fetched from ${url}`);
  };

  document
    .querySelector('#start-audio')
    .addEventListener('click', () => record());

  recorder.addEventListener('dataavailable', (e) => {
    recording.push(e.data);
    recorder.state === 'inactive' && makeURL(recording);
  });
};

navigator.mediaDevices
  .getUserMedia({ audio: true })
  .then((mediaStream) => handle(mediaStream))
  .catch((err) => console.log("Don't panic, but " + err.message));
