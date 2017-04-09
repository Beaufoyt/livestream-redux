import { combineReducers } from 'redux';
import numbers from './numbers';
import overlays from './overlays';
import sidebar from './sidebar';
import cams from './cams';

export default combineReducers({
  overlays,
  numbers,
  sidebar,
  cams,
});
