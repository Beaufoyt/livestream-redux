import { combineReducers } from 'redux';

import numbers from './numbers';
import sidebar from './sidebar';
import ui from './ui';
import overlays from './overlays';
import loader from './loader';

export default combineReducers({
    numbers,
    sidebar,
    ui,
    overlays,
    loader,
});
