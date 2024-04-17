import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./componets/SingleCard";

function App() {
  const cardImages = [
    { sor: "src/img/helmet-1.png", matched: false },
    { sor: "src/img/potion-1.png", matched: false },
    { sor: "src/img/ring-1.png", matched: false },
    { sor: "src/img/scroll-1.png", matched: false },
    { sor: "src/img/shield-1.png", matched: false },
    { sor: "src/img/sword-1.png", matched: false },
  ];

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disable, setDisable] = useState(false);

  // Shuffle cards and make the pair of the above object

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
  };
  // handle choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //Compare 2 selected choices

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisable(true);
      if (choiceOne.sor === choiceTwo.sor) {
        setCards((prevcards) => {
          return prevcards.map((card) => {
            if (card.sor === choiceOne.sor) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  console.log(cards);

  // reset choice and increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prev) => prev + 1);
    setDisable(false);
  };

  // to remain the game even in reset
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <>
      <div className="App">
        <h1>Magic Match</h1>
        <button onClick={shuffleCards}>New Game</button>

        <div className="card-grid">
          {cards.map((card) => (
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disable={disable}
            />
          ))}
        </div>
        <p>Turn={turns}</p>
      </div>
    </>
  );
}

export default App;
