import React from 'react';

import PureComponent from './PureComponent';

class Field extends PureComponent {

    state = {
        isFocused: false,
    }

    focusField = () => {
        this.setState({ isFocused: true });
    }

    blurField = () => {
        this.setState({ isFocused: false });
    }

    render() {
        console.log(this.state.isFocused);
        return (
            <div className="form-group">
                <input id="form-input" type="text" />
                <label htmlFor="form-input">Name</label>
            </div>
        );
    }
}

export default Field;
