import { SongController } from "./song_controller";

describe("SongController", function () {
  let subject;

  beforeEach(function () {
    subject = new SongController();
  });

  describe("after waveform instances have been registered", function () {
    let mockWaveformInstance1;
    let mockWaveformInstance2;

    beforeEach(function () {
      mockWaveformInstance1 = new MockWaveformInstance();
      mockWaveformInstance2 = new MockWaveformInstance();

      subject.register(mockWaveformInstance1);
      subject.register(mockWaveformInstance2);
    });

    describe("onTrackLoaded", () => {
      it("takes a callback that's passed loading percentage each time a track loads", function () {
        const callbackSpy = jest.fn();

        subject.onTrackLoaded(callbackSpy);

        mockWaveformInstance1.fireEventListenersFor("ready");
        mockWaveformInstance2.fireEventListenersFor("ready");

        expect(callbackSpy).toHaveBeenNthCalledWith(1, 50);
        expect(callbackSpy).toHaveBeenNthCalledWith(2, 100);
      });
    });

    describe("synchronizing tracks", function () {
      describe("whenever one waveform's playhead is changed manually", function () {
        beforeEach(function () {
          mockWaveformInstance1.stubbedCurrentTime = 1.45;
        });

        it("changes all tracks playheads to the current playhead position", function () {
          mockWaveformInstance1.fireEventListenersFor("seek");

          expect(mockWaveformInstance1.setCurrentTimeWasCalledWith).toBe(1.45);
          expect(mockWaveformInstance2.setCurrentTimeWasCalledWith).toBe(1.45);
        });
      });
    });

    describe("play", function () {
      it("calls play on each waveform instance", function () {
        subject.play();

        expect(mockWaveformInstance1.playWasCalled).toBe(true);
        expect(mockWaveformInstance2.playWasCalled).toBe(true);
      });
    });

    describe(stop, function () {
      it("calls play on each waveform instance", function () {
        subject.stop();

        expect(mockWaveformInstance1.stopWasCalled).toBe(true);
        expect(mockWaveformInstance2.stopWasCalled).toBe(true);
      });
    });

    describe("unsubscribe", function () {
      it("calls stop on each waveform instance", function () {
        subject.unsubscribe();

        expect(mockWaveformInstance1.stopWasCalled).toBe(true);
        expect(mockWaveformInstance2.stopWasCalled).toBe(true);
      });

      it("calls unAll on each waveform instance to unsubscribe all event listeners", function () {
        subject.unsubscribe();

        expect(mockWaveformInstance1.unAllWasCalled).toBe(true);
        expect(mockWaveformInstance2.unAllWasCalled).toBe(true);
      });

      it("resets array of waveformInstances", function () {
        subject.unsubscribe();

        expect(subject.tracks.length).toBe(0);
      });
    });
  });
});

class MockWaveformInstance {
  stopWasCalled = false;
  unAllWasCalled = false;
  playWasCalled = false;
  addedEventListeners = [];
  stubbedCurrentTime = null;
  setCurrentTimeWasCalledWith = null;

  on(eventName, callback) {
    this.addedEventListeners.push({ name: eventName, callback });
  }
  stop() {
    this.stopWasCalled = true;
  }

  play() {
    this.playWasCalled = true;
  }

  unAll() {
    this.unAllWasCalled = true;
  }

  getCurrentTime() {
    return this.stubbedCurrentTime;
  }

  setCurrentTime(value) {
    this.setCurrentTimeWasCalled = true;
    this.setCurrentTimeWasCalledWith = value;
  }

  fireEventListenersFor(eventName) {
    this.addedEventListeners
      .filter((listener) => listener.name === eventName)
      .forEach((listener) => listener.callback());
  }

  setDisabledEventEmissions(events) {}
}
