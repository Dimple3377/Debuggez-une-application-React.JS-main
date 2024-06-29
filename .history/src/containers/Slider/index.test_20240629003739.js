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
  beforeEach(() => {
    jest.useFakeTimers(); // Activer les timers factices avant chaque test
  });

  afterEach(() => {
    jest.useRealTimers(); // Restaurer les timers réels après chaque test
  });

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
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    const secondEvent = await screen.findByText("World Gaming Day");
    expect(secondEvent).toBeInTheDocument();

    // Met en pause
    fireEvent.keyDown(window, { key: " " });
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(screen.queryByText("World Farming Day")).not.toBeInTheDocument();

    // Reprend
    fireEvent.keyDown(window, { key: " " });
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    const thirdEvent = await screen.findByText("World Farming Day");
    expect(thirdEvent).toBeInTheDocument();
  });
});
