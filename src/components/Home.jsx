import React from 'react';

import PureComponent from './PureComponent';
import Field from './Field';

export class Home extends PureComponent {

    componentWillMount() {
    }

    render() {
        return (
            <section>
                <h3>Choose one of our free tools!</h3>
                <hr />
                <Field />
            </section>
        );
    }
}

export default Home;
