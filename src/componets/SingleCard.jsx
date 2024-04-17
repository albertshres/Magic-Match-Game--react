import "./SingleCard.css";
import React from "react";

const SingleCard = ({ card, handleChoice, flipped, disable }) => {
  const handleClick = () => {
    if (!disable) {
      handleChoice(card);
    }
  };
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.sor} alt="card front" />
        <img
          className="back"
          src="src\img\cover.png"
          alt=" card back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default SingleCard;
