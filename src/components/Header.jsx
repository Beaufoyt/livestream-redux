import React from 'react';

import NAV_ITEMS from '../constants/NavItems';

import NavButton from './NavButton';
import BrandLogo from './BrandLogo';

const Header = () => (
    <div className="header">
        <BrandLogo />
        { NAV_ITEMS.map(item =>
            <NavButton label={item.label} key={item.label} icon={item.icon} path={`/${item.path}`} />) }
    </div>
);

export default Header;
