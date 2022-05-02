import {
    GET_HACKATHONS,
    HACKATHON_ERROR
  } from '../actions/types';
  
  const initialState = {
    hackathons: [],
    loading: true,
    error: {}
  };
  
  function hackathonReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_HACKATHONS:
        return {
          ...state,
          hackathons: payload,
          loading: false
        };
      case HACKATHON_ERROR:
        return {
          ...state,
          error: payload,
          loading: false
        }
      default:
        return state;
    }
  }
  
  export default hackathonReducer;
  