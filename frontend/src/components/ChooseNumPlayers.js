import { useState } from "react";
import axios from "axios";
import { useLocation } from "wouter";

const ChooseisTwoPlayer = (props) => {
  const [isTwoPlayer, setIsTwoPlayer] = useState(false);
  const [location, setLocation] = useLocation();

  const nameInputChangeHandler = (event) => {
    setIsTwoPlayer(event.target.value == "2");
  };

  const formSubmissionHandler = async (event) => {
    event.preventDefault();
    console.log(isTwoPlayer);

    let formData = new FormData();
    formData.append("isTwoPlayer", isTwoPlayer);

    // Post the form, just make sure to set the 'Content-Type' header
    const res = await axios.post("//localhost:5000/is2player", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (isTwoPlayer) {
      setLocation("/");
    } else {
      setLocation("/playgame");
    }
  };

  return (
    // <form onSubmit={formSubmissionHandler}>
    //   Choosin' num players here
    //   <div className="form-actions">
    //     <button>Submit</button>
    //   </div>
    // </form>

    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <form onSubmit={formSubmissionHandler}>
            <div>
              <h2>Choose:</h2>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="isTwoPlayer"
                  checked={isTwoPlayer}
                  value="2"
                  onChange={nameInputChangeHandler}
                />
                2 Player Game
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="isTwoPlayer"
                  checked={!isTwoPlayer}
                  value="1"
                  onChange={nameInputChangeHandler}
                />
                Play against the computer
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

export default ChooseisTwoPlayer;
