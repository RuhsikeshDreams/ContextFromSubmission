import { useState } from 'react';
import './App.css';
import FormComponent from './Components/FormComponent';
import SubmissionComponent from './Components/SubmissionComponent';

function App() {
  const [toggle, setToggle] = useState(false);

  return (
    <div className='app-container'>
      <div className='form-container' >
        <button className='toggle-button' disabled={!toggle} onClick={() =>{setToggle(false)}}>Form</button>
        <button className='toggle-button' disabled={toggle} onClick={() =>{setToggle(true)}}>Submission</button>
      </div>
      <div className='form-block'>

      {toggle ? <SubmissionComponent   /> : <FormComponent setToggle={setToggle} />}
      </div>
    </div>
  );
}

export default App;
