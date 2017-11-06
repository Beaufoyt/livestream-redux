import React from 'react';

import { overlays } from '../constants/Overlays';

import Overlay from './Overlay';

const RegisterOverlay = () => (
    <Overlay
        title="Register"
        submit={() => console.log('hello')}
        submitText="Register"
        submitIcon="pencil"
        id={overlays.register}>
        Cat mojo burrow under covers pee in the shoe ignore the squirrels, youll never catch them anyway or intently
        sniff hand stare at the wall, play with food and get confused by dust and intently stare at the same spot.
        Scratch at the door then walk away relentlessly pursues moth. Has closed eyes but still sees you stares at
        human while pushing stuff off a table step on your keyboard while youre gaming and then turn in a circle.
        Hunt by meowing loudly at 5am next to human slave food dispenser be a nyan cat, feel great about it.
    </Overlay>
);

RegisterOverlay.propTypes = {
};

RegisterOverlay.defaultProps = {
};

export default RegisterOverlay;
