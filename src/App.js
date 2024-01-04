import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./component/SingleCards";

const cardImages = [
  { src: "/img/dog1.png", matched: false },
  { src: "/img/dog2.png", matched: false },
  { src: "/img/dog3.png", matched: false },
  { src: "/img/dog4.png", matched: false },
  { src: "/img/dog5.png", matched: false },
  { src: "/img/dog6.png", matched: false },
];





function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [allMatched, setAllMatched]= useState(false)


  //shuffle cards
  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffleCards);
    setTurns(0);
    setChoiceOne(null)
    setChoiceTwo(null)
  };


  useEffect(() => {
    const allMatched = cards.every((card) => card.matched);
    setAllMatched(allMatched);
  }, [cards]);


  //start the game without pressing the button
  useEffect(() => {
    shuffleCards();
  }, []);

  //handle Choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //compared the 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
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

  //reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  return (
    <div className="App">
      <h1>Dog Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={
              card === choiceOne || card === choiceTwo || card.matched === true
            }
            disabled={disabled}
          />
        ))}
      </div>
      {allMatched ? <div className="finish">You won! Score:{turns} turns</div> : <p>Turns: {turns}</p>}
    </div>
  );
}

export default App;
