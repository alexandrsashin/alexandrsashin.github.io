import React from "react";

const CardBox = ({ cards, categories, onChangeList }) => {
  const onCopyList = () => {
    const temporaryTextarea = document.createElement("textarea");

    const textToCopy =
      cards.length === 0
        ? " "
        : cards.map((card) => `${card.id} - ${card.label}`).join("\n");

    // Place in top-left corner of screen regardless of scroll position.
    temporaryTextarea.style.position = "fixed";
    temporaryTextarea.style.top = "0";
    temporaryTextarea.style.left = "0";
    temporaryTextarea.style.width = "2em";
    temporaryTextarea.style.height = "2em";
    temporaryTextarea.style.padding = "0";
    temporaryTextarea.style.border = "none";
    temporaryTextarea.style.outline = "none";
    temporaryTextarea.style.boxShadow = "none";
    temporaryTextarea.style.background = "transparent";

    temporaryTextarea.value = textToCopy;
    document.body.appendChild(temporaryTextarea);
    temporaryTextarea.select();

    try {
      document.execCommand("copy");
      return true;
    } catch (error) {
      console.log("Oops, unable to copy");
      return false;
    } finally {
      document.body.removeChild(temporaryTextarea);
    }
  };

  const renderCategoryGroup = (category) => (
    <div className="category" key={category}>
      <div className="category__title">{category}</div>
      <div className="cards">
        {cards
          .filter((card) => card.category === category)
          .map((card) => (
            <div
              key={card.id}
              className="card"
              onClick={() => onChangeList(card)}
            >
              {card.id}
              <img
                src={`img/${card.imgSrc}`}
                alt={card.label}
                className="card__img"
              />
              - {card.label}
            </div>
          ))}
      </div>
    </div>
  );
  return (
    <div>
      <div className="copy-block">
        <button className="copy-button" onClick={onCopyList}>
          Копировать список
        </button>
      </div>
      <div>{categories.map(renderCategoryGroup)}</div>
    </div>
  );
};

export default CardBox;
