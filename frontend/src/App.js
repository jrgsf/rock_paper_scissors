import React, { useState, useEffect } from "react";
import { Route } from "wouter";
import "./App.css";
import EnterUsername from "./components/EnterUsername";
import ChooseNumPlayers from "./components/ChooseNumPlayers";
import PlayGame from "./components/PlayGame";
import Outcome from "./components/Outcome";

function App() {
  const [result, setResult] = useState([]);

  return (
    <div className="app">
      <Route path="/" component={EnterUsername} />
      <Route path="/is2player" component={ChooseNumPlayers} />
      <Route path="/playgame" component={PlayGame} />
      <Route path="/outcome" component={Outcome} />
    </div>
  );
}

export default App;
