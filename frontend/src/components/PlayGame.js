import { useEffect } from "react";
import { useLocation } from "wouter";

const PlayGame = (props) => {
  const [, setLocation] = useLocation();

  useEffect(() => {
    props.setHandShape("")
  }, []);

  const shapeInputChangeHandler = (event) => {
    props.setHandShape(event.target.value);
  };

  const formSubmissionHandler = async (event) => {
    console.log("WTF IS props.submitOutcome RN???", props.submitOutcome)
    if (props.submitOutcome === true) {
      setLocation("/outcome");
      console.log("SET LOCATION TO /outcome here")
    } else {
      setLocation("/playgame2");
    }
  };

  return (
    <div className="container">
      <div className="row">
        Choose one, {props.playerName}.<br />
        Make sure your opponent doesn't see your choice!!!!
        <div className="col-sm-12">
          <form onSubmit={formSubmissionHandler}>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="handShape"
                  checked={props.handShape === "rock"}
                  value="rock"
                  onChange={shapeInputChangeHandler}
                />
                Rock
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="handShape"
                  checked={props.handShape === "paper"}
                  value="paper"
                  onChange={shapeInputChangeHandler}
                />
                Paper
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="handShape"
                  checked={props.handShape === "scissors"}
                  value="scissors"
                  onChange={shapeInputChangeHandler}
                />
                Scissors
              </label>
            </div>
            <div className="form-actions">
              <button disabled={!props.handShape}>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlayGame;
