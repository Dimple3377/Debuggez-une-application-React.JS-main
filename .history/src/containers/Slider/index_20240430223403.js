import React, { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const sortedEvents =
    data?.focus.sort((a, b) => new Date(b.date) - new Date(a.date)) || [];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % sortedEvents.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [index, sortedEvents.length]);

  return (
    <div className="SlideCardList">
      {sortedEvents.map((event, idx) => (
        <div
          key={event.id || `event-${idx}`}
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
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {sortedEvents.map((_, radioIdx) => (
                <input
                  key={`${event.id}-${radioIdx}`}
                  type="radio"
                  name={`radio-button-${event.id}`} // Unique name for each group of radios
                  checked={idx === radioIdx}
                  onChange={() => setIndex(radioIdx)}
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
