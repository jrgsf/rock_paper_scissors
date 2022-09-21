import React from "react";
import { Route } from "wouter";
import "./App.css";
import EnterUsername from "./components/EnterUsername";
import PlayGame from "./components/PlayGame";
import Outcome from "./components/Outcome";

function App() {
  return (
    <div className="app">
      <Route path="/" component={EnterUsername} />
      <Route path="/playgame" component={PlayGame} />
      <Route path="/outcome" component={Outcome} />
    </div>
  );
}

export default App;
