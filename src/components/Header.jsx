import React from 'react';

import NAV_ITEMS from '../constants/NavItems';

import NavButton from './NavButton';

const Header = () => (
    <div className="header">
        { NAV_ITEMS.map(item => <NavButton label={item} key={item} path={`/${item}`} />) }
    </div>
);

export default Header;
