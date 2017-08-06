import React from 'react';

import PureComponent from './PureComponent';

class Numbers extends PureComponent {
    componentWillMount() {

    }

    render() {
        return (
            <section>
                <h3>Numbers</h3>
                <hr />
                <div className="row">
                    <h5 className="row-header">Number Fact</h5>
                    <blockquote className="code-block">
                        hello i am a number fact and i am very boring
                    </blockquote>
                </div>
                <div className="row">
                    <h5 className="row-header">Counter</h5>
                    <button className="btn btn-default btn-counter margin-right">-</button>
                    <blockquote className="code-block wrap">
                        5
                    </blockquote>
                    <button className="btn btn-default btn-counter margin-left">+</button>
                </div>
            </section>
        );
    }
}

export default Numbers;
