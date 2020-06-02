import { SongGateway } from "./song_gateway";
import { axios as axiosSpy } from "./support/axios";

jest.mock("./support/axios");

describe("SongGateway", () => {
  describe(".create", () => {
    it("calls axios to upload track files and song title", () => {
      SongGateway.create({
        title: "some title",
        tracks: [new File([], "some.mp3"), new File([], "some-other.mp3")],
      });

      const axiosCall = axiosSpy.post.mock.calls[0];
      expect(axiosCall[0]).toEqual("/songs");

      const formData = axiosCall[1];
      expect(formData.get("title")).toEqual("some title");
      expect(formData.getAll("tracks[]")[0].name).toEqual("some.mp3");
      expect(formData.getAll("tracks[]")[1].name).toEqual("some-other.mp3");
    });
  });

  describe(".find", () => {
    beforeEach(() => {
      axiosSpy.get.mockReturnValueOnce({ data: { title: "some song" } });
    });

    it("calls axios to fetch a particular song for given id", () => {
      SongGateway.find({ songId: 123 });

      expect(axiosSpy.get).toHaveBeenCalledWith("/songs/123");
    });

    it("returns data off the payload", async () => {
      const result = await SongGateway.find({ songId: 123 });

      expect(result).toEqual({ title: "some song" });
    });
  });
});
