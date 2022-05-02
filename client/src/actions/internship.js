import api from '../utils/api';

import {
  GET_INTERNSHIPS,
  INTERNSHIP_ERROR,
  GET_CATEGORY
} from './types';

// Get internships
export const getInternships = () => async (dispatch) => {
  try {
    const res = await api.get('/internships');

    dispatch({
      type: GET_INTERNSHIPS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: INTERNSHIP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get internship category
export const getCategory = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/internships/${id}`);

    dispatch({
      type: GET_CATEGORY,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: INTERNSHIP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};