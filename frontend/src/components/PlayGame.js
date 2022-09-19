import { useState } from "react";
import axios from "axios";
import { useLocation } from "wouter";

const PlayGame = (props) => {
  const [handShape, setHandShape] = useState("");
  const [location, setLocation] = useLocation();

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
    const res = await axios.post("//localhost:5000/playgame", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setLocation("/outcome");
  };

  return (
    //   <form onSubmit={formSubmissionHandler}>
    //     Choosin' num players here
    //     <div className="form-actions">
    //       <button>Submit</button>
    //     </div>
    //   </form>
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
