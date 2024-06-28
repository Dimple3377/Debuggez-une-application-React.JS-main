import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  // état du slider en pause
  const [isPaused, setIsPaused] = useState(false);

  const byDateDesc = [...(data?.focus || [])].sort((evtA, evtB) =>
    // ordre décroissant
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );

  const nextCard = () => {
    if (!isPaused) {
      setTimeout(
        () => setIndex(index + 1 < byDateDesc.length ? index + 1 : 0),
        5000
      );
    }
  };

  useEffect(() => {
    const intervalId = setInterval(nextCard, 5000);
    return () => clearInterval(intervalId);
  }, [index, isPaused]);

  const handleKeyPress = (event) => {
    if (event.key === " ") {
      setIsPaused(!isPaused);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isPaused]);

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        // Changement de la key
        <div key={event.date}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt={event.title} />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={_.date}
                  type="radio"
                  name="radio-button"
                  /*
                    Remplacement de idx par index pour indiquer sur quelle image on se trouve 
                  */
                  checked={index === radioIdx}
                  // ajoute readOnly
                  readOnly
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
