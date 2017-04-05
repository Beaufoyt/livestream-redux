import { combineReducers } from 'redux';
import todos from './todos';
import overlays from './overlays';
import sidebar from './sidebar';

export default combineReducers({
  overlays,
  todos,
  sidebar,
});
