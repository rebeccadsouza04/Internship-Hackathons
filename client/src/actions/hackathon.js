import api from '../utils/api';

import {
    GET_HACKATHONS,
    HACKATHON_ERROR
} from './types';

// Get hackathons
export const getHackathons = () => async (dispatch) => {
  try {
    const res = await api.get('/hackathons');

    dispatch({
      type: GET_HACKATHONS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: HACKATHON_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};