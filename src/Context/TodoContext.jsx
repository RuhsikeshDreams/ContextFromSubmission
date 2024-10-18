/* eslint-disable react/prop-types */
import { createContext, useReducer } from 'react';

export const TodoContext = createContext();

const DefaultState = {
  accordion: [],
  field: [{ value: '' }],
};

const Reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'ADD':
      return { ...state, field: [...state.field, { value: '' }] };
    case 'SUB':
      return {
        ...state,
        field: state.field.filter((_, index) => index !== action.payload),
      };

    case 'INPUT': {
      const updatedFields = [...state.field];
      updatedFields[payload.index].value = payload.value;
      return { ...state, field: updatedFields };
    }
    case 'EMPTY':
      return { ...state, field: [{ value: '' }] };

    case 'SUBMIT':
      return { ...state, accordion: [...state.accordion, payload] };

    default:
      return state;
  }
};

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, DefaultState);
  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
