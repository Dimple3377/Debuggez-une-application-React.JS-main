import { fireEvent, render, screen, act } from "@testing-library/react";
import Slider from "./index";
import { api, DataProvider } from "../../contexts/DataContext";

const data = {
  focus: [
    {
      title: "World economic forum",
      description:
        "Oeuvre à la coopération entre le secteur public et le privé.",
      date: "2022-02-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Gaming Day",
      description: "Evenement mondial autour du gaming",
      date: "2022-03-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Farming Day",
      description: "Evenement mondial autour de la ferme",
      date: "2022-01-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
  ],
};

describe("When slider is created", () => {
  it("a list card is displayed", async () => {
    window.console.error = jest.fn();
    api.loadData = jest.fn().mockReturnValue(data);
    render(
      <DataProvider>
        <Slider />
      </DataProvider>
    );
    await screen.findByText("World economic forum");
    await screen.findByText("janvier");
    await screen.findByText(
      "Oeuvre à la coopération entre le secteur public et le privé."
    );
    // Vérifie que le premier événement est affiché
    const firstEvent = await screen.findByText("World economic forum");
    expect(firstEvent).toBeInTheDocument();

    // Passe à la slide suivante
    fireEvent.keyDown(window, { key: " " });
    jest.advanceTimersByTime(5000);

    const secondEvent = await screen.findByText("World Gaming Day");
    expect(secondEvent).toBeInTheDocument();

    fireEvent.keyDown(window, { key: " " });
    jest.advanceTimersByTime(5000);

    expect(secondEvent).toBeInTheDocument();

    fireEvent.keyDown(window, { key: " " });
    jest.advanceTimersByTime(5000);

    const thirdEvent = await screen.findByText("World Farming Day");
    expect(thirdEvent).toBeInTheDocument();
  });
});
