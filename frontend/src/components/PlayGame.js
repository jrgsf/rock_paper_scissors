import { useState } from "react";
import axios from "axios";
import Outcome from "./Outcome"

const PlayGame = (props) => {
  const [handShape, setHandShape] = useState("");
  const [outcome, setOutcome] = useState("");
  const [userResults, setUserResults] = useState([]);

  const nameInputChangeHandler = (event) => {
    setHandShape(event.target.value);
  };

  const formSubmissionHandler = async (event) => {
    // PICK ONE OR TWO PLAYERS
    event.preventDefault();
    console.log(setHandShape);

    let formData = new FormData();
    formData.append("handShape", handShape);

    // Post the form, just make sure to set the 'Content-Type' header
    const result = await axios.post("//localhost:5000/playgame", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const {outcome, user_results} = await result.data
    setOutcome(outcome);
    setUserResults(user_results);
    console.log({outcome, user_results});
};

  if (outcome !== "") {
    return <Outcome outcome={outcome} userResults={userResults}/>
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <form onSubmit={formSubmissionHandler}>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="handShape"
                  checked={handShape === "rock"}
                  value="rock"
                  onChange={nameInputChangeHandler}
                />
                Rock
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="handShape"
                  checked={handShape === "paper"}
                  value="paper"
                  onChange={nameInputChangeHandler}
                />
                Paper
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="handShape"
                  checked={handShape === "scissors"}
                  value="scissors"
                  onChange={nameInputChangeHandler}
                />
                Scissors
              </label>
            </div>
            <div className="form-actions">
              <button>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlayGame;
