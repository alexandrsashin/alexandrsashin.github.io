import React, { useState } from "react";
import ReactDOM from "react-dom";
import CardBox from "./CardBox";
import { cards, categories } from "./data.json";
import "flexboxgrid2/flexboxgrid2.css";
import "./style.css";

const App = () => {
  const [checkedCards, setCheckedCards] = useState(cards);
  const [uncheckedCards, setUncheckedCards] = useState([]);
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-6">
          <h2>Выбранные</h2>
          <CardBox
            cards={checkedCards}
            categories={categories}
            onChangeList={(selectedCard) => {
              setCheckedCards(
                checkedCards
                  .filter((card) => card.id !== selectedCard.id)
                  .sort((firstCard, secondCard) => firstCard.id - secondCard.id)
              );
              setUncheckedCards(
                [...uncheckedCards, selectedCard].sort(
                  (firstCard, secondCard) => firstCard.id - secondCard.id
                )
              );
            }}
          />
        </div>
        <div className="col-xs-6">
          <h2>Отклонённые</h2>
          <CardBox
            cards={uncheckedCards}
            categories={categories}
            onChangeList={(selectedCard) => {
              setUncheckedCards(
                uncheckedCards
                  .filter((card) => card.id !== selectedCard.id)
                  .sort((firstCard, secondCard) => firstCard.id - secondCard.id)
              );
              setCheckedCards(
                [...checkedCards, selectedCard].sort(
                  (firstCard, secondCard) => firstCard.id - secondCard.id
                )
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
