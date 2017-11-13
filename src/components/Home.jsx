import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { setFormValue } from '../actions/forms';
import { isFormValid, getPayload } from '../helpers/forms';

import PureComponent from './PureComponent';
import Input from './Input';
import Select from './Select';

export class Home extends PureComponent {

    static propTypes = {
        setFormValue: PropTypes.func.isRequired,
        loginForm: PropTypes.shape({
            fields: PropTypes.shape({
                username: PropTypes.shape({
                    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
                }).isRequired,
                password: PropTypes.shape({
                    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
                }).isRequired,
            }),
        }).isRequired,
    }

    state = {
        hasSumbit: false,
    }

    handleFormChange = (...args) => {
        this.props.setFormValue('login', ...args);
    }

    handleChange = (...args) => {
        console.log(...args);
    }

    handleSubmit = () => {
        const isValid = isFormValid(this.props.loginForm);

        console.log(isValid);
        console.log(getPayload(this.props.loginForm));
        this.setState({ hasSumbit: true });
    }

    render() {
        return (
            <section>
                <h3>Home</h3>
                <div className="row">
                    <div className="col s6">
                        <Input
                            placeholder="Tom Beaufoy"
                            id="username"
                            icon="user"
                            onChange={this.handleFormChange}
                            label="Name"
                            value={this.props.loginForm.fields.username.value}
                            hasSumbit={this.state.hasSumbit}
                            required
                            showSuccess />
                    </div>
                    <div className="col s6">
                        <Input
                            icon="key"
                            showSuccess
                            id="password"
                            onChange={this.handleFormChange}
                            value={this.props.loginForm.fields.password.value}
                            label="Password"
                            type="number"
                            hasSumbit={this.state.hasSumbit}
                            required
                            validationType="unsignedNumber"
                            errorMessage="Please enter a valid number" />
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <Select
                            id="select"
                            onChange={this.handleChange}
                            label="Select"
                            hasSumbit={this.state.hasSumbit}
                            required />
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <button onClick={this.handleSubmit} className="btn btn-icon margin-right btn-success">
                            <i className="fa fa-check" />
                            Submit
                        </button>
                        <button onClick={this.handleSubmit} className="btn btn-icon margin-right btn-warning">
                            <i className="fa fa-check" />
                            Submit
                        </button>
                        <button onClick={this.handleSubmit} className="btn btn-icon margin-right btn-danger">
                            <i className="fa fa-check" />
                            Submit
                        </button>
                        <button onClick={this.handleSubmit} className="btn btn-icon margin-right btn-info">
                            <i className="fa fa-check" />
                            Submit
                        </button>
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = state => ({
    loginForm: state.forms.login,
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({ setFormValue }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
