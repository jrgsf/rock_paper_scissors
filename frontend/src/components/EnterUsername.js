import { useState } from 'react';
import axios from "axios";
import { useLocation } from "wouter";


const EnterUsername = (props) => {
  const [enteredName, setEnteredNme] = useState('');
  const [location, setLocation] = useLocation();

  const nameInputChangeHandler = event => {
    setEnteredNme(event.target.value);
  };

  const formSubmissionHandler = async event => {
    event.preventDefault();

    let formData = new FormData();
    formData.append('playerName', enteredName);
  
    // Post the form, just make sure to set the 'Content-Type' header
    const res = await axios.post('//localhost:5000/player_name', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    setLocation("/is2player");
    console.log(res.data);
  };

  return (
    <form onSubmit={formSubmissionHandler}>
                <div>
        <h2>Welcome <br/>to Jeff Giaquinto's<br/> Rock Paper Scissors game!</h2>
      </div>
      <div className='form-control'>
        <label htmlFor='name'>Please enter a username</label>
        <input type='text' id='name' onChange={nameInputChangeHandler}/>
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default EnterUsername;
