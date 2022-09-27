import React, { useState } from "react";
import { Route } from "wouter";
import "./App.css";
import EnterUsername from "./components/EnterUsername";
import PlayGame from "./components/PlayGame";
import Outcome from "./components/Outcome";

function App() {
  const [enteredName1, setEnteredName1] = useState("default_user");
  const [enteredName2, setEnteredName2] = useState("");

  const [handShape1, setHandShape1] = useState("");
  const [handShape2, setHandShape2] = useState("");

  const [submitted, setSubmitted] = useState(false);

  const resetData = () => {
    setEnteredName1("")
    setEnteredName2("")
    setHandShape1("")
    setHandShape2("")
  };


  return (
    <div className="app">
      <Route path="/">
        <EnterUsername
          setEnteredName1={setEnteredName1}
          enteredName1={enteredName1}
          setEnteredName2={setEnteredName2}
          enteredName2={enteredName2}
          resetData={resetData}
        />
      </Route>
      <Route path="/playgame">
        <PlayGame
          submitOutcome={!enteredName2}
          playerName={enteredName1}
          setHandShape={setHandShape1}
          handShape={handShape1}
        />
      </Route>
      <Route path="/playgame2">
        <PlayGame
          submitOutcome={true}
          playerName={enteredName2}
          setHandShape={setHandShape2}
          handShape={handShape2}
        />
      </Route>
      <Route path="/outcome">
        <Outcome
          playerName1={enteredName1}
          handShape1={handShape1}
          playerName2={enteredName2}
          handShape2={handShape2}
          setSubmitted={setSubmitted}
          submitted={submitted}
        />
      </Route>
    </div>
  );
}

export default App;
