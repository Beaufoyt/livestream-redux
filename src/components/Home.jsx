import React from 'react';

import PureComponent from './PureComponent';
import Input from './Input';

export class Home extends PureComponent {

    state = {
        hasSumbit: false,
    }

    handleChange = (id, value, isValid) => {
        console.log(id, value, isValid);
    }

    handleSubmit = () => {
        this.setState({ hasSumbit: true });
    }

    render() {
        return (
            <section>
                <h3>Home</h3>
                <div className="row">
                    <div className="col s6">
                        <Input id="name" onChange={this.handleChange} label="Name" hasSumbit={this.state.hasSumbit} required />
                    </div>
                    <div className="col s6">
                        <Input id="name" onChange={this.handleChange} label="Name" hasSumbit={this.state.hasSumbit} required />
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <Input id="name" onChange={this.handleChange} label="Name" hasSumbit={this.state.hasSumbit} required />
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <button onClick={this.handleSubmit} className="btn btn-icon">
                            <i className="fa fa-check" />
                            Submit
                        </button>
                    </div>
                </div>
            </section>
        );
    }
}

export default Home;
