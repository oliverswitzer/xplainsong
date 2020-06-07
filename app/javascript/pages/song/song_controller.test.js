import { SongController } from "./song_controller";

class MockWaveformInstance {
  stopWasCalled = false;
  unAllWasCalled = false;
  playWasCalled = false;

  stop() {
    this.stopWasCalled = true;
  }

  play() {
    this.playWasCalled = true;
  }

  unAll() {
    this.unAllWasCalled = true;
  }
}

describe("SongController", function () {
  let subject;

  beforeEach(function () {
    subject = new SongController();
  });

  describe("when waveform instances have been registered", function () {
    let mockWaveformInstance1;
    let mockWaveformInstance2;

    beforeEach(function () {
      mockWaveformInstance1 = new MockWaveformInstance();
      mockWaveformInstance2 = new MockWaveformInstance();

      subject.register(mockWaveformInstance1);
      subject.register(mockWaveformInstance2);
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

        expect(subject.waveformInstances.length).toBe(0);
      });
    });
  });
});
