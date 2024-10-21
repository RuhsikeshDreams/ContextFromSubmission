/* eslint-disable react/prop-types */
import { useContext, useState } from 'react';
import { TodoContext } from '../Context/TodoContext';

const FormComponent = ({ setToggle }) => {
  const { state, dispatch } = useContext(TodoContext);
  const [toggleMessage, setToggleMessage] = useState(true);
  const [validation, setValidation] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      date: new Date().toISOString(),
      list: state.field.map((field) => field.value),
    };

    const validation = state.field.some((field) => !field.value);
    if (validation) {
      setValidation(validation);
    } else {
      setToggleMessage(false);
      setTimeout(() => {
        dispatch({ type: 'SUBMIT', payload: formData });
        dispatch({ type: 'EMPTY' });
        setToggle(true);
      }, 2000);
    }
  };

  return (
    <>
      {toggleMessage ? (
        <div className="form-model">
          <h1>Form</h1>
          <form
            className="inner-modal"
            onSubmit={handleSubmit}
          >
            <div className="inner-input-form">
              {state.field.map((list, index) => (
                <div
                  className="input-container"
                  key={index}
                >
                  <input
                    className="input-list"
                    type="text"
                    name="value"
                    placeholder="Type here...."
                    value={list.value}
                    onChange={(e) =>
                      dispatch({
                        type: 'INPUT',
                        payload: { index, value: e.target.value },
                      })
                    }
                  />
                  <div className='icon-button'>
                    
                  <span
                    className="material-symbols-outlined"
                    onClick={() => dispatch({ type: 'SUB', payload: index })}
                  >
                    delete
                  </span>
                  </div>
                </div>
              ))}
            </div>
            {validation && (
              <p style={{ color: 'white' }}>
                Please fill in all required fields.
              </p>
            )}
            <div className="inner-button-container">
              <button
                type="button"
                className="toggle-button-form"
                onClick={() => dispatch({ type: 'ADD' })}
              >
                Add More
              </button>
              <button
                className="toggle-button-form-submit"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="response-container">
          <h1>Your Response Has been Submitted</h1>
        </div>
      )}
    </>
  );
};

export default FormComponent;
