import { useEffect, useState } from "react";
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
      {sortedEvents.map((eventItem, idx) => (
        <div
          key={eventItem.id}
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img src={eventItem.cover} alt={eventItem.title} />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{eventItem.title}</h3>
              <p>{eventItem.description}</p>
              <div>{getMonth(new Date(eventItem.date))}</div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {sortedEvents.map((_, radioIdx) => (
                <input
                  key={`${eventItem.id}-${radioIdx}`} // Unique key combining event ID and radio index
                  type="radio"
                  name="radio-button"
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
