import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import internship from './internship';
import recommendation from './recommendation';
import hackathon from './hackathon';

export default combineReducers({
  alert,
  auth,
  profile,
  post,
  internship,
  recommendation,
  hackathon
});
