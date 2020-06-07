export class SongController {
  constructor() {
    this.waveformInstances = [];
  }

  register(wavesurferInstance) {
    this.waveformInstances.push(wavesurferInstance);
  }

  stop() {
    this.waveformInstances.forEach((instance) => instance.stop());
  }

  play() {
    this.waveformInstances.forEach((instance) => instance.play());
  }

  unsubscribe() {
    this.waveformInstances.forEach((instance) => {
      instance.stop();
      instance.unAll();
    });
    this.waveformInstances = [];
  }
}

export const songController = new SongController();
