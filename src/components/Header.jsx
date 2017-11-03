import React from 'react';

import HeaderButton from './HeaderButton';
import BrandLogo from './BrandLogo';

const Header = () => (
    <div className="header">
        <BrandLogo />
        <HeaderButton icon="chevron-left" className="pull-left btn-sidebar-toggle" />
        <HeaderButton label="Register" icon="pencil" className="pull-right" />
        <HeaderButton label="Log in" icon="sign-in" className="pull-right" />
    </div>
);

export default Header;
