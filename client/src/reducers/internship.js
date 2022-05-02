import {
    GET_INTERNSHIPS,
    INTERNSHIP_ERROR,
    GET_CATEGORY
  } from '../actions/types';
  
  const initialState = {
    internships: [],
    loading: true,
    error: {}
  };
  
  function internshipReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_INTERNSHIPS:
      case GET_CATEGORY:
        return {
          ...state,
          internships: payload,
          loading: false
        };
      case INTERNSHIP_ERROR:
        return {
          ...state,
          error: payload,
          loading: false
        }
      default:
        return state;
    }
  }
  
  export default internshipReducer;
  