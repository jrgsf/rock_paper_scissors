import { useEffect } from "react";
import axios from "axios";
import { useLocation } from "wouter";

const EnterUsername = (props) => {
  console.log("EnterUsername called")
  const [, setLocation] = useLocation();

  useEffect(() => {
    props.resetData()
  }, []); // empty list means runs once when page loads

  const nameInputChangeHandler1 = (event) => {
    props.setEnteredName1(event.target.value);
  };

  const nameInputChangeHandler2 = (event) => {
    props.setEnteredName2(event.target.value);
  };

  const formSubmissionHandler = async (event) => {
    event.preventDefault();

    let formData = new FormData();
    formData.append("player1", props.enteredName1);
    formData.append("player2", props.enteredName2);

    const res = await axios.post("//localhost:5000/enter_usernames", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setLocation("/playgame");
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
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler1}
          value={props.userName1}
        />
      </div>

      <div className="form-control">
        <label htmlFor="name">
          Please enter a username for player 2. (Leave blank to play against the
          computer)
        </label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler2}
          value={props.userName2}
        />
      </div>

      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default EnterUsername;
