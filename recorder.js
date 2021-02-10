const handleData = (mediaStream) => {
  console.log('The mic is open.');

  const recorder = new MediaRecorder(mediaStream);
  const recording = [];

  document
    .querySelector('#start-audio')
    .addEventListener('click', () => recordForSeconds(3));

  const recordForSeconds = (seconds) => {
    recorder.start();
    setTimeout(() => recorder.stop(), seconds * 1000);
  };

  recorder.addEventListener('dataavailable', (e) => {
    recording.push(e.data);
    recorder.state === 'inactive' && makeURL(recording);
  });

  const makeURL = (recording) => {
    const blob = new Blob(recording, { type: 'audio/wav' });
    const url = URL.createObjectURL(blob);
    console.log(`The wav file can be fetched from ${url}`);
  };
};

navigator.mediaDevices &&
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((data) => handleData(data))
    .catch((err) => console.log("Don't panic, but " + err.message));
