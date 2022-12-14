import { useState } from "react";
import axios from "axios";
import { useLocation } from "wouter";

const EnterUsername = (props) => {
  const [enteredName1, setEnteredName1] = useState("");
  const [enteredName2, setEnteredName2] = useState("");

  const [, setLocation] = useLocation();

  const nameInputChangeHandler1 = (event) => {
    setEnteredName1(event.target.value);
  };

  const nameInputChangeHandler2 = (event) => {
    setEnteredName2(event.target.value);
  };

  const formSubmissionHandler = async (event) => {
    event.preventDefault();

    let formData = new FormData();
    formData.append("player1", enteredName1);
    formData.append("player2", enteredName2);

    const res = await axios.post("//localhost:5000/enter_usernames", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setLocation("/playgame");
    console.log(res.data);
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      <div>
        <h2>
          Welcome <br />
          to Jeff Giaquinto's
          <br /> Rock Paper Scissors game!
        </h2>
      </div>
      <div className="form-control">
        <label htmlFor="name">Please enter a username for player 1</label>
        <input type="text" id="name" onChange={nameInputChangeHandler1} />
      </div>
{/* 
      <div className="form-control">
        <label htmlFor="name">
          Please enter a username for player 2. Leave blank to play against the
          computer
        </label>
        <input type="text" id="name" onChange={nameInputChangeHandler2} />
      </div> */}

      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default EnterUsername;
