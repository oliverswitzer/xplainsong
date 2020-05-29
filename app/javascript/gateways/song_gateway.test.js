import { SongGateway } from "./song_gateway";
import { axios } from "./support/axios";

jest.mock("./support/axios");

describe("SongGateway", () => {
  describe(".create", () => {
    it("calls axios to make network request to backend", () => {
      SongGateway.create({
        title: "some title",
        stems: [new File([], "some.mp3"), new File([], "some-other.mp3")],
      });

      const axiosCall = axios.post.mock.calls[0];
      expect(axiosCall[0]).toEqual("/songs");

      const formData = axiosCall[1];
      expect(formData.get("title")).toEqual("some title");
      expect(formData.getAll("stems[]")[0].name).toEqual("some.mp3");
      expect(formData.getAll("stems[]")[1].name).toEqual("some-other.mp3");
    });
  });
});
