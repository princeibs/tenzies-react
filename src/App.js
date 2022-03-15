import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";

export default function App() {

  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const firstVal = dice[0].value;
    const allSame = dice.every(die => die.value === firstVal);
    if (allHeld && allSame) {
      setTenzies(true);
    }
  }, [dice]);

  function allNewDice() {
    let newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        id: nanoid(),
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
      });
    }
    return newDice;
  }

  function holdDice(id) {
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ?
        { ...die, isHeld: !die.isHeld } :
        die
    }))
  }

  function rollDice() {
    setDice(prevDice => prevDice.map(die => {
      return die.isHeld ?
        die :
        { id: nanoid(), value: Math.ceil(Math.random() * 6), isHeld: false, }
    }))
  };

  const diceElements = dice.map(die =>
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />)

  return (
    <main>
      <div className="dice-container">
        {diceElements}
      </div>
      {tenzies ?
        <button className="roll-dice">Reset</button> :
        <button className="roll-dice" onClick={rollDice}>Roll</button>}
    </main>
  )
}