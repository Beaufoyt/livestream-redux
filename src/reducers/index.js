import { combineReducers } from 'redux';
import overlays from './overlays';
import sidebar from './sidebar';
import cams from './cams';
import auth from './auth';

export default combineReducers({
  overlays,
  sidebar,
  cams,
  auth,
});
