import { combineReducers } from 'redux';
import numbers from './numbers';
import overlays from './overlays';
import sidebar from './sidebar';

export default combineReducers({
  overlays,
  numbers,
  sidebar,
});
