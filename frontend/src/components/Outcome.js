import axios from "axios";
import { useLocation } from "wouter";

const Outcome = (props) => {
  const [location, setLocation] = useLocation();
  const res = axios.get("//localhost:5000/outcome");

  const formSubmissionHandler = async (event) => {
    event.preventDefault();

    // Get final outcome
    setLocation("/is2player");
    console.log(res.data);
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      <div>
        <h1>We have a winner!</h1>
      </div>
      <div className="form-actions">
        <button>Play again!</button>
      </div>
      </form>
  );
};

export default Outcome;
