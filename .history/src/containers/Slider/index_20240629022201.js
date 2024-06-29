import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const byDateDesc = [...(data?.focus || [])].sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );

  const nextCard = () => {
    // Mise à jour de l'index pour passer à la carte suivante
    setIndex((prevIndex) =>
      prevIndex + 1 < byDateDesc.length ? prevIndex + 1 : 0
    );
  };

  // Utilisation d'un intervalle pour changer la carte toutes les 5 secondes
  useEffect(() => {
    if (!isPaused) {
      // Démarre l'intervalle uniquement si le slider n'est pas en pause
      const interval = setInterval(nextCard, 5000);
      return () => clearInterval(interval); // Nettoie l'intervalle lors du démontage ou de la mise en pause
    }
  }, [isPaused, index]); // Dépendance à isPaused et index pour redémarrer l'intervalle quand l'un d'eux change

  // Gestion de l'événement de la barre espace pour mettre en pause / reprendre
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === " ") {
        setIsPaused((prevIsPaused) => !prevIsPaused);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
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
                  checked={index === radioIdx}
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
