import React from 'react';

import PureComponent from './PureComponent';

export class Home extends PureComponent {

    componentWillMount() {
    }

    render() {
        return (
            <section>
                <h3>Choose one of our free tools!</h3>
                <hr />
            </section>
        );
    }
}

export default Home;
