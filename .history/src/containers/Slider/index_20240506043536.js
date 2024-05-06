import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Faire une copie du tableau avant le tri
  const byDateDesc = data?.focus.slice().sort(
    (evtA, evtB) => new Date(evtB.date) - new Date(evtA.date) // Tri décroissant simplifié
  );

  const nextCard = () => {
    const timer = setTimeout(
      () => setIndex((index + 1) % byDateDesc.length),
      5000
    );
    return () => clearTimeout(timer); // Nettoyer le timer
  };

  useEffect(() => {
    const timer = nextCard();
    return () => clearTimeout(timer); // Nettoyer le timer lors du démontage
  }, [index, byDateDesc.length]); // Ajouter les dépendances nécessaires

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={event.id || event.date}>
          {" "}
          // Utiliser un ID unique ou la date si l'ID n'est pas disponible
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
                  key={event.id + "-" + radioIdx} // Assurer l'unicité des clés
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
