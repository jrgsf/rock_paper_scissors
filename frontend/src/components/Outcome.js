import { useLocation } from "wouter";

const Outcome = (props) => {
  const [, setLocation] = useLocation();

  const formSubmissionHandler = async (event) => {
    event.preventDefault();

    setLocation("/");
  };

  console.log(props.userResults);
  return (
    <form onSubmit={formSubmissionHandler}>
      <div>
        <h1>{props.userResults[0].username} result is a {props.outcome}</h1>
        <h1>
          {props.userResults.map((user) => {
            return (
              <p>
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
