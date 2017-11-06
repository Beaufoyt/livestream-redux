import React from 'react';

import { overlays } from '../constants/Overlays';

import Overlay from './Overlay';

const LoginOverlay = () => (
    <Overlay
        title="Log in"
        submit={() => console.log('hello')}
        submitText="Log in"
        submitIcon="sign-in"
        id={overlays.login}>
        Present belly, scratch hand when stroked stare at wall turn and meow stare at wall some more meow again continue
        staring eat and than sleep on your face love to play with owners hair tie licks your face go into a room to
        decide you didnt want to be in there anyway.
    </Overlay>
);

LoginOverlay.propTypes = {
};

LoginOverlay.defaultProps = {
};

export default LoginOverlay;
