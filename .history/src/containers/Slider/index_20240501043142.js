import React, { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const events =
    data?.focus.sort((a, b) => new Date(b.date) - new Date(a.date)) || [];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % events.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [index, events.length]);

  return (
    <div className="SlideCardList">
      {events.map((event, idx) => {
        // Combining title and date to create a unique key
        const key = `${event.title}-${event.date}`;
        return (
          <div
            key={key}
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
                <input
                  key={key}
                  type="radio"
                  name={`radio-button-${key}`}
                  checked={idx === index}
                  onChange={() => setIndex(idx)}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
