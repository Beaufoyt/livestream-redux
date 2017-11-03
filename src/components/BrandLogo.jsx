import React from 'react';
import { Link } from 'react-router-dom';

const BrandLogo = () => (
    <Link className="brand-logo no-dec" to="/">
        <img alt="logo" src="../icons/startup.svg" />
        <span>WebTools</span>
    </Link>
);

export default BrandLogo;
