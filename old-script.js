if (navigator.mediaDevices) {
  navigator.mediaDevices
    .getUserMedia({ audio: true })

    .then((stream) => {
      let startBtn = document.querySelector('#start-audio');
      let recorder = new MediaRecorder(stream);
      let audioRecording = [];

      recorder.ondataavailable = (e) => {
        audioRecording.push(e.data);
        if (recorder.state === 'inactive') makeLink(audioRecording);
      };

      startBtn.addEventListener('click', (e) => {
        recorder.start();
        setTimeout(() => recorder.stop(), 3 * 1000);
      });

      const makeLink = (audioRecording) => {
        let blob = new Blob(audioRecording, { type: 'audio/wav' });
        let url = URL.createObjectURL(blob);
        console.log(url); // this logs the link you want to fetch
      };

      console.log('got media successfully');
    })

    .catch((err) => console.log(err.message));
}
