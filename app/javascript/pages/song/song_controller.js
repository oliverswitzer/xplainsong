export class SongController {
  constructor() {
    this.tracks = [];
    this.loadedTracks = 0;
  }

  register(wavesurferInstance) {
    wavesurferInstance.on("ready", () => {
      this.loadedTracks += 1;

      const currentPercentLoaded =
        (this.loadedTracks / this.tracks.length) * 100;

      this.onLoadCallback(currentPercentLoaded);
    });

    this.tracks.push({
      wavesurferInstance,
    });
  }

  onTrackLoaded(callback) {
    this.onLoadCallback = callback;
  }

  stop() {
    this.tracks.forEach((track) => track.wavesurferInstance.stop());
  }

  play() {
    this.tracks.forEach((track) => track.wavesurferInstance.play());
  }

  unsubscribe() {
    this.tracks.forEach((track) => {
      track.wavesurferInstance.stop();
      track.wavesurferInstance.unAll();
    });
    this.tracks = [];
  }
}

export const songController = new SongController();
