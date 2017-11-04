import { combineReducers } from 'redux';

import numbers from './numbers';
import sidebar from './sidebar';

export default combineReducers({
    numbers,
    sidebar,
});
