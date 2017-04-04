import { combineReducers } from 'redux';
import todos from './todos';
import overlays from './overlays';

export default combineReducers({
  overlays,
  todos,
});
