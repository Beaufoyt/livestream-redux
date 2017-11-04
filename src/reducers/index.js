import { combineReducers } from 'redux';

import numbers from './numbers';
import sidebar from './sidebar';
import ui from './ui';

export default combineReducers({
    numbers,
    sidebar,
    ui,
});
