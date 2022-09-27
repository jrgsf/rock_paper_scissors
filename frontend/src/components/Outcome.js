import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "wouter";

const Outcome = (props) => {
  const [, setLocation] = useLocation();
  const [userResults, setUserResults] = useState([]);
  const [outcome, setOutcome] = useState("");

  console.log("OUTCOME CALLED")
  useEffect(() => {
    console.log("OUTCOME CALLED")
    async function getAndPostData() {
      let formData = new FormData();
      formData.append("playerName1", props.playerName1);
      formData.append("playerName2", props.playerName2);
      formData.append("handShape1", props.handShape1);
      formData.append("handShape2", props.handShape2);

      const result = await axios.post("//localhost:5000/playgame", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const { outcome, user_results } = result.data;
      setOutcome(outcome);
      setUserResults(user_results);
    }
    if (!props.submitted) {
      props.setSubmitted(true)
      getAndPostData();
      console.log(" !props.submitted HAPPENED")
    } else {
      console.log("WILL THIS EVER HAPPEN THO????")
    }

  }, []);

  const formSubmissionHandler = async (event) => {
    event.preventDefault();
    setLocation("/");
  };

  console.log(userResults);
  return (
    <form onSubmit={formSubmissionHandler}>
      <div>
        <h1>
          {props.playerName1} result is a {outcome}
        </h1>
        <h1>
          {userResults.map((user) => {
            return (
              <p key={user.username}>
                <span>{user.username}</span>
                <li>wins: {user.wins}</li>
                <li>losses: {user.losses}</li>
                <li>ties: {user.ties}</li>
              </p>
            );
          })}
        </h1>
      </div>
      <div className="form-actions">
        <button>Play again!</button>
      </div>
    </form>
  );
};

export default Outcome;
