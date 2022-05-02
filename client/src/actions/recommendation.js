import api from '../utils/api';

import {
    GET_RECOMMENDATIONS,
    RECOMMENDATION_ERROR
} from './types';

// Get recommendations
export const getRecommendations = () => async (dispatch) => {
  try {
    const res = await api.get('/recommendations');

    dispatch({
      type: GET_RECOMMENDATIONS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: RECOMMENDATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};