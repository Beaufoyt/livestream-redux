import React from 'react';
import PropTypes from 'prop-types';

import classnames from '../helpers/classnames';
import { validateInput } from '../helpers/validation';

import PureComponent from './PureComponent';

class Input extends PureComponent {

    state = {
        value: '',
        isValid: true,
    }

    componentWillReceiveProps(newProps) {
        if (!this.props.hasSumbit && newProps.hasSumbit) {
            this.validateValue(this.state.value);
        }
    }

    setContent = (e) => {
        const { value } = e.target;

        this.setState({ value }, this.validateValue(value));
    }

    getErrorMessage = () => {
        return this.props.showError && !this.state.isValid && this.props.hasSumbit ? this.props.errorMessage : '';
    }

    validateValue = (value) => {
        let validationType = this.props.validationType;

        if (!validationType && this.props.required) {
            validationType = 'required';
        }

        const isValid = validateInput(validationType, value);

        this.setState({ isValid }, this.props.onChange(this.props.id, value, isValid));
    }

    render() {
        return (
            <div
                data-error={this.getErrorMessage()}
                className={classnames('form-input', {
                    required: this.props.required,
                    error: !!this.getErrorMessage(),
                    valid: this.props.showSuccess && this.state.isValid && this.props.hasSumbit,
                })}>
                <input
                    id="form-input"
                    onChange={this.setContent}
                    className={classnames({
                        'has-value': this.state.value,
                    })}
                    type={this.props.type} />
                <label htmlFor="form-input">{this.props.label}</label>
            </div>
        );
    }
}

Input.propTypes = {
    errorMessage: PropTypes.string,
    hasSumbit: PropTypes.bool,
    required: PropTypes.bool,
    showError: PropTypes.bool,
    showSuccess: PropTypes.bool,
    validationType: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.string,
};

Input.defaultProps = {
    errorMessage: 'Please input a value',
    hasSumbit: false,
    required: false,
    validationType: null,
    showError: true,
    showSuccess: false,
    type: 'text',
};

export default Input;
